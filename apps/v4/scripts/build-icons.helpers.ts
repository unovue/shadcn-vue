export type Library = 'lucide' | 'tabler' | 'hugeicons' | 'phosphor' | 'remixicon'
export const GENERATABLE_LIBRARIES: Library[] = ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon']
export type PlaceholderRecord = Partial<Record<Library, string>>
export type IconMapping = Record<string, Record<string, string>>

export function deriveRawPhosphor(alias: string): string {
  return `Ph${alias.replace(/Icon$/, '')}`
}

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
