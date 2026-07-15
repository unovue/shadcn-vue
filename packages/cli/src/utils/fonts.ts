import { FONTS } from '@/src/registry/constants'

export type FontConfig = (typeof FONTS)[number]

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
