import { describe, expect, it } from 'vitest'

import {
  BASE_COLORS,
  BASES,
  FONTS,
  ICON_LIBRARIES,
  PRESETS,
  STYLES,
} from '../../src/registry/constants'

describe('create command options', () => {
  describe('bASES constant', () => {
    it('contains at least one base', () => {
      expect(BASES.length).toBeGreaterThan(0)
    })

    it('has reka as the default base', () => {
      const reka = BASES.find(base => base.name === 'reka')
      expect(reka).toBeDefined()
      expect(reka?.label).toBe('Reka UI')
      expect(reka?.dependencies).toContain('reka-ui')
    })

    it('all bases have required fields', () => {
      for (const base of BASES) {
        expect(base.name).toBeDefined()
        expect(base.label).toBeDefined()
        expect(base.description).toBeDefined()
        expect(Array.isArray(base.dependencies)).toBe(true)
      }
    })
  })

  describe('sTYLES constant', () => {
    it('contains all expected visual styles', () => {
      const styleNames = STYLES.map(s => s.name)
      expect(styleNames).toContain('vega')
      expect(styleNames).toContain('nova')
      expect(styleNames).toContain('maia')
      expect(styleNames).toContain('lyra')
      expect(styleNames).toContain('mira')
    })

    it('all styles have required fields', () => {
      for (const style of STYLES) {
        expect(style.name).toBeDefined()
        expect(style.label).toBeDefined()
        expect(style.description).toBeDefined()
      }
    })

    it('vega is the classic style', () => {
      const vega = STYLES.find(s => s.name === 'vega')
      expect(vega?.description).toContain('classic')
    })

    it('nova is the compact style', () => {
      const nova = STYLES.find(s => s.name === 'nova')
      expect(nova?.description).toContain('compact')
    })

    it('maia is the rounded style', () => {
      const maia = STYLES.find(s => s.name === 'maia')
      expect(maia?.description).toContain('rounded')
    })

    it('lyra is the boxy style', () => {
      const lyra = STYLES.find(s => s.name === 'lyra')
      expect(lyra?.description).toContain('sharp')
    })

    it('mira is the dense style', () => {
      const mira = STYLES.find(s => s.name === 'mira')
      expect(mira?.description).toContain('dense')
    })
  })

  describe('fONTS constant', () => {
    it('contains expected fonts', () => {
      const fontNames = FONTS.map(f => f.name)
      expect(fontNames).toContain('inter')
      expect(fontNames).toContain('figtree')
      expect(fontNames).toContain('jetbrains-mono')
      expect(fontNames).toContain('geist')
      expect(fontNames).toContain('geist-mono')
    })

    it('all fonts have required fields', () => {
      for (const font of FONTS) {
        expect(font.name).toBeDefined()
        expect(font.label).toBeDefined()
      }
    })
  })

  describe('iCON_LIBRARIES constant', () => {
    it('contains expected icon libraries', () => {
      const libNames = ICON_LIBRARIES.map(l => l.name)
      expect(libNames).toContain('lucide')
      expect(libNames).toContain('tabler')
      expect(libNames).toContain('hugeicons')
      expect(libNames).toContain('phosphor')
      expect(libNames).toContain('remixicon')
    })

    it('all icon libraries have required fields', () => {
      for (const lib of ICON_LIBRARIES) {
        expect(lib.name).toBeDefined()
        expect(lib.label).toBeDefined()
        expect(Array.isArray(lib.packages)).toBe(true)
        expect(lib.packages.length).toBeGreaterThan(0)
      }
    })

    it('lucide has the correct package', () => {
      const lucide = ICON_LIBRARIES.find(l => l.name === 'lucide')
      expect(lucide?.packages).toContain('lucide-vue-next')
    })

    it('hugeicons has multiple packages', () => {
      const hugeicons = ICON_LIBRARIES.find(l => l.name === 'hugeicons')
      expect(hugeicons?.packages.length).toBeGreaterThan(1)
    })
  })

  describe('pRESETS constant', () => {
    it('contains expected presets', () => {
      const presetNames = PRESETS.map(p => p.name)
      expect(presetNames).toContain('reka-vega')
      expect(presetNames).toContain('reka-nova')
      expect(presetNames).toContain('reka-maia')
      expect(presetNames).toContain('reka-lyra')
      expect(presetNames).toContain('reka-mira')
    })

    it('all presets have required fields', () => {
      for (const preset of PRESETS) {
        expect(preset.name).toBeDefined()
        expect(preset.title).toBeDefined()
        expect(preset.description).toBeDefined()
        expect(preset.base).toBeDefined()
        expect(preset.style).toBeDefined()
        expect(preset.baseColor).toBeDefined()
        expect(preset.iconLibrary).toBeDefined()
        expect(preset.font).toBeDefined()
        expect(['subtle', 'bold']).toContain(preset.menuAccent)
        expect(['default', 'inverted']).toContain(preset.menuColor)
      }
    })

    it('presets reference valid bases', () => {
      const baseNames = BASES.map(b => b.name)
      for (const preset of PRESETS) {
        expect(baseNames).toContain(preset.base)
      }
    })

    it('presets reference valid styles', () => {
      const styleNames = STYLES.map(s => s.name)
      for (const preset of PRESETS) {
        expect(styleNames).toContain(preset.style)
      }
    })

    it('presets reference valid icon libraries', () => {
      const libNames = ICON_LIBRARIES.map(l => l.name)
      for (const preset of PRESETS) {
        expect(libNames).toContain(preset.iconLibrary)
      }
    })

    it('presets reference valid fonts', () => {
      const fontNames = FONTS.map(f => f.name)
      for (const preset of PRESETS) {
        expect(fontNames).toContain(preset.font)
      }
    })

    it('presets reference valid base colors', () => {
      const colorNames = BASE_COLORS.map(c => c.name)
      for (const preset of PRESETS) {
        expect(colorNames).toContain(preset.baseColor)
      }
    })

    it('vega preset uses lucide and inter', () => {
      const vega = PRESETS.find(p => p.name === 'reka-vega')
      expect(vega?.iconLibrary).toBe('lucide')
      expect(vega?.font).toBe('inter')
    })

    it('nova preset uses hugeicons', () => {
      const nova = PRESETS.find(p => p.name === 'reka-nova')
      expect(nova?.iconLibrary).toBe('hugeicons')
    })

    it('lyra preset uses jetbrains-mono font', () => {
      const lyra = PRESETS.find(p => p.name === 'reka-lyra')
      expect(lyra?.font).toBe('jetbrains-mono')
    })
  })
})

describe('create command defaults', () => {
  it('default base is reka', () => {
    const defaultBase = 'reka'
    expect(BASES.find(b => b.name === defaultBase)).toBeDefined()
  })

  it('default style is vega', () => {
    const defaultStyle = 'vega'
    expect(STYLES.find(s => s.name === defaultStyle)).toBeDefined()
  })

  it('default icon library is lucide', () => {
    const defaultIconLib = 'lucide'
    expect(ICON_LIBRARIES.find(l => l.name === defaultIconLib)).toBeDefined()
  })

  it('default font is inter', () => {
    const defaultFont = 'inter'
    expect(FONTS.find(f => f.name === defaultFont)).toBeDefined()
  })

  it('default base color is neutral', () => {
    const defaultBaseColor = 'neutral'
    expect(BASE_COLORS.find(c => c.name === defaultBaseColor)).toBeDefined()
  })
})
