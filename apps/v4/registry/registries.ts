export interface RegistryEntry {
  /** Namespace key, e.g. "@acme". Must match /^@[a-z0-9][\w-]*$/i */
  name: string
  /** Display name, e.g. "Acme UI" */
  title: string
  description: string
  /** URL template; MUST contain the {name} placeholder, e.g. "https://acme.com/r/{name}.json" */
  url: string
  /** Public homepage / docs link for the registry */
  homepage: string
  author?: string
  /** Free-form tags used for client-side filtering, e.g. ["ui", "blocks"] */
  tags?: string[]
}

// Seed entries. Real-world curation is ongoing PR work.
export const registries: RegistryEntry[] = [
  {
    name: "@shadcn",
    title: "shadcn-vue",
    description: "The official shadcn-vue registry of components, blocks, and charts.",
    url: "https://shadcn-vue.com/r/styles/{style}/{name}.json",
    homepage: "https://shadcn-vue.com",
    author: "unovue",
    tags: ["ui", "blocks", "charts"],
  },
]
