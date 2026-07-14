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
  /** Inline SVG logo markup, rendered with fill/stroke inherited from the foreground color */
  logo?: string
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
    logo: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"><rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"208\" y1=\"128\" x2=\"128\" y2=\"208\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"></line><line x1=\"192\" y1=\"40\" x2=\"40\" y2=\"192\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"></line></svg>",
    tags: ["ui", "blocks", "charts"],
  },
  {
    name: "@inspira-ui",
    title: "Inspira UI",
    description: "Open-source animated components and effects for Vue and Nuxt.",
    url: "https://registry.inspira-ui.com/{name}.json",
    homepage: "https://inspira-ui.com",
    author: "Rahul Vashishtha",
    logo: "<svg width=\"150\" height=\"150\" viewBox=\"0 0 150 150\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_13_102)\"><path d=\"M15.9288 21.2779C14.8902 17.4217 18.4217 13.8902 22.2779 14.9288L98.7834 35.5349C102.631 36.5712 103.917 41.382 101.099 44.1996L45.1996 100.099C42.382 102.917 37.5712 101.631 36.5349 97.7834L15.9288 21.2779Z\" fill=\"url(#paint0_radial_13_102)\" /><path d=\"M15.9288 21.2779C14.8902 17.4217 18.4217 13.8902 22.2779 14.9288L98.7834 35.5349C102.631 36.5712 103.917 41.382 101.099 44.1996L45.1996 100.099C42.382 102.917 37.5712 101.631 36.5349 97.7834L15.9288 21.2779Z\" fill=\"url(#paint1_radial_13_102)\" fill-opacity=\"0.5\" /><path d=\"M16.429 21.1432C15.4943 17.6726 18.6726 14.4943 22.1432 15.429L98.6487 36.0351C102.111 36.9677 103.269 41.2975 100.733 43.8333L44.8333 99.7328C42.2975 102.269 37.9677 101.111 37.0351 97.6487L16.429 21.1432Z\" fill=\"url(#paint2_radial_13_102)\" fill-opacity=\"0.5\" stroke=\"url(#paint3_linear_13_102)\" stroke-width=\"1.03602\" stroke-linejoin=\"round\" /><path d=\"M134.663 129.313C135.701 133.17 132.17 136.701 128.314 135.663L51.808 115.057C47.9604 114.02 46.6747 109.209 49.4923 106.392L105.392 50.4923C108.209 47.6747 113.02 48.9604 114.057 52.808L134.663 129.313Z\" fill=\"url(#paint4_radial_13_102)\" /><path d=\"M134.663 129.313C135.701 133.17 132.17 136.701 128.314 135.663L51.808 115.057C47.9604 114.02 46.6747 109.209 49.4923 106.392L105.392 50.4923C108.209 47.6747 113.02 48.9604 114.057 52.808L134.663 129.313Z\" fill=\"url(#paint5_radial_13_102)\" fill-opacity=\"0.5\" /><path d=\"M134.162 129.448C135.097 132.919 131.919 136.097 128.448 135.162L51.9427 114.556C48.4799 113.624 47.3228 109.294 49.8586 106.758L105.758 50.8586C108.294 48.3228 112.624 49.4799 113.556 52.9427L134.162 129.448Z\" fill=\"url(#paint6_radial_13_102)\" fill-opacity=\"0.5\" stroke=\"url(#paint7_linear_13_102)\" stroke-width=\"1.03602\" stroke-linejoin=\"round\" /></g><defs><radialGradient id=\"paint0_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(41.752 99.2994) rotate(-77.1419) scale(69.1305 68.9235)\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" stop-opacity=\"0.46\" /></radialGradient><radialGradient id=\"paint1_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(52.0081 50.9494) rotate(-135) scale(102.566 102.259)\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" /></radialGradient><radialGradient id=\"paint2_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(43.9498 42.891) rotate(45) scale(69.4133 69.2054)\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" /></radialGradient><linearGradient id=\"paint3_linear_13_102\" x1=\"73.9854\" y1=\"70.7289\" x2=\"15.013\" y2=\"11.7565\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"currentColor\" stop-opacity=\"0.6\" /><stop offset=\"0.494792\" stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" stop-opacity=\"0.38\" /></linearGradient><radialGradient id=\"paint4_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(108.839 51.292) rotate(102.858) scale(69.1305 68.9235)\"><stop offset=\"0.09\" stop-color=\"currentColor\" /><stop offset=\"1\" stop-color=\"currentColor\" stop-opacity=\"0\" /></radialGradient><radialGradient id=\"paint5_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(98.5833 99.642) rotate(45) scale(102.566 102.259)\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"0.0001\" stop-color=\"currentColor\" /></radialGradient><radialGradient id=\"paint6_radial_13_102\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(106.642 107.7) rotate(-135) scale(69.4133 69.2054)\"><stop stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" /></radialGradient><linearGradient id=\"paint7_linear_13_102\" x1=\"76.606\" y1=\"79.8625\" x2=\"135.578\" y2=\"138.835\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"currentColor\" stop-opacity=\"0.6\" /><stop offset=\"0.494792\" stop-color=\"currentColor\" stop-opacity=\"0\" /><stop offset=\"1\" stop-color=\"currentColor\" stop-opacity=\"0.38\" /></linearGradient><clipPath id=\"clip0_13_102\"><rect width=\"150\" height=\"150\" fill=\"currentColor\" /></clipPath></defs></svg>",
    tags: ["ui", "animations", "effects"],
  },
  {
    name: "@mapcn",
    title: "Mapcn",
    description: "Beautiful maps, made simple.",
    url: "https://mapcn-vue.geoql.in/r/{name}.json",
    homepage: "https://mapcn-vue.geoql.in",
    author: "GeoQL",
    logo: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21\" fill=\"none\"/><line x1=\"9\" x2=\"9\" y1=\"3\" y2=\"18\" fill=\"none\"/><line x1=\"15\" x2=\"15\" y1=\"6\" y2=\"21\" fill=\"none\"/></svg>",
    tags: ["ui", "maps"],
  },
]
