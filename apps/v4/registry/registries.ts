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
  {
    name: "@ai-elements",
    title: "AI Elements Vue",
    description: "Pre-built components like conversations, messages and more to help you build AI-native applications faster.",
    url: "https://registry.ai-elements-vue.com/{name}.json",
    homepage: "https://ai-elements-vue.com",
    author: "vuepont",
    logo: "<svg stroke-linejoin='round' viewBox='0 0 16 16' width='18' style='color:currentcolor'><path fill-rule='evenodd' clip-rule='evenodd' d='M8 1L16 15H0L8 1Z' fill='currentColor'></path></svg>",
    tags: ["ui", "ai", "chatbot", "elements"],
  },
  {
    name: "@elevenlabs-ui",
    title: "ElevenLabs UI Vue",
    description: "A collection of Open Source agent and audio components that you can customize and extend.",
    url: "https://registry.elevenlabs-ui-vue.com/{name}.json",
    homepage: "https://elevenlabs-ui-vue.com",
    author: "vuepont",
    logo: "<svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><title>ElevenLabs</title><path d='M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z'/></svg>",
    tags: ["ui", "ai", "agent", "audio"],
  },
  {
    name: "@wick-charts",
    title: "Wick Charts",
    description: "Realtime canvas charts for shadcn-vue that stay smooth while data streams in. Colors come from your theme tokens, in light and dark mode.",
    url: "https://wick-charts.eeff.io/r/vue/{name}.json",
    homepage: "https://wick-charts.eeff.io/integrations/shadcn/vue/",
    author: "mo4islona",
    logo: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 227 144' role='img' aria-label='Wick Charts'><path fill='currentColor' d='M141.5 143.2C137.4 142.2 133.6 138.4 123.9 125.6C108.7 105.6 90.7 82.3 88.5 79.7C87.4 78.3 85.9 76.2 85.2 75C84.4 73.7 80.8 68.8 77.1 64C73.4 59.3 69.5 53.9 68.4 51.9C67.4 50 66 47.9 65.5 47.3C64.9 46.7 59.6 39.6 53.7 31.6C47.8 23.5 42.3 16.9 41.5 16.9C40 16.9 16.7 46.8 16.2 49.4C16 50.2 16.9 52.4 18.3 54.2C24.9 63.1 55.8 104.8 57.5 107C66.5 119 72.2 125.9 73 125.9C73.5 125.9 76.3 122.7 79.2 118.8C88.9 105.9 89.9 104.9 91.9 106.1C94.5 107.7 99 115.3 99 118.1C99 121.2 88.5 135.6 83.6 139.4C79 142.9 72 143.8 66.8 141.6C63.2 140.1 56.2 132.2 47 119.4C44.5 116 35.8 104.2 27.5 93.3C19.3 82.4 11.2 71.4 9.5 68.9C7.9 66.5 6.1 64.3 5.7 64.1C3.9 63.3 0 53.3 0 49.6C0 47.5 0.7 44.3 1.5 42.6C4.6 36.4 29.6 4.5 33 2.5C37.2 0 45.2 -0.1 49.7 2.2C52.7 3.8 57 9.1 79.2 38.4C84.2 45 88.8 50.9 89.5 51.4C90.1 52 91.9 54.4 93.5 56.9C95.9 60.7 101.2 67.9 122.6 96.4C125.1 99.7 129.6 105.8 132.7 109.9C135.7 114 138.8 117.9 139.5 118.4C140.1 119 141.4 120.9 142.4 122.7C145.2 128.1 146.8 127.2 155.2 115.9C163.1 105.2 163.4 105 166.7 109C172.9 116.4 173.3 119.2 168.8 125.7C158.4 141.1 151.3 145.6 141.5 143.2ZM179.7 103.2C177.3 100 168.9 88.6 161 77.9C153.1 67.2 145.9 57.5 144.9 56.4C143.9 55.3 140.5 50.8 137.4 46.4C134.3 42 130.2 36.6 128.3 34.4C126.4 32.2 122.9 27.5 120.6 23.9C117.9 19.7 115.7 17.4 114.5 17.4C113.3 17.4 110.7 20.1 107.4 24.9C100 35.5 97 39 95.8 38.3C93.7 37 89 28.4 89 25.8C89 22.9 97.9 9.6 103.3 4.4C106 1.8 107.2 1.4 113.4 1.1C119.5 0.8 120.9 1.1 123.7 3.1C125.4 4.4 132.7 13.3 139.9 22.9C147 32.5 154.7 42.9 157 45.9C159.3 49 166.3 58.4 172.6 66.9C178.9 75.4 184.2 82.5 184.5 82.7C184.7 83 186.6 80.5 188.6 77.3C190.6 74.1 195.1 68 198.4 63.9C201.8 59.8 206.1 54.3 207.9 51.7C210.9 47.5 211.1 46.8 209.9 45C202.6 34.5 188.2 17 186.8 17C185.8 16.9 182.1 21.1 177.4 27.4C173.2 33.2 169.3 37.6 168.8 37.3C168.3 37 166.5 34.9 164.9 32.7C160.2 26.1 160.8 23 168.7 12.4C177.4 1 182.5 -1.6 191.8 0.9C196.9 2.2 200 5.4 213.9 23.4C226.3 39.3 228.1 43.7 225.7 52C224.8 55 222.6 59.3 220.7 61.5C218.9 63.6 215.8 67.6 213.9 70.3C212 73 209.4 76.7 208 78.5C206.6 80.3 203.9 84 202.1 86.6C200.2 89.3 198.4 91.7 198 91.9C197.7 92.2 194.8 96.1 191.6 100.7C188.3 105.2 185.3 108.9 184.9 108.9C184.5 108.9 182.1 106.3 179.7 103.2Z'/></svg>",
    tags: ["charts", "blocks", "realtime"],
  },
]
