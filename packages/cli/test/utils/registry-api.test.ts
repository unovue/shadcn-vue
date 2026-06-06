import { describe, expect, it } from 'vitest'
import {
  getRegistryBase,
  getRegistryBases,
  getRegistryFont,
  getRegistryFonts,
  getRegistryIconLibraries,
  getRegistryIconLibrary,
  getRegistryPreset,
  getRegistryPresets,
  getRegistryVisualStyle,
  getRegistryVisualStyles,
} from '../../src/registry/api'

describe('registry API', () => {
  describe('getRegistryBases', () => {
    it('returns all bases', () => {
      const bases = getRegistryBases()
      expect(bases).toBeDefined()
      expect(Array.isArray(bases)).toBe(true)
      expect(bases.length).toBeGreaterThan(0)
    })

    it('includes reka base', () => {
      const bases = getRegistryBases()
      const reka = bases.find(b => b.name === 'reka')
      expect(reka).toBeDefined()
      expect(reka?.label).toBe('Reka UI')
    })
  })

  describe('getRegistryBase', () => {
    it('returns reka base by name', () => {
      const reka = getRegistryBase('reka')
      expect(reka).toBeDefined()
      expect(reka?.name).toBe('reka')
      expect(reka?.label).toBe('Reka UI')
      expect(reka?.dependencies).toContain('reka-ui')
    })

    it('returns undefined for unknown base', () => {
      const unknown = getRegistryBase('unknown-base')
      expect(unknown).toBeUndefined()
    })
  })

  describe('getRegistryVisualStyles', () => {
    it('returns all visual styles', () => {
      const styles = getRegistryVisualStyles()
      expect(styles).toBeDefined()
      expect(Array.isArray(styles)).toBe(true)
      expect(styles.length).toBeGreaterThan(0)
    })

    it('includes all seven styles', () => {
      const styles = getRegistryVisualStyles()
      const styleNames = styles.map(s => s.name)
      expect(styleNames).toContain('vega')
      expect(styleNames).toContain('nova')
      expect(styleNames).toContain('maia')
      expect(styleNames).toContain('lyra')
      expect(styleNames).toContain('mira')
      expect(styleNames).toContain('luma')
      expect(styleNames).toContain('sera')
    })
  })

  describe('getRegistryVisualStyle', () => {
    it('returns vega style by name', () => {
      const vega = getRegistryVisualStyle('vega')
      expect(vega).toBeDefined()
      expect(vega?.name).toBe('vega')
      expect(vega?.label).toBe('Vega')
    })

    it('returns nova style by name', () => {
      const nova = getRegistryVisualStyle('nova')
      expect(nova).toBeDefined()
      expect(nova?.name).toBe('nova')
      expect(nova?.description).toContain('compact')
    })

    it('returns luma style by name', () => {
      const luma = getRegistryVisualStyle('luma')
      expect(luma).toBeDefined()
      expect(luma?.name).toBe('luma')
      expect(luma?.label).toBe('Luma')
    })

    it('returns sera style by name', () => {
      const sera = getRegistryVisualStyle('sera')
      expect(sera).toBeDefined()
      expect(sera?.name).toBe('sera')
      expect(sera?.label).toBe('Sera')
    })

    it('returns undefined for unknown style', () => {
      const unknown = getRegistryVisualStyle('unknown-style')
      expect(unknown).toBeUndefined()
    })
  })

  describe('getRegistryIconLibraries', () => {
    it('returns all icon libraries', () => {
      const libs = getRegistryIconLibraries()
      expect(libs).toBeDefined()
      expect(Array.isArray(libs)).toBe(true)
      expect(libs.length).toBeGreaterThan(0)
    })

    it('includes expected libraries', () => {
      const libs = getRegistryIconLibraries()
      const libNames = libs.map(l => l.name)
      expect(libNames).toContain('lucide')
      expect(libNames).toContain('tabler')
      expect(libNames).toContain('hugeicons')
    })
  })

  describe('getRegistryIconLibrary', () => {
    it('returns lucide library by name', () => {
      const lucide = getRegistryIconLibrary('lucide')
      expect(lucide).toBeDefined()
      expect(lucide?.name).toBe('lucide')
      expect(lucide?.packages).toContain('@lucide/vue')
    })

    it('returns tabler library by name', () => {
      const tabler = getRegistryIconLibrary('tabler')
      expect(tabler).toBeDefined()
      expect(tabler?.name).toBe('tabler')
      expect(tabler?.packages).toContain('@tabler/icons-vue')
    })

    it('returns undefined for unknown library', () => {
      const unknown = getRegistryIconLibrary('unknown-lib')
      expect(unknown).toBeUndefined()
    })
  })

  describe('getRegistryFonts', () => {
    it('returns all fonts', () => {
      const fonts = getRegistryFonts()
      expect(fonts).toBeDefined()
      expect(Array.isArray(fonts)).toBe(true)
      expect(fonts.length).toBeGreaterThan(0)
    })

    it('includes expected fonts', () => {
      const fonts = getRegistryFonts()
      const fontNames = fonts.map(f => f.name)
      expect(fontNames).toContain('inter')
      expect(fontNames).toContain('figtree')
      expect(fontNames).toContain('jetbrains-mono')
    })
  })

  describe('getRegistryFont', () => {
    it('returns inter font by name', () => {
      const inter = getRegistryFont('inter')
      expect(inter).toBeDefined()
      expect(inter?.name).toBe('inter')
      expect(inter?.label).toBe('Inter')
    })

    it('returns jetbrains-mono font by name', () => {
      const jbMono = getRegistryFont('jetbrains-mono')
      expect(jbMono).toBeDefined()
      expect(jbMono?.name).toBe('jetbrains-mono')
    })

    it('returns undefined for unknown font', () => {
      const unknown = getRegistryFont('unknown-font')
      expect(unknown).toBeUndefined()
    })
  })

  describe('getRegistryPresets', () => {
    it('returns all presets', () => {
      const presets = getRegistryPresets()
      expect(presets).toBeDefined()
      expect(Array.isArray(presets)).toBe(true)
      expect(presets.length).toBeGreaterThan(0)
    })

    it('includes all expected presets', () => {
      const presets = getRegistryPresets()
      const presetNames = presets.map(p => p.name)
      expect(presetNames).toContain('vega')
      expect(presetNames).toContain('nova')
      expect(presetNames).toContain('maia')
      expect(presetNames).toContain('lyra')
      expect(presetNames).toContain('mira')
      expect(presetNames).toContain('luma')
      expect(presetNames).toContain('sera')
    })

    it('all presets have complete configuration', () => {
      const presets = getRegistryPresets()
      for (const preset of presets) {
        expect(preset.name).toBeDefined()
        expect(preset.title).toBeDefined()
        expect(preset.description).toBeDefined()
        expect(preset.base).toBeDefined()
        expect(preset.style).toBeDefined()
        expect(preset.baseColor).toBeDefined()
        expect(preset.iconLibrary).toBeDefined()
        expect(preset.font).toBeDefined()
        expect(preset.menuAccent).toBeDefined()
        expect(preset.menuColor).toBeDefined()
      }
    })
  })

  describe('getRegistryPreset', () => {
    it('returns vega preset by name', () => {
      const vega = getRegistryPreset('vega')
      expect(vega).toBeDefined()
      expect(vega?.name).toBe('vega')
      expect(vega?.base).toBe('reka')
      expect(vega?.style).toBe('vega')
      expect(vega?.iconLibrary).toBe('lucide')
      expect(vega?.font).toBe('inter')
    })

    it('returns nova preset by name', () => {
      const nova = getRegistryPreset('nova')
      expect(nova).toBeDefined()
      expect(nova?.name).toBe('nova')
      expect(nova?.style).toBe('nova')
      expect(nova?.iconLibrary).toBe('lucide')
    })

    it('returns lyra preset by name', () => {
      const lyra = getRegistryPreset('lyra')
      expect(lyra).toBeDefined()
      expect(lyra?.name).toBe('lyra')
      expect(lyra?.style).toBe('lyra')
      expect(lyra?.font).toBe('jetbrains-mono')
    })

    it('returns mira preset by name', () => {
      const mira = getRegistryPreset('mira')
      expect(mira).toBeDefined()
      expect(mira?.name).toBe('mira')
      expect(mira?.style).toBe('mira')
    })

    it('returns luma preset by name', () => {
      const luma = getRegistryPreset('luma')
      expect(luma).toBeDefined()
      expect(luma?.name).toBe('luma')
      expect(luma?.style).toBe('luma')
      expect(luma?.iconLibrary).toBe('lucide')
      expect(luma?.font).toBe('inter')
    })

    it('returns sera preset by name', () => {
      const sera = getRegistryPreset('sera')
      expect(sera).toBeDefined()
      expect(sera?.name).toBe('sera')
      expect(sera?.style).toBe('sera')
      expect(sera?.iconLibrary).toBe('lucide')
      expect(sera?.font).toBe('noto-sans')
      expect(sera?.fontHeading).toBe('playfair-display')
      expect(sera?.baseColor).toBe('taupe')
    })

    it('returns undefined for unknown preset', () => {
      const unknown = getRegistryPreset('unknown-preset')
      expect(unknown).toBeUndefined()
    })
  })

  describe('preset consistency', () => {
    it('all presets reference valid bases', () => {
      const presets = getRegistryPresets()
      const bases = getRegistryBases()
      const baseNames = bases.map(b => b.name)

      for (const preset of presets) {
        expect(baseNames).toContain(preset.base)
      }
    })

    it('all presets reference valid styles', () => {
      const presets = getRegistryPresets()
      const styles = getRegistryVisualStyles()
      const styleNames = styles.map(s => s.name)

      for (const preset of presets) {
        expect(styleNames).toContain(preset.style)
      }
    })

    it('all presets reference valid icon libraries', () => {
      const presets = getRegistryPresets()
      const libs = getRegistryIconLibraries()
      const libNames = libs.map(l => l.name)

      for (const preset of presets) {
        expect(libNames).toContain(preset.iconLibrary)
      }
    })

    it('all presets reference valid fonts', () => {
      const presets = getRegistryPresets()
      const fonts = getRegistryFonts()
      const fontNames = fonts.map(f => f.name)

      for (const preset of presets) {
        expect(fontNames).toContain(preset.font)
      }
    })
  })
})
