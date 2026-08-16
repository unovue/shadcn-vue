import { FONTS } from '@/src/registry/constants'

export type FontConfig = (typeof FONTS)[number]

/**
 * Sentinel value for `font` / `fontHeading` in `components.json` that opts the
 * project out of CLI-managed fonts: no Google Fonts `@import` is written to the
 * CSS file and no `--font-heading` theme var is synthesized. For projects that
 * handle fonts themselves (`@nuxt/fonts`, `unplugin-fonts`, self-hosted files).
 */
export const FONT_NONE = 'none'

/**
 * Whether font management is disabled for the given config value — either
 * unset or explicitly set to `none`.
 */
export function isFontDisabled(name: string | undefined): boolean {
  return !name || name === FONT_NONE
}

/**
 * Get font configuration by name.
 */
export function getFont(name: string): FontConfig | undefined {
  return FONTS.find(font => font.name === name)
}

/**
 * Get font CSS import statement.
 */
export function getFontImport(name: string): string {
  const font = getFont(name)
  return font?.import ?? ''
}

/**
 * Extract the `family=` values of a Google Fonts URL, normalized back to the
 * family name (`Noto+Sans:wght@400` -> `Noto Sans`). One URL can request
 * several families.
 */
function getFontImportFamilies(value: string): string[] {
  const families: string[] = []
  const regex = /[?&]family=([^&:'")]+)/g
  let match = regex.exec(value)
  while (match) {
    families.push(decodeURIComponent(match[1]!.replace(/\+/g, ' ')))
    match = regex.exec(value)
  }
  return families
}

/**
 * Whether a Google Fonts `@import` (or its raw URL) refers only to fonts the
 * CLI itself knows how to write. Used to tell an import the CLI added on a
 * previous run — safe to replace when the font config changes — apart from one
 * the user hand-wrote, which must be left alone.
 */
export function isManagedFontImport(value: string): boolean {
  const families = getFontImportFamilies(value)
  if (families.length === 0) {
    return false
  }
  return families.every(family =>
    FONTS.some(font => font.family === family),
  )
}

/**
 * Get font family CSS value.
 */
export function getFontFamily(name: string): string {
  const font = getFont(name)
  if (!font)
    return ''

  // Return font family with fallbacks
  if (font.variable === '--font-mono') {
    return `"${font.family}", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  }
  return `"${font.family}", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
}

/**
 * Get CSS variable name for the font.
 */
export function getFontVariable(name: string): string {
  const font = getFont(name)
  return font?.variable ?? '--font-sans'
}

/**
 * Generate CSS for font configuration.
 * This includes the import and the CSS variable definition.
 */
export function generateFontCss(fontName: string): {
  import: string
  variables: Record<string, string>
} {
  const font = getFont(fontName)

  if (!font) {
    return {
      import: '',
      variables: {},
    }
  }

  return {
    import: font.import,
    variables: {
      [font.variable]: getFontFamily(fontName),
    },
  }
}
