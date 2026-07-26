export type Library = 'lucide' | 'tabler' | 'hugeicons' | 'phosphor' | 'remixicon'
export const GENERATABLE_LIBRARIES: Library[] = ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon']
export type PlaceholderRecord = Partial<Record<Library, string>>
export type IconMapping = Record<string, Record<string, string>>

/**
 * Convert a Phosphor placeholder alias (e.g. `CheckCircleIcon`) to the raw
 * `@phosphor-icons/vue` export name (`PhCheckCircle`) that the CLI map needs.
 */
export function deriveRawPhosphor(alias: string): string {
  return `Ph${alias.replace(/Icon$/, '')}`
}

/**
 * Build a `canonical -> { library: name }` mapping from scanned placeholder
 * records, keyed on each record's `lucide` value. Phosphor values are derived
 * to their raw export; conflicting values keep the first and emit a warning;
 * records without a `lucide` prop are skipped (with a warning). `usage` collects
 * the names seen per library (Phosphor keeps the alias form).
 */
export function buildMappingFromRecords(records: PlaceholderRecord[]): {
  mapping: IconMapping
  usage: Record<Library, Set<string>>
  warnings: string[]
} {
  const mapping: IconMapping = {}
  const usage = Object.fromEntries(GENERATABLE_LIBRARIES.map(l => [l, new Set<string>()])) as Record<Library, Set<string>>
  const warnings: string[] = []

  for (const record of records) {
    const canonical = record.lucide
    if (!canonical) {
      warnings.push('IconPlaceholder without a lucide prop')
      continue
    }
    const entry = (mapping[canonical] ??= {})
    for (const library of GENERATABLE_LIBRARIES) {
      const raw = record[library]
      if (!raw)
        continue
      usage[library].add(raw)
      const value = library === 'phosphor' ? deriveRawPhosphor(raw) : raw
      if (entry[library] && entry[library] !== value) {
        warnings.push(`Conflicting ${library} mapping for ${canonical}: keeping ${entry[library]}, ignoring ${value}`)
        continue
      }
      entry[library] = value
    }
  }

  return { mapping, usage, warnings }
}

const LIBRARY_ORDER = ['lucide', 'radix', 'tabler', 'hugeicons', 'phosphor', 'remixicon'] as const

/**
 * Merge the hand-maintained `legacy` layer with the `scanned` mapping. Legacy
 * entries come first and their values win; the scan only fills libraries a
 * legacy entry lacks, matched by exact key or the `+Icon` bridge. Remaining
 * scanned-only canonicals are appended sorted.
 */
export function mergeLegacy(legacy: IconMapping, scanned: IconMapping): IconMapping {
  const output: IconMapping = {}
  const remaining: IconMapping = { ...scanned }

  for (const [canonical, legacyEntry] of Object.entries(legacy)) {
    const entry: Record<string, string> = { ...legacyEntry }
    const scannedKey
      = canonical in remaining ? canonical : `${canonical}Icon` in remaining ? `${canonical}Icon` : undefined
    if (scannedKey) {
      for (const library of LIBRARY_ORDER) {
        if (!entry[library] && remaining[scannedKey][library]) {
          entry[library] = remaining[scannedKey][library]
        }
      }
      delete remaining[scannedKey]
    }
    output[canonical] = entry
  }

  for (const canonical of Object.keys(remaining).sort()) {
    const entry: Record<string, string> = {}
    for (const library of LIBRARY_ORDER) {
      if (remaining[canonical][library])
        entry[library] = remaining[canonical][library]
    }
    output[canonical] = entry
  }

  return output
}

export const LIBRARY_EXPORT: Record<Library, string> = {
  lucide: '@lucide/vue',
  tabler: '@tabler/icons-vue',
  hugeicons: '@hugeicons/core-free-icons',
  phosphor: '@phosphor-icons/vue',
  remixicon: '@remixicon/vue',
}

/**
 * Return the deduplicated, sorted set of `usedLucide` names that have no entry
 * in `mapping`, applying the CLI's suffix bridge (a name matches if it, its
 * `Icon`-stripped form, or its `+Icon` form is a key).
 */
export function findUncovered(mapping: IconMapping, usedLucide: string[]): string[] {
  const has = (n: string) => n in mapping || n.replace(/Icon$/, '') in mapping || `${n}Icon` in mapping
  return [...new Set(usedLucide)].filter(n => !has(n)).sort()
}

/**
 * Parse the exported icon names from every `@lucide/vue` named import in one
 * SFC's source. An alias (`Foo as Bar`) resolves to the exported name `Foo`,
 * and a leading `type` modifier is dropped, so coverage lookups match the
 * mapping keys rather than the local alias.
 */
export function parseLucideImports(source: string): string[] {
  const names: string[] = []
  for (const m of source.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]@lucide\/vue['"]/g)) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]?.trim()
      if (name)
        names.push(name)
    }
  }
  return names
}

/**
 * Detect canonical keys present in both unsuffixed and `Icon`-suffixed form
 * (e.g. `Search` and `SearchIcon`) — the same Lucide icon under two keys,
 * caused by base placeholders disagreeing on their `lucide=` value. Returns
 * the unsuffixed key of each offending pair, sorted.
 */
export function findDuplicateCanonicals(mapping: IconMapping): string[] {
  return Object.keys(mapping)
    .filter(k => !k.endsWith('Icon') && `${k}Icon` in mapping)
    .sort()
}
