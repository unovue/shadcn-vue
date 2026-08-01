import type { FetchError } from "ofetch"
import type {
  ResolvedGitHubItemAddress,
  ResolvedGitHubRegistrySource,
} from "@/src/registry/address"
import type { GitHubSource } from "@/src/registry/github-ref"
import type { RegistrySourceReader } from "@/src/registry/source"
import { ofetch } from "ofetch"
import { RegistrySourceFileError } from "@/src/registry/errors"
import { resolveGitHubRef } from "@/src/registry/github-ref"
import { agent } from "@/src/registry/proxy"
import {
  loadRegistryCatalogFromSource,
  loadRegistryItemFromSource,
} from "@/src/registry/source"

const GITHUB_RAW_URL = "https://raw.githubusercontent.com"

export interface GitHubSourceOptions {
  useCache?: boolean
  sourceCache?: Map<string, Promise<string>>
}

// Resolved refs are kept for the lifetime of the process regardless of
// `useCache`: a `git ls-remote` per (owner, repo, ref) is the expensive part,
// and re-resolving mid-run could pin two files of the same item to two
// different commits.
const githubRefCache = new Map<string, Promise<string>>()

// File bodies, keyed by their fully resolved raw URL.
const githubFileCache = new Map<string, Promise<string>>()

export function clearGitHubSourceCache() {
  githubRefCache.clear()
  githubFileCache.clear()
}

export async function fetchGitHubRegistryItem(
  address: ResolvedGitHubItemAddress,
  options: GitHubSourceOptions = {},
) {
  const reader = createGitHubRegistrySourceReader(address, options)

  return loadRegistryItemFromSource(address.item, reader, {
    source: formatGitHubSource(address),
  })
}

export async function fetchGitHubRegistryCatalog(
  source: ResolvedGitHubRegistrySource,
  options: GitHubSourceOptions = {},
) {
  const reader = createGitHubRegistrySourceReader(source, options)

  return loadRegistryCatalogFromSource(reader, {
    source: formatGitHubSource(source),
  })
}

function createGitHubRegistrySourceReader(
  address: GitHubSource,
  options: GitHubSourceOptions,
) {
  const fileCache = options.sourceCache ?? githubFileCache
  // Resolve the ref once for the whole reader, so every file of an item is
  // read at the same commit even if the branch moves mid-install.
  const shaPromise = resolveGitHubRef(address, { cache: githubRefCache })

  return {
    async readText(filePath: string) {
      const sha = await shaPromise
      const url = buildGitHubRawUrl(address, sha, filePath)

      const cached = fileCache.get(url)
      if (options.useCache !== false && cached) {
        return cached
      }

      const promise = fetchGitHubSourceFile(url, filePath, address)

      if (options.useCache !== false) {
        fileCache.set(url, promise)
      }

      return promise
    },
  } satisfies RegistrySourceReader
}

async function fetchGitHubSourceFile(
  url: string,
  filePath: string,
  address: GitHubSource,
) {
  try {
    return await ofetch<string, "text">(url, {
      agent,
      dispatcher: agent,
      responseType: "text",
      headers: {
        "Accept-Encoding": "identity",
        "User-Agent": "shadcn-vue",
      },
    })
  }
  catch (error) {
    const status = (error as FetchError)?.response?.status

    throw new RegistrySourceFileError(filePath, error, {
      message: `Failed to read GitHub source file "${filePath}" from ${formatGitHubSource(
        address,
      )}.`,
      context: {
        reason: "github-source-file",
        url,
        statusCode: status,
        source: formatGitHubSource(address),
        filePath,
      },
      suggestion: getGitHubSourceFileSuggestion(filePath, status),
    })
  }
}

function getGitHubSourceFileSuggestion(filePath: string, status?: number) {
  if (status === undefined) {
    return "GitHub ref resolution succeeded, but the CLI could not fetch from raw.githubusercontent.com. Check that raw.githubusercontent.com is accessible from this network."
  }

  if (status === 404 && filePath === "registry.json") {
    // raw.githubusercontent.com does not serve private repositories, so a 404
    // here is just as likely to mean "private" as "missing".
    return "The GitHub repository and ref were resolved, but raw.githubusercontent.com did not return a root registry.json file. Check that the repository is public and has registry.json at its root."
  }

  if (status === 404) {
    return "Check that the file path exists in the public GitHub repository. Private repositories are not supported."
  }

  if (status === 403 || status === 429) {
    return "raw.githubusercontent.com rate limited this request. Wait a moment and try again."
  }

  return "Check that the file path exists in the public GitHub repository."
}

function buildGitHubRawUrl(
  address: GitHubSource,
  resolvedSha: string,
  filePath: string,
) {
  const file = filePath
    .split("/")
    .map(part => encodeURIComponent(part))
    .join("/")

  return `${GITHUB_RAW_URL}/${address.owner}/${address.repo}/${resolvedSha}/${file}`
}

function formatGitHubSource(address: GitHubSource) {
  return `${address.owner}/${address.repo}#${address.ref ?? "HEAD"}`
}
