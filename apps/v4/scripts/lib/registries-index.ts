import type { RegistryEntry } from '@/registry/registries'

// Matches the CLI's registriesIndexSchema key regex verbatim.
const NAME_RE = /^@[a-z0-9][\w-]*$/i

export function buildRegistriesIndex(entries: RegistryEntry[]): Record<string, string> {
  const index: Record<string, string> = {}

  for (const entry of entries) {
    if (!NAME_RE.test(entry.name)) {
      throw new Error(
        `Invalid registry name "${entry.name}": must match ${NAME_RE} (start with @).`,
      )
    }
    if (!entry.url.includes('{name}')) {
      throw new Error(
        `Invalid registry url for "${entry.name}": must include the {name} placeholder.`,
      )
    }
    if (entry.name in index) {
      throw new Error(`Duplicate registry name "${entry.name}".`)
    }
    index[entry.name] = entry.url
  }

  return index
}
