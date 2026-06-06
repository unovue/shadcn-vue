import type { IconLibrary, IconLibraryName } from "shadcn-vue/icons"
import type { BaseColor } from "@/registry/base-colors"
import type { Base } from "@/registry/bases"

import type { Style } from "@/registry/styles"
import type { Theme } from "@/registry/themes"
import { iconLibraries } from "shadcn-vue/icons"
import { z } from "zod"
import { BASE_COLORS } from "@/registry/base-colors"
import { BASES } from "@/registry/bases"
import { fonts } from "@/registry/fonts"
import { STYLES } from "@/registry/styles"
import { THEMES } from "@/registry/themes"

const SHADCN_VERSION = "latest"

export { type Base, BASES }
export { type Style, STYLES }
export { type Theme, THEMES }
export { BASE_COLORS, type BaseColor }
export { fonts }
export { iconLibraries, type IconLibrary, type IconLibraryName }

export type BaseName = Base["name"]
export type StyleName = Style["name"]
export type ThemeName = Theme["name"]
export type BaseColorName = BaseColor["name"]

export const POINTER_CURSOR_SELECTOR
  = "button:not(:disabled), [role=\"button\"]:not(:disabled)"

// Derive font values from registry fonts (e.g., "font-inter" -> "inter").
const fontValues = fonts.map(f => f.name.replace("font-", "")) as [
  string,
  ...string[],
]

export type FontValue = (typeof fontValues)[number]

export const MENU_ACCENTS = [
  { value: "subtle", label: "Subtle" },
  { value: "bold", label: "Bold" },
] as const

export type MenuAccent = (typeof MENU_ACCENTS)[number]
export type MenuAccentValue = MenuAccent["value"]

export const MENU_COLORS = [
  { value: "default", label: "Default / Solid" },
  { value: "default-translucent", label: "Default / Translucent" },
  { value: "inverted", label: "Inverted / Solid" },
  { value: "inverted-translucent", label: "Inverted / Translucent" },
] as const

export type MenuColor = (typeof MENU_COLORS)[number]

export type MenuColorValue = MenuColor["value"]

export function isTranslucentMenuColor(menuColor?: MenuColorValue | null): menuColor is "default-translucent" | "inverted-translucent" {
  return menuColor === "default-translucent" || menuColor === "inverted-translucent"
}

export const RADII = [
  { name: "default", label: "Default", value: "" },
  { name: "none", label: "None", value: "0" },
  { name: "small", label: "Small", value: "0.45rem" },
  { name: "medium", label: "Medium", value: "0.625rem" },
  { name: "large", label: "Large", value: "0.875rem" },
] as const

export type Radius = (typeof RADII)[number]

export type RadiusValue = Radius["name"]

export const designSystemConfigSchema = z
  .object({
    base: z.enum(BASES.map(b => b.name) as [BaseName, ...BaseName[]]),
    style: z.enum(STYLES.map(s => s.name) as [StyleName, ...StyleName[]]),
    iconLibrary: z.enum(
      Object.keys(iconLibraries) as [IconLibraryName, ...IconLibraryName[]],
    ),
    baseColor: z
      .enum(
        BASE_COLORS.map(c => c.name) as [BaseColorName, ...BaseColorName[]],
      )
      .default("neutral"),
    theme: z.enum(THEMES.map(t => t.name) as [ThemeName, ...ThemeName[]]),
    // Defaults to `theme` at preset-apply time (see PRESETS). Surfacing it on
    // the schema lets style/preset pickers carry it alongside theme so that
    // picking e.g. Sera switches the chart palette to taupe in lockstep.
    chartColor: z
      .enum(THEMES.map(t => t.name) as [ThemeName, ...ThemeName[]])
      .optional(),
    font: z.enum(fontValues).default("inter"),
    fontHeading: z
      .enum(["inherit", ...fontValues] as [string, ...string[]])
      .default("inherit"),
    item: z.string().optional(),
    menuAccent: z
      .enum(
        MENU_ACCENTS.map(a => a.value) as [
          MenuAccentValue,
          ...MenuAccentValue[],
        ],
      )
      .default("subtle"),
    menuColor: z
      .enum(
        MENU_COLORS.map(m => m.value) as [MenuColorValue, ...MenuColorValue[]],
      )
      .default("default"),
    radius: z
      .enum(RADII.map(r => r.name) as [RadiusValue, ...RadiusValue[]])
      .default("default"),
    template: z.enum(["nuxt", "vite", "laravel", "astro"]).default("nuxt").optional(),
    pointer: z.boolean().default(false),
  })
  .refine(
    (data) => {
      const availableThemes = getThemesForBaseColor(data.baseColor)
      return availableThemes.some(t => t.name === data.theme)
    },
    data => ({
      message: `Theme "${data.theme}" is not available for base color "${data.baseColor}"`,
      path: ["theme"],
    }),
  )

export type DesignSystemConfig = z.infer<typeof designSystemConfigSchema>

export const DEFAULT_CONFIG: DesignSystemConfig = {
  base: "reka",
  style: "nova",
  baseColor: "neutral",
  theme: "neutral",
  iconLibrary: "lucide",
  font: "inter",
  fontHeading: "inherit",
  item: "preview02",
  menuAccent: "subtle",
  menuColor: "default",
  radius: "default",
  template: "nuxt",
  pointer: false,
}

export type Preset = {
  name: string
  title: string
  description: string
} & Omit<DesignSystemConfig, "pointer">

export const PRESETS: Preset[] = [
  {
    name: "reka-vega",
    title: "Vega",
    description: "Vega / Lucide / Inter",
    base: "reka",
    style: "vega",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "lucide",
    font: "inter",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-nova",
    title: "Nova",
    description: "Nova / Hugeicons / Inter",
    base: "reka",
    style: "nova",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "hugeicons",
    font: "inter",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-maia",
    title: "Maia",
    description: "Maia / Hugeicons / Figtree",
    base: "reka",
    style: "maia",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "hugeicons",
    font: "figtree",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-lyra",
    title: "Lyra",
    description: "Lyra / Hugeicons / JetBrains Mono",
    base: "reka",
    style: "lyra",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "hugeicons",
    font: "jetbrains-mono",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-mira",
    title: "Mira",
    description: "Mira / Hugeicons / Inter",
    base: "reka",
    style: "mira",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "hugeicons",
    font: "inter",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-luma",
    title: "Luma",
    description: "Luma / Lucide / Inter",
    base: "reka",
    style: "luma",
    baseColor: "neutral",
    theme: "neutral",
    chartColor: "neutral",
    iconLibrary: "lucide",
    font: "inter",
    fontHeading: "inherit",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
  {
    name: "reka-sera",
    title: "Sera",
    description: "Sera / Lucide / Noto Sans + Playfair Display",
    base: "reka",
    style: "sera",
    baseColor: "taupe",
    theme: "taupe",
    chartColor: "taupe",
    iconLibrary: "lucide",
    font: "noto-sans",
    fontHeading: "playfair-display",
    item: "Item",
    menuAccent: "subtle",
    menuColor: "default",
    radius: "default",
  },
]

export function getThemesForBaseColor(baseColorName: string) {
  const baseColorNames = BASE_COLORS.map(bc => bc.name)

  return THEMES.filter((theme) => {
    if (theme.name === baseColorName) {
      return true
    }
    return !baseColorNames.includes(theme.name)
  })
}

export function getBase(name: BaseName) {
  return BASES.find(base => base.name === name)
}

export function getStyle(name: StyleName) {
  return STYLES.find(style => style.name === name)
}

export function getTheme(name: ThemeName) {
  return THEMES.find(theme => theme.name === name)
}

export function getBaseColor(name: BaseColorName) {
  return BASE_COLORS.find(color => color.name === name)
}

export function getIconLibrary(name: IconLibraryName) {
  return iconLibraries[name]
}

// Builds a registry:theme item from a design system config.
export function buildRegistryTheme(config: DesignSystemConfig) {
  const baseColor = getBaseColor(config.baseColor)
  const theme = getTheme(config.theme)

  if (!baseColor || !theme) {
    throw new Error(
      `Base color "${config.baseColor}" or theme "${config.theme}" not found`,
    )
  }

  // Merge base color and theme CSS vars.
  const lightVars: Record<string, string> = {
    ...(baseColor.cssVars?.light as Record<string, string>),
    ...(theme.cssVars?.light as Record<string, string>),
  }
  const darkVars: Record<string, string> = {
    ...(baseColor.cssVars?.dark as Record<string, string>),
    ...(theme.cssVars?.dark as Record<string, string>),
  }
  const themeVars: Record<string, string> = {}

  // Apply menu accent transformation.
  if (config.menuAccent === "bold") {
    lightVars.accent = lightVars.primary!
    lightVars["accent-foreground"] = lightVars["primary-foreground"]!
    darkVars.accent = darkVars.primary!
    darkVars["accent-foreground"] = darkVars["primary-foreground"]!
    lightVars["sidebar-accent"] = lightVars.primary!
    lightVars["sidebar-accent-foreground"] = lightVars["primary-foreground"]!
    darkVars["sidebar-accent"] = darkVars.primary!
    darkVars["sidebar-accent-foreground"] = darkVars["primary-foreground"]!
  }

  // Apply radius transformation.
  if (config.radius && config.radius !== "default") {
    const radius = RADII.find(r => r.name === config.radius)
    if (radius && radius.value) {
      lightVars.radius = radius.value
    }
  }

  return {
    name: `${config.baseColor}-${config.theme}`,
    type: "registry:theme" as const,
    cssVars: {
      theme: Object.keys(themeVars).length > 0 ? themeVars : undefined,
      light: lightVars,
      dark: darkVars,
    },
  }
}

// Builds a registry:base item from a design system config.
export function buildRegistryBase(
  config: DesignSystemConfig & { rtl?: boolean, pointer?: boolean },
) {
  const baseItem = getBase(config.base)
  const iconLibraryItem = getIconLibrary(config.iconLibrary)

  // Mirrors shadcn-ui: if a user picked the same font for heading and body,
  // collapse to "inherit" so we don't emit a redundant --font-heading var
  // that's just an alias of --font-sans.
  const normalizedFontHeading
    = config.fontHeading === config.font ? "inherit" : config.fontHeading

  if (!baseItem || !iconLibraryItem) {
    throw new Error(
      `Base "${config.base}" or icon library "${config.iconLibrary}" not found`,
    )
  }

  const registryTheme = buildRegistryTheme(config)

  // Build dependencies.
  const dependencies = [
    `shadcn-vue@${SHADCN_VERSION}`,
    "class-variance-authority",
    "tw-animate-css",
    ...(baseItem.dependencies ?? []),
    ...iconLibraryItem.packages,
  ]

  // Fonts are applied CLI-side via getFontImport(config.font) from the
  // local FONTS constant — shadcn-vue's registry does not publish font-*
  // items, so we intentionally do not add them as registryDependencies.
  const registryDependencies = ["utils"]

  // Resolve font metadata from the web registry so the emitted
  // registry:base item carries both the @theme CSS variable and a body rule
  // that actually applies the font — the CLI's addFontImportPlugin only
  // handles the Google Fonts @import url(...) line.
  const fontItem = fonts.find(f => f.name === `font-${config.font}`)
  const fontHeadingItem
    = normalizedFontHeading !== "inherit"
      ? fonts.find(f => f.name === `font-${normalizedFontHeading}`)
      : undefined

  const themeVars: Record<string, string> = {
    ...(registryTheme.cssVars?.theme as Record<string, string> | undefined),
  }
  const bodyRules: Record<string, Record<string, unknown>> = {
    "@apply bg-background text-foreground": {},
  }
  if (fontItem) {
    themeVars[fontItem.font.variable] = fontItem.font.family
    // Map the font's target variable to a Tailwind utility class.
    // shadcn-vue fonts all target --font-sans today (jetbrains-mono included),
    // but we handle --font-mono / --font-serif for future-proofing.
    const applyClass
      = fontItem.font.variable === "--font-mono"
        ? "font-mono"
        : fontItem.font.variable === "--font-serif"
          ? "font-serif"
          : "font-sans"
    bodyRules[`@apply ${applyClass}`] = {}
  }

  // Emit --font-heading so the Tailwind v4 `font-heading` utility is wired
  // up. When fontHeading is "inherit" (default) we alias it to the body
  // font's CSS variable; otherwise we resolve the heading font's family
  // from the web registry and emit it literally. The heading font's Google
  // Fonts @import is pulled in CLI-side by addFontImportPlugin (see
  // add-components.ts) via `config.fontHeading`.
  if (normalizedFontHeading === "inherit") {
    themeVars["--font-heading"] = `var(${fontItem?.font.variable ?? "--font-sans"})`
  }
  else if (fontHeadingItem) {
    themeVars["--font-heading"] = fontHeadingItem.font.family
  }

  return {
    name: `${config.base}-${config.style}`,
    extends: "none",
    type: "registry:base" as const,
    config: {
      style: `${config.base}-${config.style}`,
      iconLibrary: iconLibraryItem.name,
      font: config.font,
      // Only persist fontHeading when it's a real override, so projects
      // with the default ("inherit") don't gain a new components.json field.
      ...(normalizedFontHeading !== "inherit"
        && { fontHeading: normalizedFontHeading }),
      rtl: config.rtl ?? false,
      pointer: config.pointer ?? false,
      menuColor: config.menuColor,
      menuAccent: config.menuAccent,
      tailwind: {
        baseColor: config.baseColor,
      },
    },
    dependencies,
    registryDependencies,
    cssVars: {
      ...registryTheme.cssVars,
      theme: Object.keys(themeVars).length > 0 ? themeVars : undefined,
    },
    css: {
      "@import \"tw-animate-css\"": {},
      "@import \"shadcn-vue/tailwind.css\"": {},
      "@layer base": {
        "*": { "@apply border-border outline-ring/50": {} },
        "body": bodyRules,
        ...(config.pointer && {
          [POINTER_CURSOR_SELECTOR]: {
            cursor: "pointer",
          },
        }),
      },
    },
  }
}
