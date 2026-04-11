import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_PRESETS,
  promptForBase,
  resolveCreateUrl,
  resolveInitUrl,
} from '../../src/preset/presets'
import { SHADCN_VUE_URL } from '../../src/registry/constants'

describe('DEFAULT_PRESETS', () => {
  it('exports exactly 6 named presets', () => {
    expect(Object.keys(DEFAULT_PRESETS)).toHaveLength(6)
  })

  it('contains all expected preset names', () => {
    const names = Object.keys(DEFAULT_PRESETS)
    expect(names).toContain('vega')
    expect(names).toContain('nova')
    expect(names).toContain('maia')
    expect(names).toContain('lyra')
    expect(names).toContain('mira')
    expect(names).toContain('luma')
  })

  it('every preset specifies base as "reka"', () => {
    for (const preset of Object.values(DEFAULT_PRESETS)) {
      expect(preset.base).toBe('reka')
    }
  })

  it('every preset has rtl set to false by default', () => {
    for (const preset of Object.values(DEFAULT_PRESETS)) {
      expect(preset.rtl).toBe(false)
    }
  })

  it('every preset has all required design system fields', () => {
    for (const [name, preset] of Object.entries(DEFAULT_PRESETS)) {
      expect(preset.title, `${name} title`).toBeDefined()
      expect(preset.description, `${name} description`).toBeDefined()
      expect(preset.base, `${name} base`).toBeDefined()
      expect(preset.style, `${name} style`).toBeDefined()
      expect(preset.baseColor, `${name} baseColor`).toBeDefined()
      expect(preset.theme, `${name} theme`).toBeDefined()
      expect(preset.iconLibrary, `${name} iconLibrary`).toBeDefined()
      expect(preset.font, `${name} font`).toBeDefined()
      expect(preset.fontHeading, `${name} fontHeading`).toBeDefined()
      expect(preset.menuAccent, `${name} menuAccent`).toBeDefined()
      expect(preset.menuColor, `${name} menuColor`).toBeDefined()
      expect(preset.radius, `${name} radius`).toBeDefined()
    }
  })

  it('vega preset uses lucide and inter', () => {
    const vega = DEFAULT_PRESETS.vega
    expect(vega.iconLibrary).toBe('lucide')
    expect(vega.font).toBe('inter')
    expect(vega.style).toBe('vega')
  })

  it('nova preset uses lucide and geist-sans', () => {
    const nova = DEFAULT_PRESETS.nova
    expect(nova.iconLibrary).toBe('lucide')
    expect(nova.font).toBe('geist-sans')
    expect(nova.style).toBe('nova')
  })

  it('maia preset uses hugeicons and figtree', () => {
    const maia = DEFAULT_PRESETS.maia
    expect(maia.iconLibrary).toBe('hugeicons')
    expect(maia.font).toBe('figtree')
    expect(maia.style).toBe('maia')
  })

  it('lyra preset uses phosphor and jetbrains-mono', () => {
    const lyra = DEFAULT_PRESETS.lyra
    expect(lyra.iconLibrary).toBe('phosphor')
    expect(lyra.font).toBe('jetbrains-mono')
    expect(lyra.style).toBe('lyra')
  })

  it('mira preset uses hugeicons and inter', () => {
    const mira = DEFAULT_PRESETS.mira
    expect(mira.iconLibrary).toBe('hugeicons')
    expect(mira.font).toBe('inter')
    expect(mira.style).toBe('mira')
  })

  it('luma preset uses lucide and inter', () => {
    const luma = DEFAULT_PRESETS.luma
    expect(luma.iconLibrary).toBe('lucide')
    expect(luma.font).toBe('inter')
    expect(luma.style).toBe('luma')
  })

  it('every preset has menuAccent set to "subtle" or "bold"', () => {
    for (const preset of Object.values(DEFAULT_PRESETS)) {
      expect(['subtle', 'bold']).toContain(preset.menuAccent)
    }
  })

  it('every preset has menuColor set to "default" or "inverted"', () => {
    for (const preset of Object.values(DEFAULT_PRESETS)) {
      expect(['default', 'inverted']).toContain(preset.menuColor)
    }
  })
})

describe('resolveCreateUrl', () => {
  it('returns the /create URL with no params when called without arguments', () => {
    const url = resolveCreateUrl()
    expect(url).toBe(`${SHADCN_VUE_URL}/create`)
  })

  it('returns the /create URL with no params when called with empty object', () => {
    const url = resolveCreateUrl({})
    expect(url).toBe(`${SHADCN_VUE_URL}/create`)
  })

  it('includes the command param when provided', () => {
    const url = resolveCreateUrl({ command: 'init' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('command')).toBe('init')
  })

  it('includes the template param when provided', () => {
    const url = resolveCreateUrl({ template: 'nuxt' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('template')).toBe('nuxt')
  })

  it('includes the base param when provided', () => {
    const url = resolveCreateUrl({ base: 'reka' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('base')).toBe('reka')
  })

  it('adds rtl=true param when rtl is true', () => {
    const url = resolveCreateUrl({ rtl: true })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('rtl')).toBe('true')
  })

  it('does NOT add rtl param when rtl is false', () => {
    const url = resolveCreateUrl({ rtl: false })
    const parsed = new URL(url)
    expect(parsed.searchParams.has('rtl')).toBe(false)
  })

  it('does NOT add rtl param when rtl is undefined', () => {
    const url = resolveCreateUrl({ command: 'init' })
    const parsed = new URL(url)
    expect(parsed.searchParams.has('rtl')).toBe(false)
  })

  it('combines all params correctly', () => {
    const url = resolveCreateUrl({
      command: 'init',
      template: 'nuxt',
      rtl: true,
      base: 'reka',
    })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('command')).toBe('init')
    expect(parsed.searchParams.get('template')).toBe('nuxt')
    expect(parsed.searchParams.get('rtl')).toBe('true')
    expect(parsed.searchParams.get('base')).toBe('reka')
  })

  it('uses the SHADCN_VUE_URL base', () => {
    const url = resolveCreateUrl()
    expect(url.startsWith(SHADCN_VUE_URL)).toBe(true)
  })
})

describe('resolveInitUrl', () => {
  const basePreset = {
    base: 'reka',
    style: 'vega',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'lucide',
    font: 'inter',
    rtl: false,
    menuAccent: 'subtle',
    menuColor: 'default',
    radius: 'default',
  }

  it('builds a URL pointing to SHADCN_VUE_URL/init', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.pathname).toBe('/init')
    expect(url.startsWith(SHADCN_VUE_URL)).toBe(true)
  })

  it('includes all required preset params', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.searchParams.get('base')).toBe('reka')
    expect(parsed.searchParams.get('style')).toBe('vega')
    expect(parsed.searchParams.get('baseColor')).toBe('neutral')
    expect(parsed.searchParams.get('theme')).toBe('neutral')
    expect(parsed.searchParams.get('iconLibrary')).toBe('lucide')
    expect(parsed.searchParams.get('font')).toBe('inter')
    expect(parsed.searchParams.get('menuAccent')).toBe('subtle')
    expect(parsed.searchParams.get('menuColor')).toBe('default')
    expect(parsed.searchParams.get('radius')).toBe('default')
  })

  it('always includes track=1', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.searchParams.get('track')).toBe('1')
  })

  it('sets rtl=false when rtl is false', () => {
    const url = resolveInitUrl({ ...basePreset, rtl: false })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('rtl')).toBe('false')
  })

  it('sets rtl=true when rtl is true', () => {
    const url = resolveInitUrl({ ...basePreset, rtl: true })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('rtl')).toBe('true')
  })

  it('does NOT include fontHeading param when fontHeading is "inherit"', () => {
    const url = resolveInitUrl({ ...basePreset, fontHeading: 'inherit' })
    const parsed = new URL(url)
    expect(parsed.searchParams.has('fontHeading')).toBe(false)
  })

  it('does NOT include fontHeading param when fontHeading is omitted', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.searchParams.has('fontHeading')).toBe(false)
  })

  it('includes fontHeading param when fontHeading is a specific font', () => {
    const url = resolveInitUrl({ ...basePreset, fontHeading: 'geist-sans' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('fontHeading')).toBe('geist-sans')
  })

  it('includes preset param when options.preset is provided', () => {
    const url = resolveInitUrl(basePreset, { preset: 'a0' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('preset')).toBe('a0')
  })

  it('does NOT include preset param when options.preset is not provided', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.searchParams.has('preset')).toBe(false)
  })

  it('includes template param when options.template is provided', () => {
    const url = resolveInitUrl(basePreset, { template: 'nuxt' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('template')).toBe('nuxt')
  })

  it('does NOT include template param when options.template is not provided', () => {
    const url = resolveInitUrl(basePreset)
    const parsed = new URL(url)
    expect(parsed.searchParams.has('template')).toBe(false)
  })

  it('combines preset and template options correctly', () => {
    const url = resolveInitUrl(basePreset, { preset: 'a0', template: 'nuxt' })
    const parsed = new URL(url)
    expect(parsed.searchParams.get('preset')).toBe('a0')
    expect(parsed.searchParams.get('template')).toBe('nuxt')
  })

  it('produces different URLs for different styles', () => {
    const url1 = resolveInitUrl({ ...basePreset, style: 'vega' })
    const url2 = resolveInitUrl({ ...basePreset, style: 'nova' })
    expect(url1).not.toBe(url2)
  })
})

describe('promptForBase', () => {
  it('returns "reka" (single supported base)', async () => {
    const base = await promptForBase()
    expect(base).toBe('reka')
  })

  it('always resolves to "reka" regardless of call context', async () => {
    const results = await Promise.all([
      promptForBase(),
      promptForBase(),
      promptForBase(),
    ])
    for (const result of results) {
      expect(result).toBe('reka')
    }
  })
})

describe('SHADCN_VUE_URL from constants', () => {
  const originalEnv = process.env.SHADCN_VUE_URL

  afterEach(() => {
    // restore env
    if (originalEnv === undefined) {
      delete process.env.SHADCN_VUE_URL
    }
    else {
      process.env.SHADCN_VUE_URL = originalEnv
    }
  })

  it('resolveCreateUrl uses SHADCN_VUE_URL when it points to /create', () => {
    // SHADCN_VUE_URL is imported at module load time, so we verify
    // the constant used is the expected default value
    const url = resolveCreateUrl()
    expect(url).toContain('/create')
    expect(url.startsWith('https://shadcn-vue.com') || url.startsWith('http')).toBe(true)
  })

  it('resolveInitUrl uses SHADCN_VUE_URL when it points to /init', () => {
    const url = resolveInitUrl({
      base: 'reka',
      style: 'vega',
      baseColor: 'neutral',
      theme: 'neutral',
      iconLibrary: 'lucide',
      font: 'inter',
      rtl: false,
      menuAccent: 'subtle',
      menuColor: 'default',
      radius: 'default',
    })
    expect(url).toContain('/init')
  })
})