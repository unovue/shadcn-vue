import { describe, expect, it } from 'vitest'
import {
  decodePreset,
  DEFAULT_PRESET_CONFIG,
  encodePreset,
  fromBase62,
  generateRandomConfig,
  generateRandomPreset,
  isPresetCode,
  isValidPreset,
  PRESET_BASE_COLORS,
  PRESET_BASES,
  PRESET_CHART_COLORS,
  PRESET_FONT_HEADINGS,
  PRESET_FONTS,
  PRESET_ICON_LIBRARIES,
  PRESET_MENU_ACCENTS,
  PRESET_MENU_COLORS,
  PRESET_RADII,
  PRESET_STYLES,
  PRESET_THEMES,
  toBase62,
} from '../../src/preset/preset'

describe('toBase62', () => {
  it('converts 0 to "0"', () => {
    expect(toBase62(0)).toBe('0')
  })

  it('converts single digit values', () => {
    expect(toBase62(1)).toBe('1')
    expect(toBase62(9)).toBe('9')
    expect(toBase62(10)).toBe('A')
    expect(toBase62(35)).toBe('Z')
    expect(toBase62(36)).toBe('a')
    expect(toBase62(61)).toBe('z')
  })

  it('converts 62 to "10" (base62 two-digit)', () => {
    expect(toBase62(62)).toBe('10')
  })

  it('converts larger numbers', () => {
    expect(toBase62(62 * 62)).toBe('100')
    expect(toBase62(62 * 62 + 62 + 1)).toBe('111')
  })

  it('roundtrips with fromBase62', () => {
    const nums = [0, 1, 61, 62, 100, 3844, 99999, 1234567]
    for (const n of nums) {
      expect(fromBase62(toBase62(n))).toBe(n)
    }
  })
})

describe('fromBase62', () => {
  it('converts "0" to 0', () => {
    expect(fromBase62('0')).toBe(0)
  })

  it('converts single character codes', () => {
    expect(fromBase62('A')).toBe(10)
    expect(fromBase62('Z')).toBe(35)
    expect(fromBase62('a')).toBe(36)
    expect(fromBase62('z')).toBe(61)
  })

  it('converts multi-character codes', () => {
    expect(fromBase62('10')).toBe(62)
    expect(fromBase62('100')).toBe(62 * 62)
  })

  it('returns -1 for a string containing an invalid character', () => {
    expect(fromBase62('!')).toBe(-1)
    expect(fromBase62('a!')).toBe(-1)
    expect(fromBase62(' ')).toBe(-1)
    expect(fromBase62('-')).toBe(-1)
  })

  it('returns 0 for empty string', () => {
    expect(fromBase62('')).toBe(0)
  })
})

describe('DEFAULT_PRESET_CONFIG', () => {
  it('has all required fields', () => {
    expect(DEFAULT_PRESET_CONFIG.base).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.style).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.baseColor).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.theme).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.chartColor).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.iconLibrary).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.font).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.fontHeading).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.radius).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.menuAccent).toBeDefined()
    expect(DEFAULT_PRESET_CONFIG.menuColor).toBeDefined()
  })

  it('uses first value from each value array as default', () => {
    expect(DEFAULT_PRESET_CONFIG.menuColor).toBe(PRESET_MENU_COLORS[0])
    expect(DEFAULT_PRESET_CONFIG.menuAccent).toBe(PRESET_MENU_ACCENTS[0])
    expect(DEFAULT_PRESET_CONFIG.radius).toBe(PRESET_RADII[0])
    expect(DEFAULT_PRESET_CONFIG.font).toBe(PRESET_FONTS[0])
    expect(DEFAULT_PRESET_CONFIG.fontHeading).toBe(PRESET_FONT_HEADINGS[0])
    expect(DEFAULT_PRESET_CONFIG.iconLibrary).toBe(PRESET_ICON_LIBRARIES[0])
    expect(DEFAULT_PRESET_CONFIG.theme).toBe(PRESET_THEMES[0])
    expect(DEFAULT_PRESET_CONFIG.baseColor).toBe(PRESET_BASE_COLORS[0])
    expect(DEFAULT_PRESET_CONFIG.style).toBe(PRESET_STYLES[0])
    expect(DEFAULT_PRESET_CONFIG.base).toBe(PRESET_BASES[0])
  })

  it('default font is "inter"', () => {
    expect(DEFAULT_PRESET_CONFIG.font).toBe('inter')
  })

  it('default fontHeading is "inherit"', () => {
    expect(DEFAULT_PRESET_CONFIG.fontHeading).toBe('inherit')
  })

  it('default base is "reka"', () => {
    expect(DEFAULT_PRESET_CONFIG.base).toBe('reka')
  })
})

describe('encodePreset', () => {
  it('encodes the default config to a code starting with version "a"', () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(code).toMatch(/^a/)
  })

  it('encodes a partial config using defaults for missing fields', () => {
    const code = encodePreset({ style: 'nova' })
    const decoded = decodePreset(code)
    expect(decoded?.style).toBe('nova')
    // other fields should be defaults
    expect(decoded?.font).toBe(DEFAULT_PRESET_CONFIG.font)
    expect(decoded?.base).toBe(DEFAULT_PRESET_CONFIG.base)
  })

  it('produces the same code for the same config', () => {
    const code1 = encodePreset(DEFAULT_PRESET_CONFIG)
    const code2 = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(code1).toBe(code2)
  })

  it('produces different codes for different configs', () => {
    const code1 = encodePreset({ style: 'vega' })
    const code2 = encodePreset({ style: 'nova' })
    expect(code1).not.toBe(code2)
  })

  it('encodes all styles distinctly', () => {
    const codes = PRESET_STYLES.map(style => encodePreset({ style }))
    const unique = new Set(codes)
    expect(unique.size).toBe(PRESET_STYLES.length)
  })

  it('encodes all themes distinctly', () => {
    const codes = PRESET_THEMES.map(theme => encodePreset({ theme }))
    const unique = new Set(codes)
    expect(unique.size).toBe(PRESET_THEMES.length)
  })

  it('encodes all icon libraries distinctly', () => {
    const codes = PRESET_ICON_LIBRARIES.map(iconLibrary =>
      encodePreset({ iconLibrary }),
    )
    const unique = new Set(codes)
    expect(unique.size).toBe(PRESET_ICON_LIBRARIES.length)
  })

  it('encodes all fonts distinctly', () => {
    const codes = PRESET_FONTS.map(font => encodePreset({ font }))
    const unique = new Set(codes)
    expect(unique.size).toBe(PRESET_FONTS.length)
  })

  it('encodes all radii distinctly', () => {
    const codes = PRESET_RADII.map(radius => encodePreset({ radius }))
    const unique = new Set(codes)
    expect(unique.size).toBe(PRESET_RADII.length)
  })

  it('returns a code with length >= 2', () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(code.length).toBeGreaterThanOrEqual(2)
  })

  it('gracefully uses default for unknown style value', () => {
    // @ts-expect-error — testing runtime behavior with invalid value
    const code = encodePreset({ style: 'nonexistent' })
    const decoded = decodePreset(code)
    expect(decoded?.style).toBe(DEFAULT_PRESET_CONFIG.style)
  })
})

describe('decodePreset', () => {
  it('returns null for empty string', () => {
    expect(decodePreset('')).toBeNull()
  })

  it('returns null for a single character', () => {
    expect(decodePreset('a')).toBeNull()
  })

  it('returns null for an invalid version character', () => {
    expect(decodePreset('z0')).toBeNull()
    expect(decodePreset('b0')).toBeNull()
    expect(decodePreset('10')).toBeNull()
  })

  it('returns null when base62 part contains invalid characters', () => {
    expect(decodePreset('a!')).toBeNull()
    expect(decodePreset('a ')).toBeNull()
  })

  it('decodes a freshly encoded default config back to the default', () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    const decoded = decodePreset(code)
    expect(decoded).not.toBeNull()
    expect(decoded?.style).toBe(DEFAULT_PRESET_CONFIG.style)
    expect(decoded?.baseColor).toBe(DEFAULT_PRESET_CONFIG.baseColor)
    expect(decoded?.theme).toBe(DEFAULT_PRESET_CONFIG.theme)
    expect(decoded?.font).toBe(DEFAULT_PRESET_CONFIG.font)
    expect(decoded?.fontHeading).toBe(DEFAULT_PRESET_CONFIG.fontHeading)
    expect(decoded?.radius).toBe(DEFAULT_PRESET_CONFIG.radius)
    expect(decoded?.iconLibrary).toBe(DEFAULT_PRESET_CONFIG.iconLibrary)
    expect(decoded?.menuColor).toBe(DEFAULT_PRESET_CONFIG.menuColor)
    expect(decoded?.menuAccent).toBe(DEFAULT_PRESET_CONFIG.menuAccent)
    expect(decoded?.base).toBe(DEFAULT_PRESET_CONFIG.base)
    expect(decoded?.chartColor).toBe(DEFAULT_PRESET_CONFIG.chartColor)
  })

  it('roundtrips any fully specified config', () => {
    const config = {
      base: 'reka' as const,
      style: 'lyra' as const,
      baseColor: 'zinc' as const,
      theme: 'blue' as const,
      chartColor: 'emerald' as const,
      iconLibrary: 'phosphor' as const,
      font: 'jetbrains-mono' as const,
      fontHeading: 'figtree' as const,
      radius: 'large' as const,
      menuAccent: 'bold' as const,
      menuColor: 'inverted' as const,
    }
    const decoded = decodePreset(encodePreset(config))
    expect(decoded).toMatchObject(config)
  })

  it('roundtrips each style correctly', () => {
    for (const style of PRESET_STYLES) {
      const decoded = decodePreset(encodePreset({ style }))
      expect(decoded?.style).toBe(style)
    }
  })

  it('roundtrips each font correctly', () => {
    for (const font of PRESET_FONTS) {
      const decoded = decodePreset(encodePreset({ font }))
      expect(decoded?.font).toBe(font)
    }
  })

  it('roundtrips each menuColor correctly', () => {
    for (const menuColor of PRESET_MENU_COLORS) {
      const decoded = decodePreset(encodePreset({ menuColor }))
      expect(decoded?.menuColor).toBe(menuColor)
    }
  })

  it('roundtrips each radius correctly', () => {
    for (const radius of PRESET_RADII) {
      const decoded = decodePreset(encodePreset({ radius }))
      expect(decoded?.radius).toBe(radius)
    }
  })

  it('roundtrips each baseColor correctly', () => {
    for (const baseColor of PRESET_BASE_COLORS) {
      const decoded = decodePreset(encodePreset({ baseColor }))
      expect(decoded?.baseColor).toBe(baseColor)
    }
  })

  it('decodes "a0" as a valid code with all fields at their defaults', () => {
    const decoded = decodePreset('a0')
    expect(decoded).not.toBeNull()
    expect(decoded?.menuColor).toBe(PRESET_MENU_COLORS[0])
    expect(decoded?.menuAccent).toBe(PRESET_MENU_ACCENTS[0])
  })
})

describe('isPresetCode', () => {
  it('returns false for empty string', () => {
    expect(isPresetCode('')).toBe(false)
  })

  it('returns false for a single character', () => {
    expect(isPresetCode('a')).toBe(false)
  })

  it('returns false when length > 10', () => {
    // 11 chars starting with valid version
    expect(isPresetCode('a12345678901')).toBe(false)
  })

  it('returns false for invalid version prefix', () => {
    expect(isPresetCode('z0')).toBe(false)
    expect(isPresetCode('b00')).toBe(false)
    expect(isPresetCode('!a0')).toBe(false)
  })

  it('returns false when body contains non-base62 characters', () => {
    expect(isPresetCode('a!')).toBe(false)
    expect(isPresetCode('a ')).toBe(false)
    expect(isPresetCode('a-')).toBe(false)
  })

  it('returns true for the smallest valid code "a0"', () => {
    expect(isPresetCode('a0')).toBe(true)
  })

  it('returns true for a freshly encoded default preset', () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(isPresetCode(code)).toBe(true)
  })

  it('returns true for all encoded presets', () => {
    const configs = PRESET_STYLES.map(style => encodePreset({ style }))
    for (const code of configs) {
      expect(isPresetCode(code)).toBe(true)
    }
  })

  it('returns false for plain preset names like "vega"', () => {
    expect(isPresetCode('vega')).toBe(false)
  })

  it('returns false for URLs', () => {
    expect(isPresetCode('https://example.com/preset')).toBe(false)
  })

  it('accepts codes up to 10 characters', () => {
    // construct exactly 10 chars: 'a' + 9 base62 chars
    const code = 'a' + '0'.repeat(9)
    expect(isPresetCode(code)).toBe(true)
  })
})

describe('isValidPreset', () => {
  it('returns true for a valid preset code', () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(isValidPreset(code)).toBe(true)
  })

  it('returns false for an empty string', () => {
    expect(isValidPreset('')).toBe(false)
  })

  it('returns false for an invalid version prefix', () => {
    expect(isValidPreset('z0')).toBe(false)
  })

  it('returns false for a single character', () => {
    expect(isValidPreset('a')).toBe(false)
  })

  it('returns true for "a0" (all defaults)', () => {
    expect(isValidPreset('a0')).toBe(true)
  })
})

describe('generateRandomConfig', () => {
  it('returns a config with all required fields', () => {
    const config = generateRandomConfig()
    expect(config.base).toBeDefined()
    expect(config.style).toBeDefined()
    expect(config.baseColor).toBeDefined()
    expect(config.theme).toBeDefined()
    expect(config.chartColor).toBeDefined()
    expect(config.iconLibrary).toBeDefined()
    expect(config.font).toBeDefined()
    expect(config.fontHeading).toBeDefined()
    expect(config.radius).toBeDefined()
    expect(config.menuAccent).toBeDefined()
    expect(config.menuColor).toBeDefined()
  })

  it('returns values within the known value arrays', () => {
    const config = generateRandomConfig()
    expect(PRESET_BASES).toContain(config.base)
    expect(PRESET_STYLES).toContain(config.style)
    expect(PRESET_BASE_COLORS).toContain(config.baseColor)
    expect(PRESET_THEMES).toContain(config.theme)
    expect(PRESET_CHART_COLORS).toContain(config.chartColor)
    expect(PRESET_ICON_LIBRARIES).toContain(config.iconLibrary)
    expect(PRESET_FONTS).toContain(config.font)
    expect(PRESET_FONT_HEADINGS).toContain(config.fontHeading)
    expect(PRESET_RADII).toContain(config.radius)
    expect(PRESET_MENU_ACCENTS).toContain(config.menuAccent)
    expect(PRESET_MENU_COLORS).toContain(config.menuColor)
  })

  it('can be encoded and decoded', () => {
    const config = generateRandomConfig()
    const decoded = decodePreset(encodePreset(config))
    expect(decoded).not.toBeNull()
    expect(decoded?.style).toBe(config.style)
    expect(decoded?.font).toBe(config.font)
  })
})

describe('generateRandomPreset', () => {
  it('returns a string that passes isPresetCode', () => {
    const code = generateRandomPreset()
    expect(isPresetCode(code)).toBe(true)
  })

  it('returns a decodable code', () => {
    const code = generateRandomPreset()
    const decoded = decodePreset(code)
    expect(decoded).not.toBeNull()
  })

  it('does not always return the same value (randomness check)', () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateRandomPreset()))
    // With 20 samples from many combinations, we expect multiple distinct values
    expect(codes.size).toBeGreaterThan(1)
  })
})

describe('preset value arrays', () => {
  it('PRESET_STYLES contains expected styles', () => {
    expect(PRESET_STYLES).toContain('vega')
    expect(PRESET_STYLES).toContain('nova')
    expect(PRESET_STYLES).toContain('maia')
    expect(PRESET_STYLES).toContain('lyra')
    expect(PRESET_STYLES).toContain('mira')
    expect(PRESET_STYLES).toContain('luma')
  })

  it('PRESET_BASE_COLORS contains expected colors', () => {
    expect(PRESET_BASE_COLORS).toContain('neutral')
    expect(PRESET_BASE_COLORS).toContain('stone')
    expect(PRESET_BASE_COLORS).toContain('zinc')
    expect(PRESET_BASE_COLORS).toContain('mauve')
    expect(PRESET_BASE_COLORS).toContain('olive')
    expect(PRESET_BASE_COLORS).toContain('mist')
    expect(PRESET_BASE_COLORS).toContain('taupe')
  })

  it('PRESET_FONTS contains all expected fonts', () => {
    expect(PRESET_FONTS).toContain('inter')
    expect(PRESET_FONTS).toContain('geist-sans')
    expect(PRESET_FONTS).toContain('noto-sans')
    expect(PRESET_FONTS).toContain('nunito-sans')
    expect(PRESET_FONTS).toContain('figtree')
    expect(PRESET_FONTS).toContain('roboto')
    expect(PRESET_FONTS).toContain('raleway')
    expect(PRESET_FONTS).toContain('dm-sans')
    expect(PRESET_FONTS).toContain('public-sans')
    expect(PRESET_FONTS).toContain('outfit')
    expect(PRESET_FONTS).toContain('jetbrains-mono')
  })

  it('PRESET_FONT_HEADINGS starts with "inherit" and includes all fonts', () => {
    expect(PRESET_FONT_HEADINGS[0]).toBe('inherit')
    for (const font of PRESET_FONTS) {
      expect(PRESET_FONT_HEADINGS).toContain(font)
    }
  })

  it('PRESET_MENU_COLORS contains all expected values', () => {
    expect(PRESET_MENU_COLORS).toContain('default')
    expect(PRESET_MENU_COLORS).toContain('inverted')
    expect(PRESET_MENU_COLORS).toContain('default-translucent')
    expect(PRESET_MENU_COLORS).toContain('inverted-translucent')
  })

  it('PRESET_MENU_ACCENTS contains "subtle" and "bold"', () => {
    expect(PRESET_MENU_ACCENTS).toContain('subtle')
    expect(PRESET_MENU_ACCENTS).toContain('bold')
  })

  it('PRESET_RADII contains expected values', () => {
    expect(PRESET_RADII).toContain('default')
    expect(PRESET_RADII).toContain('none')
    expect(PRESET_RADII).toContain('small')
    expect(PRESET_RADII).toContain('medium')
    expect(PRESET_RADII).toContain('large')
  })

  it('PRESET_ICON_LIBRARIES contains expected libraries', () => {
    expect(PRESET_ICON_LIBRARIES).toContain('lucide')
    expect(PRESET_ICON_LIBRARIES).toContain('tabler')
    expect(PRESET_ICON_LIBRARIES).toContain('hugeicons')
    expect(PRESET_ICON_LIBRARIES).toContain('phosphor')
    expect(PRESET_ICON_LIBRARIES).toContain('remixicon')
  })

  it('PRESET_CHART_COLORS is the same reference as PRESET_THEMES', () => {
    expect(PRESET_CHART_COLORS).toBe(PRESET_THEMES)
  })
})