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
 * Extract the raw URL out of an `@import url('...')` statement.
 */
export function getFontImportUrl(value: string): string | undefined {
  return value.match(/url\(['"]?([^'"()]+)['"]?\)/)?.[1]
}

// Every URL the CLI is able to write, i.e. the exact `@import` targets of the
// font registry. An import in a project's CSS file that isn't one of these was
// written by someone else.
const MANAGED_FONT_IMPORT_URLS = FONTS.map(font =>
  getFontImportUrl(font.import),
).filter((url): url is string => !!url)

/**
 * Whether a Google Fonts `@import` (or its raw URL) is one the CLI writes
 * verbatim. Used to tell an import the CLI added on a previous run — safe to
 * replace when the font config changes — apart from one the user wrote, which
 * must be left alone even when it requests the same family. Anything the user
 * tweaked (different weights, axes, subsets, ...) no longer matches.
 */
export function isManagedFontImport(value: string): boolean {
  const url = getFontImportUrl(value) ?? value
  return MANAGED_FONT_IMPORT_URLS.includes(url)
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
