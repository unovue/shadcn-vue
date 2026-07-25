import type { IconMapping, Library, PlaceholderRecord } from './build-icons.helpers'
import { GENERATABLE_LIBRARIES, LIBRARY_EXPORT } from './build-icons.helpers'

const PLACEHOLDER_RE = /<IconPlaceholder\b([^>]*?)\/?>/g

export function scanPlaceholders(source: string): PlaceholderRecord[] {
  const records: PlaceholderRecord[] = []
  for (const match of source.matchAll(PLACEHOLDER_RE)) {
    const attrs = match[1]
    const record: PlaceholderRecord = {}
    for (const library of GENERATABLE_LIBRARIES) {
      const attr = attrs.match(new RegExp(`\\b${library}=["']([^"']+)["']`))
      if (attr)
        record[library] = attr[1]
    }
    if (Object.keys(record).length > 0)
      records.push(record)
  }
  return records
}

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
