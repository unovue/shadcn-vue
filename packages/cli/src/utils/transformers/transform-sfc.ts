import type { SFCBlock } from 'vue/compiler-sfc'
import type { SourceFile, TransformOpts } from '.'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, rm, rmdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import MagicString from 'magic-string'
import path from 'pathe'
import { format } from 'prettier'
import { parseSync, transform } from 'rolldown/utils'
import { preTranspileScriptSetup, transpileVueTemplate } from 'vue-sfc-transformer'
import { parse, registerTS } from 'vue/compiler-sfc'

// @vue/compiler-sfc needs TypeScript to resolve `defineProps<T>()` types that are
// imported from other modules. Register it lazily so commands that never
// transform an SFC don't pay for loading it. vue-sfc-transformer imports
// `vue/compiler-sfc` too, so this registers on the instance it uses.
const nodeRequire = createRequire(import.meta.url)
registerTS(() => nodeRequire('typescript'))

// @vue/compiler-sfc does not export compiler-core's ErrorCodes enum.
// Code 2 is X_DUPLICATE_ATTRIBUTE, which still yields a usable SFC descriptor.
const DUPLICATE_ATTRIBUTE_ERROR_CODE = 2

const SIDE_EFFECT_IMPORT_RE = /^[ \t]*import[ \t]+(['"])([^'"]+)\1[ \t]*(?:;[ \t]*)?(?:\r?\n|$)/gm

// Looser than SIDE_EFFECT_IMPORT_RE: a side effect import in the source may be
// followed by a comment, and it must still be recognised as intentional.
const SOURCE_SIDE_EFFECT_IMPORT_RE = /^[ \t]*import[ \t]*(['"])([^'"]+)\1/gm

const RELATIVE_IMPORT_RE = /\bfrom\s*(['"])(\.\.?(?:\/[^'"]*)?)\1/g

const RESOLVABLE_EXTENSIONS = ['', '.ts', '.d.ts', '.tsx', '.vue', '/index.ts', '/index.d.ts', '/index.tsx']

const TS_DIRECTIVE_COMMENT_RE = /^[ \t]*\/\/[ \t]*@ts-(?:ignore|expect-error|nocheck)\b.*(?:\r?\n|$)/gm

// oxc's codegen drops blank lines but keeps comments, so blank lines between
// statements travel through the transform as this marker.
const BLANK_LINE_MARKER = '/*__shadcn_vue_blank_line__*/'

const BLANK_LINE_MARKER_RE = /^[ \t]*\/\*__shadcn_vue_blank_line__\*\/[ \t]*$|\/\*__shadcn_vue_blank_line__\*\/[ \t]*/gm

const EMPTY_EXPORT_RE = /^[ \t]*export[ \t]*\{[ \t]*\};?[ \t]*(?:\r?\n|$)/gm

const EMPTY_SCRIPT_RE = /<script\b([^>]*)>(\s*)<\/script>/g

// `<script setup generic="T extends ...">` only means something to TypeScript.
const GENERIC_ATTRIBUTE_RE = /\s+generic\s*=\s*(?:"[^"]*"|'[^']*')/

const TS_LANG_ATTRIBUTE_RE = /\s+lang\s*=\s*(?:"tsx?"|'tsx?'|tsx?)(?=\s|\/?>|$)/

export async function transformSFC(opts: TransformOpts) {
  if (opts.config?.typescript)
    return opts.raw

  return opts.filename.endsWith('.vue')
    ? await transformVueSFC(opts.raw, opts.filename, {
        sourceFiles: opts.sourceFiles,
        cwd: opts.config?.resolvedPaths?.cwd,
      })
    : await transformScript(opts.raw, opts.filename)
}

interface ResolveTypesOptions {
  // The other files of the same registry item. `defineProps<Props>()` is
  // resolved by @vue/compiler-sfc off the real filesystem, so external types
  // are only reachable once these siblings exist on disk.
  sourceFiles?: SourceFile[]
  cwd?: string
}

export async function transformVueSFC(
  content: string,
  filename: string,
  options: ResolveTypesOptions = {},
) {
  const staged = await stageSourceFiles(content, filename, options)

  try {
    return await transpileVueSFC(content, staged.filename)
  }
  finally {
    await staged.cleanup()
  }
}

// @vue/compiler-sfc resolves imported types by reading them from disk, relative
// to the file being compiled. Registry items are transformed in memory under
// their registry path, so nothing is there to read. Materialise the item's files
// in a scratch directory and compile from that copy instead.
async function stageSourceFiles(
  content: string,
  filename: string,
  { sourceFiles, cwd }: ResolveTypesOptions,
) {
  const unstaged = { filename, cleanup: async () => {} }

  if (!sourceFiles?.length || path.isAbsolute(filename))
    return unstaged

  const imported = collectImportedFiles(content, filename, sourceFiles)

  if (!imported.length)
    return unstaged

  const staging = await createStagingDirectory(cwd ?? process.cwd())

  if (!staging)
    return unstaged

  const { root } = staging
  const cleanup = async () => {
    await rm(root, { recursive: true, force: true }).catch(() => {})
    // Only succeeds once the cache directory is empty again.
    if (staging.cache)
      await rmdir(staging.cache).catch(() => {})
  }

  try {
    for (const file of imported) {
      const target = path.join(root, file.path)

      // A registry is free to name its files, so refuse any path that would
      // escape the staging directory.
      if (!target.startsWith(`${root}/`))
        continue

      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, file.content!, 'utf8')
    }

    return { filename: path.join(root, filename), cleanup }
  }
  catch (error) {
    await cleanup()
    throw error
  }
}

// Only the files reachable through relative imports need to be on disk, so
// follow them from the SFC instead of writing every file of the add tree.
function collectImportedFiles(
  content: string,
  filename: string,
  sourceFiles: SourceFile[],
) {
  const byPath = new Map(
    sourceFiles
      .filter(file => file.content)
      .map(file => [path.normalize(file.path), file]),
  )
  const found = new Map<string, SourceFile>()
  const queue = [{ content, filename }]

  while (queue.length) {
    const current = queue.shift()!

    for (const match of Array.from(current.content.matchAll(RELATIVE_IMPORT_RE))) {
      const base = path.join(path.dirname(current.filename), match[2])
      const file = RESOLVABLE_EXTENSIONS
        .map(extension => byPath.get(`${base}${extension}`))
        .find(Boolean)

      if (!file || found.has(file.path))
        continue

      found.set(file.path, file)
      queue.push({ content: file.content!, filename: file.path })
    }
  }

  return Array.from(found.values())
}

// Staged inside the project so that types imported from packages keep resolving
// by walking up to the project's node_modules. The nearest one may be above cwd
// when dependencies are hoisted in a workspace. Without any node_modules (Yarn
// PnP), fall back to a system temp directory so relative imports still resolve.
async function createStagingDirectory(cwd: string) {
  const modules = findNodeModules(cwd)

  try {
    if (!modules)
      return { root: await mkdtemp(path.join(tmpdir(), 'shadcn-vue-sfc-')) }

    const cache = path.join(modules, '.cache')
    const cacheExisted = existsSync(cache)
    await mkdir(cache, { recursive: true })
    return {
      root: await mkdtemp(path.join(cache, 'shadcn-vue-sfc-')),
      cache: cacheExisted ? undefined : cache,
    }
  }
  catch {
    return undefined
  }
}

function findNodeModules(cwd: string) {
  let directory = path.resolve(cwd)

  while (true) {
    const modules = path.join(directory, 'node_modules')

    if (existsSync(modules))
      return modules

    const parent = path.dirname(directory)

    if (parent === directory)
      return

    directory = parent
  }
}

async function transpileVueSFC(content: string, filename: string) {
  const { descriptor, errors } = parse(content, {
    filename,
    ignoreEmpty: true,
  })

  const fatalErrors = errors.filter(error =>
    typeof error === 'string'
    || !('code' in error)
    || error.code !== DUPLICATE_ATTRIBUTE_ERROR_CODE,
  )

  if (fatalErrors.length) {
    throw new Error(fatalErrors.map(error => typeof error === 'string' ? error : error.message).join('\n'))
  }

  const output = new MagicString(content)
  const isTypeScriptSFC = [descriptor.script, descriptor.scriptSetup]
    .some(block => block?.lang === 'ts' || block?.lang === 'tsx')

  if (isTypeScriptSFC && descriptor.template?.ast) {
    const template = await transpileVueTemplate(
      descriptor.template.content,
      descriptor.template.ast as Parameters<typeof transpileVueTemplate>[1],
      descriptor.template.loc.start.offset,
      async code => await stripTypeScript(code, 'ts'),
    )
    replaceBlockContent(output, content, descriptor.template, template)
  }

  if (
    !descriptor.script?.src
    && (descriptor.script?.lang === 'ts' || descriptor.script?.lang === 'tsx')
  ) {
    const script = removeEmptyExport(
      descriptor.script.content,
      await stripTypeScript(descriptor.script.content, descriptor.script.lang, true),
    )
    replaceBlockContent(output, content, descriptor.script, script, true)
  }

  if (descriptor.scriptSetup?.lang === 'ts' || descriptor.scriptSetup?.lang === 'tsx') {
    const preTranspiled = await preTranspileScriptSetup(
      descriptor as Parameters<typeof preTranspileScriptSetup>[0],
      filename,
    )
    const scriptSetup = removeEmptyExport(
      preTranspiled.content,
      await stripTypeScript(preTranspiled.content, descriptor.scriptSetup.lang, true),
    )
    replaceBlockContent(output, content, descriptor.scriptSetup, scriptSetup, true)
  }

  // Empty blocks are dropped from the descriptor, so their `lang` is left over.
  const transformed = output.toString().replace(
    EMPTY_SCRIPT_RE,
    (tag, attributes: string, whitespace: string) => /\ssrc\s*=/.test(attributes)
      ? tag
      : `<script${attributes.replace(TS_LANG_ATTRIBUTE_RE, '')}>${whitespace}</script>`,
  )

  return await format(transformed, {
    parser: 'vue',
    proseWrap: 'never',
    // Runtime props come out of the transform one key per line.
    objectWrap: 'collapse',
  })
}

async function transformScript(content: string, filename: string) {
  const loader = getScriptLoader(filename)

  if (!loader)
    return content

  const output = await stripTypeScript(content, loader, true)

  return await format(output, {
    parser: loader === 'ts' || loader === 'tsx' ? 'typescript' : 'babel',
    proseWrap: 'never',
    objectWrap: 'collapse',
  })
}

function getScriptLoader(filename: string) {
  if (filename.endsWith('.tsx'))
    return 'tsx' as const
  if (filename.endsWith('.jsx'))
    return 'jsx' as const
  if (['.js', '.cjs', '.mjs'].some(extension => filename.endsWith(extension)))
    return 'js' as const
  if (['.ts', '.cts', '.mts'].some(extension => filename.endsWith(extension)))
    return 'ts' as const
}

type ScriptLoader = 'js' | 'jsx' | 'ts' | 'tsx'

async function stripTypeScript(
  content: string,
  loader: ScriptLoader,
  preserveBlankLines = false,
) {
  const source = preserveBlankLines ? markBlankLines(content, loader) : content
  const result = await transform('__sfc.ts', source, {
    lang: loader,
    target: 'esnext',
    jsx: 'preserve',
    typescript: { onlyRemoveTypeImports: true },
    tsconfig: {
      compilerOptions: {
        verbatimModuleSyntax: true,
      },
    },
  })

  if (result.errors.length)
    throw new Error(result.errors.map(error => error.message).join('\n'))

  return removeTypeOnlyImportLeftovers(content, result.code)
    .replace(TS_DIRECTIVE_COMMENT_RE, '')
    .replace(BLANK_LINE_MARKER_RE, '')
    .trimEnd()
}

// Put a marker in front of each statement or comment that starts its own line
// right after a blank line. Statements and comments come from the parser, so a
// blank line inside a string or template literal is never touched.
function markBlankLines(content: string, loader: ScriptLoader) {
  const { program, comments, errors } = parseSync('__sfc.ts', content, { lang: loader })

  if (errors.length)
    return content

  const statements: Statement[] = []
  collectStatements(program, statements)

  const anchors = [...comments, ...statements]
  const lineStarts = new Set<number>()

  for (const anchor of anchors) {
    const lineStart = content.lastIndexOf('\n', anchor.start - 1) + 1

    if (lineStart === 0 || content.slice(lineStart, anchor.start).trim())
      continue

    const previousLineStart = content.lastIndexOf('\n', lineStart - 2) + 1

    if (content.slice(previousLineStart, lineStart - 1).trim())
      continue

    lineStarts.add(lineStart)

    // A type-only statement disappears along with its marker, so hand the
    // blank line on to whatever follows it.
    if ('typeOnly' in anchor && anchor.typeOnly) {
      const nextLineStart = content.indexOf('\n', anchor.end) + 1

      if (nextLineStart > 0 && nextLineStart < content.length)
        lineStarts.add(nextLineStart)
    }
  }

  const output = new MagicString(content)

  for (const lineStart of Array.from(lineStarts))
    output.appendLeft(lineStart, `${BLANK_LINE_MARKER}\n`)

  return output.toString()
}

interface Statement {
  start: number
  end: number
  typeOnly: boolean
}

function collectStatements(node: unknown, statements: Statement[]) {
  if (!node || typeof node !== 'object')
    return

  if (Array.isArray(node)) {
    for (const child of node)
      collectStatements(child, statements)
    return
  }

  const { type, start, end, importKind, exportKind, declaration } = node as Record<string, any>

  if (typeof type === 'string' && typeof start === 'number' && /(?:Statement|Declaration)$/.test(type)) {
    statements.push({
      start,
      end,
      typeOnly: type.startsWith('TS')
        || importKind === 'type'
        || exportKind === 'type'
        || (typeof declaration?.type === 'string' && declaration.type.startsWith('TS')),
    })
  }

  for (const value of Object.values(node))
    collectStatements(value, statements)
}

// `verbatimModuleSyntax` turns `import { type Props } from './props'` into a bare
// `import './props'` once the type specifiers are gone. Those modules were only
// imported for their types, so drop the leftovers while keeping the side effect
// imports that were written as such.
function removeTypeOnlyImportLeftovers(source: string, output: string) {
  const sideEffectImports = new Set(
    Array.from(source.matchAll(SOURCE_SIDE_EFFECT_IMPORT_RE), match => match[2]),
  )

  return output.replace(
    SIDE_EFFECT_IMPORT_RE,
    (statement, _quote, specifier) => sideEffectImports.has(specifier) ? statement : '',
  )
}

// Once its only imports are type imports, a module gets an `export {}` to stay a
// module. An SFC block is always one, and `<script setup>` rejects any export.
function removeEmptyExport(source: string, output: string) {
  return source.search(EMPTY_EXPORT_RE) !== -1 ? output : output.replace(EMPTY_EXPORT_RE, '').trimEnd()
}

function replaceBlockContent(
  output: MagicString,
  source: string,
  block: SFCBlock,
  content: string,
  removeTypeScriptLang = false,
) {
  if (block.loc.start.offset !== block.loc.end.offset)
    output.overwrite(block.loc.start.offset, block.loc.end.offset, content)

  if (!removeTypeScriptLang)
    return

  const blockStart = source.lastIndexOf(`<${block.type}`, block.loc.start.offset)
  const openTag = source.slice(blockStart, block.loc.start.offset)
  const transformedOpenTag = openTag
    .replace(TS_LANG_ATTRIBUTE_RE, '')
    .replace(GENERIC_ATTRIBUTE_RE, '')

  output.overwrite(blockStart, block.loc.start.offset, transformedOpenTag)
}
