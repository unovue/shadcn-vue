import type { RegistryItem } from "shadcn-vue/schema"

// Fonts are self-hosted through fontsource: the CLI installs `dependency` and
// imports it from the project's CSS file, so nothing is fetched from a font
// CDN at runtime. `family` must match the font-family the fontsource package
// declares, which is why the variable builds all read "<Name> Variable".
//
// `variable` is the theme variable a body font defines. Mono fonts map to
// --font-sans here (not --font-mono) so picking one as the body font actually
// changes body text, which is what the font picker offers.
export interface FontDefinition {
  name: string
  title: string
  family: string
  variable: "--font-sans" | "--font-mono" | "--font-serif"
  provider: "google"
  import: string
  dependency: string
  subsets: readonly string[]
}

export const FONT_DEFINITIONS = [
  {
    name: "geist-sans",
    title: "Geist Sans",
    family: "'Geist Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Geist",
    dependency: "@fontsource-variable/geist",
    subsets: ["latin"],
  },
  {
    name: "inter",
    title: "Inter",
    family: "'Inter Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Inter",
    dependency: "@fontsource-variable/inter",
    subsets: ["latin"],
  },
  {
    name: "noto-sans",
    title: "Noto Sans",
    family: "'Noto Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Noto_Sans",
    dependency: "@fontsource-variable/noto-sans",
    subsets: ["latin"],
  },
  {
    name: "nunito-sans",
    title: "Nunito Sans",
    family: "'Nunito Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Nunito_Sans",
    dependency: "@fontsource-variable/nunito-sans",
    subsets: ["latin"],
  },
  {
    name: "figtree",
    title: "Figtree",
    family: "'Figtree Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Figtree",
    dependency: "@fontsource-variable/figtree",
    subsets: ["latin"],
  },
  {
    name: "roboto",
    title: "Roboto",
    family: "'Roboto Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Roboto",
    dependency: "@fontsource-variable/roboto",
    subsets: ["latin"],
  },
  {
    name: "raleway",
    title: "Raleway",
    family: "'Raleway Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Raleway",
    dependency: "@fontsource-variable/raleway",
    subsets: ["latin"],
  },
  {
    name: "dm-sans",
    title: "DM Sans",
    family: "'DM Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "DM_Sans",
    dependency: "@fontsource-variable/dm-sans",
    subsets: ["latin"],
  },
  {
    name: "public-sans",
    title: "Public Sans",
    family: "'Public Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Public_Sans",
    dependency: "@fontsource-variable/public-sans",
    subsets: ["latin"],
  },
  {
    name: "outfit",
    title: "Outfit",
    family: "'Outfit Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Outfit",
    dependency: "@fontsource-variable/outfit",
    subsets: ["latin"],
  },
  {
    name: "jetbrains-mono",
    title: "JetBrains Mono",
    family: "'JetBrains Mono Variable', monospace",
    variable: "--font-sans",
    provider: "google",
    import: "JetBrains_Mono",
    dependency: "@fontsource-variable/jetbrains-mono",
    subsets: ["latin"],
  },
  {
    name: "playfair-display",
    title: "Playfair Display",
    family: "'Playfair Display Variable', serif",
    variable: "--font-serif",
    provider: "google",
    import: "Playfair_Display",
    dependency: "@fontsource-variable/playfair-display",
    subsets: ["latin"],
  },
  {
    name: "oxanium",
    title: "Oxanium",
    family: "'Oxanium Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Oxanium",
    dependency: "@fontsource-variable/oxanium",
    subsets: ["latin"],
  },
  {
    name: "manrope",
    title: "Manrope",
    family: "'Manrope Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Manrope",
    dependency: "@fontsource-variable/manrope",
    subsets: ["latin"],
  },
  {
    name: "space-grotesk",
    title: "Space Grotesk",
    family: "'Space Grotesk Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Space_Grotesk",
    dependency: "@fontsource-variable/space-grotesk",
    subsets: ["latin"],
  },
  {
    name: "montserrat",
    title: "Montserrat",
    family: "'Montserrat Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Montserrat",
    dependency: "@fontsource-variable/montserrat",
    subsets: ["latin"],
  },
  {
    name: "ibm-plex-sans",
    title: "IBM Plex Sans",
    family: "'IBM Plex Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "IBM_Plex_Sans",
    dependency: "@fontsource-variable/ibm-plex-sans",
    subsets: ["latin"],
  },
  {
    name: "source-sans-3",
    title: "Source Sans 3",
    family: "'Source Sans 3 Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Source_Sans_3",
    dependency: "@fontsource-variable/source-sans-3",
    subsets: ["latin"],
  },
  {
    name: "instrument-sans",
    title: "Instrument Sans",
    family: "'Instrument Sans Variable', sans-serif",
    variable: "--font-sans",
    provider: "google",
    import: "Instrument_Sans",
    dependency: "@fontsource-variable/instrument-sans",
    subsets: ["latin"],
  },
  {
    name: "geist-mono",
    title: "Geist Mono",
    family: "'Geist Mono Variable', monospace",
    variable: "--font-sans",
    provider: "google",
    import: "Geist_Mono",
    dependency: "@fontsource-variable/geist-mono",
    subsets: ["latin"],
  },
  {
    name: "noto-serif",
    title: "Noto Serif",
    family: "'Noto Serif Variable', serif",
    variable: "--font-serif",
    provider: "google",
    import: "Noto_Serif",
    dependency: "@fontsource-variable/noto-serif",
    subsets: ["latin"],
  },
  {
    name: "roboto-slab",
    title: "Roboto Slab",
    family: "'Roboto Slab Variable', serif",
    variable: "--font-serif",
    provider: "google",
    import: "Roboto_Slab",
    dependency: "@fontsource-variable/roboto-slab",
    subsets: ["latin"],
  },
  {
    name: "merriweather",
    title: "Merriweather",
    family: "'Merriweather Variable', serif",
    variable: "--font-serif",
    provider: "google",
    import: "Merriweather",
    dependency: "@fontsource-variable/merriweather",
    subsets: ["latin"],
  },
  {
    name: "lora",
    title: "Lora",
    family: "'Lora Variable', serif",
    variable: "--font-serif",
    provider: "google",
    import: "Lora",
    dependency: "@fontsource-variable/lora",
    subsets: ["latin"],
  },
] as const satisfies readonly FontDefinition[]

function createFontItem(definition: FontDefinition, role: "body" | "heading") {
  return {
    name:
      role === "body"
        ? `font-${definition.name}`
        : `font-heading-${definition.name}`,
    title:
      role === "body" ? definition.title : `${definition.title} (Heading)`,
    type: "registry:font",
    font: {
      family: definition.family,
      provider: definition.provider,
      // A heading font only ever defines --font-heading; the body font owns
      // the root variable.
      variable: role === "body" ? definition.variable : "--font-heading",
      subsets: [...definition.subsets],
      import: definition.import,
      dependency: definition.dependency,
    },
  } satisfies RegistryItem
}

export const bodyFonts = FONT_DEFINITIONS.map(definition =>
  createFontItem(definition, "body"),
) satisfies RegistryItem[]

export const headingFonts = FONT_DEFINITIONS.map(definition =>
  createFontItem(definition, "heading"),
) satisfies RegistryItem[]

export const fonts = [...bodyFonts, ...headingFonts] satisfies RegistryItem[]
