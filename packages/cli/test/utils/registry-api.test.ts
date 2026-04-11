import { describe, expect, it } from 'vitest'
import {
  getRegistryBase,
  getRegistryBases,
  getRegistryBaseColors,
  getRegistryFont,
  getRegistryFonts,
  getRegistryIconLibraries,
  getRegistryIconLibrary,
  getRegistryPreset,
  getRegistryPresets,
  getRegistryVisualStyle,
  getRegistryVisualStyles,
} from '../../src/registry/api'
import { BASE_COLORS, SHADCN_VUE_URL } from '../../src/registry/constants'

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

    it('includes all six styles', () => {
      const styles = getRegistryVisualStyles()
      const styleNames = styles.map(s => s.name)
      expect(styleNames).toContain('vega')
      expect(styleNames).toContain('nova')
      expect(styleNames).toContain('maia')
      expect(styleNames).toContain('lyra')
      expect(styleNames).toContain('mira')
      expect(styleNames).toContain('luma')
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
      expect(lucide?.packages).toContain('lucide-vue-next')
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

    it('includes all new fonts added in this PR', () => {
      const fonts = getRegistryFonts()
      const fontNames = fonts.map(f => f.name)
      expect(fontNames).toContain('geist-sans')
      expect(fontNames).toContain('noto-sans')
      expect(fontNames).toContain('nunito-sans')
      expect(fontNames).toContain('roboto')
      expect(fontNames).toContain('raleway')
      expect(fontNames).toContain('dm-sans')
      expect(fontNames).toContain('public-sans')
      expect(fontNames).toContain('outfit')
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

    it('returns geist-sans font by name', () => {
      const geist = getRegistryFont('geist-sans')
      expect(geist).toBeDefined()
      expect(geist?.name).toBe('geist-sans')
      expect(geist?.label).toBe('Geist')
    })

    it('returns dm-sans font by name', () => {
      const dmSans = getRegistryFont('dm-sans')
      expect(dmSans).toBeDefined()
      expect(dmSans?.name).toBe('dm-sans')
    })

    it('returns outfit font by name', () => {
      const outfit = getRegistryFont('outfit')
      expect(outfit).toBeDefined()
      expect(outfit?.name).toBe('outfit')
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

  describe('getRegistryBaseColors', () => {
    it('returns the BASE_COLORS array', async () => {
      const colors = await getRegistryBaseColors()
      expect(colors).toBeDefined()
      expect(Array.isArray(colors)).toBe(true)
      expect(colors.length).toBeGreaterThan(0)
    })

    it('contains "neutral" base color', async () => {
      const colors = await getRegistryBaseColors()
      const names = colors.map(c => c.name)
      expect(names).toContain('neutral')
    })

    it('contains new base colors added in this PR', async () => {
      const colors = await getRegistryBaseColors()
      const names = colors.map(c => c.name)
      expect(names).toContain('mauve')
      expect(names).toContain('olive')
      expect(names).toContain('mist')
      expect(names).toContain('taupe')
    })

    it('does not contain removed legacy colors', async () => {
      const colors = await getRegistryBaseColors()
      const names = colors.map(c => c.name)
      expect(names).not.toContain('gray')
      expect(names).not.toContain('slate')
    })
  })

  describe('constants', () => {
    it('SHADCN_VUE_URL defaults to "https://shadcn-vue.com"', () => {
      // If overridden by env var, skip; otherwise check default.
      if (!process.env.SHADCN_VUE_URL) {
        expect(SHADCN_VUE_URL).toBe('https://shadcn-vue.com')
      }
      else {
        expect(SHADCN_VUE_URL).toBe(process.env.SHADCN_VUE_URL)
      }
    })

    it('BASE_COLORS contains 7 entries', () => {
      expect(BASE_COLORS).toHaveLength(7)
    })

    it('BASE_COLORS entries all have name and label properties', () => {
      for (const color of BASE_COLORS) {
        expect(color.name).toBeDefined()
        expect(color.label).toBeDefined()
      }
    })
  })
})