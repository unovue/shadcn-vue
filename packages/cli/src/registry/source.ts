import type { z } from "zod"
import type { Registry, RegistryItem } from "@/src/schema"
import path from "pathe"
import {
  RegistryItemNotFoundError,
  RegistryParseError,
  RegistrySourceFileError,
  RegistryValidationError,
} from "@/src/registry/errors"
import { isUrl } from "@/src/registry/utils"
import { registryItemSchema, registrySchema } from "@/src/schema"

const REGISTRY_ITEM_SCHEMA_URL
  = "https://shadcn-vue.com/schema/registry-item.json"

// A registry item can declare dozens of files. Reading them all at once is a
// good way to get rate limited by a remote source, so cap the fan-out.
const REGISTRY_SOURCE_READ_CONCURRENCY = 8

// A registry source is anything that can hand us the text of a file by its
// path relative to the registry root. The GitHub reader is the first
// implementation; a local directory reader would be another.
export interface RegistrySourceReader {
  readText: (filePath: string) => Promise<string>
}

interface RegistryItemSource {
  registryFile: string
  registryDir: string
  itemIndex: number
}

interface SourceRegistryLoadResult {
  registry: Registry
  itemSources: Map<RegistryItem, RegistryItemSource>
}

// Reads the registry.json at the source root, finds the named item, and
// inlines the content of every file the item declares.
export async function loadRegistryItemFromSource(
  itemName: string,
  reader: RegistrySourceReader,
  options: {
    registryFile?: string
    source?: string
  } = {},
) {
  const result = await readSourceRegistry(reader, options)
  const matches = result.registry.items.filter(item => item.name === itemName)

  if (matches.length === 0) {
    throw new RegistryItemNotFoundError(itemName, {
      source: options.source,
      suggestion: `Available items: ${
        result.registry.items.map(item => item.name).join(", ") || "none"
      }.`,
    })
  }

  // Only the name we were actually asked for has to be unambiguous. A
  // duplicate elsewhere in the file is the registry author's problem, not a
  // reason to refuse the item in front of us.
  if (matches.length > 1) {
    throw new RegistryValidationError(
      `Duplicate registry item name "${itemName}". Registry item names must be unique.\n${matches
        .map(item => `  - ${formatItemSource(result.itemSources.get(item))}`)
        .join("\n")}`,
      {
        context: { itemName },
        suggestion:
          "Rename one of these items so each name is unique across the registry.",
      },
    )
  }

  const [item] = matches
  const source = result.itemSources.get(item)

  // Validate only the item we are about to read and write. Walking every item
  // in the file would let one malformed entry make the whole repository
  // uninstallable.
  validateRegistryItemFiles(
    item,
    source?.registryFile ?? "registry.json",
    source?.registryDir ?? ".",
  )

  return createRegistryItemFromSource(item, result, reader)
}

// Reads the registry.json at the source root and returns the catalog of items
// it declares, without file content.
export async function loadRegistryCatalogFromSource(
  reader: RegistrySourceReader,
  options: {
    registryFile?: string
    source?: string
  } = {},
) {
  const result = await readSourceRegistry(reader, options)

  return {
    ...result.registry,
    items: result.registry.items.map(item =>
      stripRegistryItemFileContent(
        rewriteRegistryItemFilePaths(item, result.itemSources),
      ),
    ),
  }
}

async function readSourceRegistry(
  reader: RegistrySourceReader,
  options: {
    registryFile?: string
    source?: string
  } = {},
): Promise<SourceRegistryLoadResult> {
  const registryFile = normalizeSourcePath(
    options.registryFile ?? "registry.json",
  )
  const content = await readRegistryJson(registryFile, reader, options)
  const registry = parseRegistry(content, registryFile)
  const registryDir = getSourceDir(registryFile)
  const itemSources = new Map<RegistryItem, RegistryItemSource>()

  registry.items.forEach((item, itemIndex) => {
    itemSources.set(item, { registryFile, registryDir, itemIndex })
  })

  // File paths and duplicate names are validated per item, at the point an
  // item is actually loaded. Listing a catalog reads nothing and writes
  // nothing, so it does not need either check.
  return { registry, itemSources }
}

async function createRegistryItemFromSource(
  item: RegistryItem,
  result: SourceRegistryLoadResult,
  reader: RegistrySourceReader,
) {
  const registryItem = {
    ...rewriteRegistryItemFilePaths(item, result.itemSources),
    $schema: REGISTRY_ITEM_SCHEMA_URL,
  }

  await mapWithConcurrency(
    item.files ?? [],
    REGISTRY_SOURCE_READ_CONCURRENCY,
    async (sourceFile, index) => {
      const file = registryItem.files?.[index]
      if (!file) {
        return
      }

      const source = result.itemSources.get(item)
      const sourcePath = joinSourcePath(
        source?.registryDir ?? ".",
        sourceFile.path,
      )
      file.content = await readRegistryItemFileContent(
        item.name,
        sourceFile.path,
        sourcePath,
        source,
        reader,
      )
    },
  )

  try {
    return registryItemSchema.parse(registryItem)
  }
  catch (error) {
    throw new RegistryParseError(item.name, error)
  }
}

async function readRegistryItemFileContent(
  itemName: string,
  filePath: string,
  sourcePath: string,
  source: RegistryItemSource | undefined,
  reader: RegistrySourceReader,
) {
  try {
    return await reader.readText(sourcePath)
  }
  catch (error) {
    const isSourceFileError
      = error instanceof RegistrySourceFileError
        && error.context?.reason === "github-source-file"

    throw new RegistrySourceFileError(sourcePath, error, {
      message: `Failed to read file "${filePath}" for registry item "${itemName}" (${formatItemSource(
        source,
      )}). Expected file at ${sourcePath}.`,
      context: {
        registryFile: source?.registryFile,
        itemIndex: source?.itemIndex,
        itemName,
        itemFilePath: filePath,
        sourcePath,
      },
      suggestion:
        isSourceFileError && error.suggestion
          ? error.suggestion
          : "Make sure the file path is relative to the registry.json file that declares the item.",
    })
  }
}

async function readRegistryJson(
  registryFile: string,
  reader: RegistrySourceReader,
  options: {
    source?: string
  } = {},
) {
  try {
    return await reader.readText(registryFile)
  }
  catch (error) {
    // The GitHub reader already produces a precise message for these.
    if (
      error instanceof RegistrySourceFileError
      && (error.context?.reason === "github-ref-resolution"
        || error.context?.reason === "github-source-file")
    ) {
      throw error
    }

    throw new RegistrySourceFileError(registryFile, error, {
      message: `Failed to read source registry file at ${
        options.source ? `${options.source}/${registryFile}` : registryFile
      }.`,
      context: { registryFile, source: options.source },
      suggestion:
        "Check that the repository has a registry.json file at its root.",
    })
  }
}

function parseRegistry(content: string, registryFile: string) {
  let json: unknown
  try {
    json = JSON.parse(content)
  }
  catch (error) {
    throw new RegistryParseError(registryFile, error)
  }

  const result = registrySchema.safeParse(json)
  if (!result.success) {
    throw new RegistryValidationError(
      `Invalid registry file at ${registryFile}:\n${formatZodIssues(
        result.error,
      )}`,
      {
        registryFile,
        cause: result.error,
        suggestion:
          "Update the registry.json file so it matches the registry schema. See https://shadcn-vue.com/schema/registry.json.",
      },
    )
  }

  return result.data
}

function rewriteRegistryItemFilePaths(
  item: RegistryItem,
  itemSources: Map<RegistryItem, RegistryItemSource>,
) {
  const registryDir = itemSources.get(item)?.registryDir ?? "."

  return {
    ...item,
    files: item.files?.map(file => ({
      ...file,
      // Paths in the returned item are relative to the registry root so the
      // rest of the CLI can treat them like any other registry item.
      path: relativeSourcePath(".", joinSourcePath(registryDir, file.path)),
    })),
  }
}

function stripRegistryItemFileContent(item: RegistryItem) {
  return {
    ...item,
    files: item.files?.map(({ content, ...file }) => file),
  }
}

// A registry item can write a file anywhere its `target` points. For a URL the
// user pasted deliberately that is their call, but the bare `owner/repo/item`
// form is zero-configuration, so a hostile registry must not be able to reach
// outside the project. Reject traversal on both ends: the path we read from
// and the target we would write to.
function validateRegistryItemFiles(
  item: RegistryItem,
  registryFile: string,
  registryDir: string,
) {
  for (const file of item.files ?? []) {
    if (isUrl(file.path)) {
      throw new RegistryValidationError(
        `Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: remote file paths are not supported.`,
        {
          registryFile,
          context: { itemName: item.name, filePath: file.path },
        },
      )
    }

    if (path.isAbsolute(file.path)) {
      throw new RegistryValidationError(
        `Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: file paths must be relative.`,
        {
          registryFile,
          context: { itemName: item.name, filePath: file.path },
        },
      )
    }

    if (hasParentTraversal(file.path)) {
      throw new RegistryValidationError(
        `Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: file paths cannot use parent-directory traversal.`,
        {
          registryFile,
          context: { itemName: item.name, filePath: file.path },
        },
      )
    }

    if (!isSourcePathInsideRoot(joinSourcePath(registryDir, file.path))) {
      throw new RegistryValidationError(
        `Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: file paths must stay inside the registry root.`,
        {
          registryFile,
          context: { itemName: item.name, filePath: file.path },
        },
      )
    }

    validateRegistryItemFileTarget(item, file.target, registryFile)
  }
}

function validateRegistryItemFileTarget(
  item: RegistryItem,
  target: string | undefined,
  registryFile: string,
) {
  if (!target) {
    return
  }

  // `~/` is the documented way to target the project root.
  const normalizedTarget = target.startsWith("~/") ? target.slice(2) : target

  if (path.isAbsolute(normalizedTarget)) {
    throw new RegistryValidationError(
      `Invalid file target "${target}" for item "${item.name}" in ${registryFile}: file targets must be relative to the project.`,
      {
        registryFile,
        context: { itemName: item.name, target },
      },
    )
  }

  if (
    hasParentTraversal(normalizedTarget)
    || !isSourcePathInsideRoot(joinSourcePath(".", normalizedTarget))
  ) {
    throw new RegistryValidationError(
      `Invalid file target "${target}" for item "${item.name}" in ${registryFile}: file targets cannot write outside the project.`,
      {
        registryFile,
        context: { itemName: item.name, target },
      },
    )
  }
}

async function mapWithConcurrency<T>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<void>,
) {
  let nextIndex = 0
  // The first failure fails the whole item, so stop handing out work instead
  // of letting the other workers finish fetching files nobody will use.
  let failed = false
  const workerCount = Math.min(concurrency, items.length)
  const workers = Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length && !failed) {
      const itemIndex = nextIndex++
      try {
        await mapper(items[itemIndex]!, itemIndex)
      }
      catch (error) {
        failed = true
        throw error
      }
    }
  })

  await Promise.all(workers)
}

function getSourceDir(filePath: string) {
  const dirname = path.dirname(filePath)
  return dirname === "." ? "." : dirname
}

function joinSourcePath(...segments: string[]) {
  const normalized = path.normalize(path.join(...segments))
  return normalized === "." ? "" : normalized
}

function normalizeSourcePath(filePath: string) {
  const normalized = path.normalize(filePath)
  return normalized.startsWith("./") ? normalized.slice(2) : normalized
}

function relativeSourcePath(from: string, to: string) {
  const relative = path.relative(from, to)
  return relative || path.basename(to)
}

function isSourcePathInsideRoot(filePath: string, root = ".") {
  const relative = path.relative(root, filePath)
  return (
    !!relative && !relative.startsWith("..") && !path.isAbsolute(relative)
  )
}

function hasParentTraversal(filePath: string) {
  return filePath.split(/[/\\]+/).includes("..")
}

function formatItemSource(source: RegistryItemSource | undefined) {
  if (!source) {
    return "unknown source"
  }

  return `${source.registryFile} items[${source.itemIndex}]`
}

function formatZodIssues(error: z.ZodError) {
  return error.errors
    .map((issue) => {
      const issuePath = issue.path.length ? issue.path.join(".") : "(root)"
      return `  - ${issuePath}: ${issue.message}`
    })
    .join("\n")
}
