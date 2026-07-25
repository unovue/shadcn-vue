import type { Library, PlaceholderRecord } from './build-icons.helpers'
import { GENERATABLE_LIBRARIES } from './build-icons.helpers'

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
