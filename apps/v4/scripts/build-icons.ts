import type { IconMapping, Library, PlaceholderRecord } from './build-icons.helpers'
import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  buildMappingFromRecords,
  findDuplicateCanonicals,
  findUncovered,
  GENERATABLE_LIBRARIES,
  LIBRARY_EXPORT,
  mergeLegacy,
  parseLucideImports,
} from './build-icons.helpers'

const PLACEHOLDER_RE = /<IconPlaceholder\b([^>]*?)\/?>/g

/**
 * Extract one record per `<IconPlaceholder>` in an SFC's source, reading the
 * static `lucide`/`tabler`/`hugeicons`/`phosphor`/`remixicon` attributes.
 * Dynamic bindings (`:lucide=`, `v-bind:lucide=`) and `data-` attrs are ignored.
 */
export function scanPlaceholders(source: string): PlaceholderRecord[] {
  const records: PlaceholderRecord[] = []
  for (const match of source.matchAll(PLACEHOLDER_RE)) {
    const attrs = match[1]
    const record: PlaceholderRecord = {}
    for (const library of GENERATABLE_LIBRARIES) {
      const attr = attrs.match(new RegExp(`(?<![:\\w-])${library}=["']([^"']+)["']`))
      if (attr)
        record[library] = attr[1]
    }
    if (Object.keys(record).length > 0)
      records.push(record)
  }
  return records
}

/**
 * Verify every mapped icon name is a real export of its library's package
 * (radix is skipped — it is legacy-only and not installed). Returns a list of
 * human-readable error strings; empty means all names are valid.
 */
export async function validateNames(mapping: IconMapping): Promise<string[]> {
  const errors: string[] = []
  const exportsByLib = new Map<string, Set<string>>()

  for (const [library, pkg] of Object.entries(LIBRARY_EXPORT)) {
    const mod = await import(pkg)
    exportsByLib.set(library, new Set(Object.keys(mod)))
  }

  for (const [canonical, entry] of Object.entries(mapping)) {
    for (const [library, name] of Object.entries(entry)) {
      if (library === 'radix')
        continue // not installed; legacy-only
      const members = exportsByLib.get(library)
      if (members && !members.has(name)) {
        errors.push(`${canonical}: ${library} export "${name}" not found in ${LIBRARY_EXPORT[library as Library]}`)
      }
    }
  }
  return errors
}

const BASES_DIR = join(process.cwd(), 'registry/bases/reka')
const NY_UI_DIR = join(process.cwd(), 'registry/new-york-v4/ui')
const ICONS_OUT_DIR = join(process.cwd(), 'registry/icons')
const MAP_OUT = join(process.cwd(), 'public/r/icons/index.json')
const LEGACY_PATH = join(ICONS_OUT_DIR, 'legacy-mapping.json')

async function listVue(dir: string): Promise<string[]> {
  const entries = (await readdir(dir, { recursive: true })).filter(p => p.endsWith('.vue')).sort()
  return entries.map(p => join(dir, p))
}

async function collectLucideImports(dir: string): Promise<string[]> {
  const names: string[] = []
  for (const file of await listVue(dir)) {
    names.push(...parseLucideImports(await readFile(file, 'utf8')))
  }
  return names
}

async function writeIfChanged(path: string, content: string): Promise<void> {
  if (existsSync(path) && (await readFile(path, 'utf8')) === content)
    return
  await writeFile(path, content)
}

/**
 * Generate the CLI icon map: scan the base placeholders, merge the legacy
 * layer, guard against duplicate/invalid/uncovered icons, and write
 * `public/r/icons/index.json` (only when its content changed). Throws on any
 * validation, duplicate-key, or coverage failure.
 */
export async function buildIcons(opts: { verbose?: boolean } = {}): Promise<void> {
  // 1. scan bases
  const records = []
  for (const file of await listVue(BASES_DIR)) {
    records.push(...scanPlaceholders(await readFile(file, 'utf8')))
  }
  const { mapping: scanned, warnings } = buildMappingFromRecords(records)

  // 2. merge legacy (legacy wins, scan fills gaps)
  const legacy: IconMapping = JSON.parse(await readFile(LEGACY_PATH, 'utf8'))
  const merged = mergeLegacy(legacy, scanned)

  // 2b. guard against the same icon landing under both `X` and `XIcon` keys
  // (caused by inconsistent `lucide=` values across base placeholders).
  const duplicates = findDuplicateCanonicals(merged)
  if (duplicates.length) {
    throw new Error(
      `Duplicate canonical icon keys (same icon under both "X" and "XIcon"): ${duplicates.join(', ')}.\n`
      + `Make the base IconPlaceholder \`lucide=\` values consistent (prefer the "Icon"-suffixed form).`,
    )
  }

  // 3. validate names
  const validationErrors = await validateNames(merged)
  if (validationErrors.length) {
    throw new Error(`Icon name validation failed:\n${validationErrors.join('\n')}`)
  }

  // 4. coverage assertion for the raw-lucide new-york-v4 registry
  const uncovered = findUncovered(merged, await collectLucideImports(NY_UI_DIR))
  if (uncovered.length) {
    throw new Error(
      `The following @lucide/vue icons used in registry/new-york-v4/ui have no mapping:\n${
        uncovered.map(n => `  - ${n}`).join('\n')
      }\nAdd each to a base IconPlaceholder (registry/bases/reka/**) or pin it in registry/icons/legacy-mapping.json.`,
    )
  }

  // 5. write output
  await writeIfChanged(MAP_OUT, `${JSON.stringify(merged, null, 2)}\n`)

  console.log(`✓ Icon map: ${Object.keys(merged).length} icons (${Object.keys(legacy).length} legacy)`)
  if (warnings.length) {
    if (opts.verbose)
      warnings.forEach(w => console.warn(`⚠ ${w}`))
    else console.warn(`⚠ ${warnings.length} icon mapping conflicts (run with --verbose for details)`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildIcons({ verbose: process.argv.includes('--verbose') }).catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
