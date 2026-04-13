import { describe, expect, it } from 'vitest'
import { configSchema, presetSchema, rawConfigSchema } from '../../src/schema'

describe('rawConfigSchema', () => {
  it('accepts valid config with all fields', () => {
    const validConfig = {
      style: 'reka-luma',
      font: 'inter',
      typescript: true,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      iconLibrary: 'lucide',
      menuColor: 'default',
      menuAccent: 'subtle',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(validConfig)
    expect(result.style).toBe('reka-luma')
    expect(result.font).toBe('inter')
    expect(result.iconLibrary).toBe('lucide')
    expect(result.menuColor).toBe('default')
    expect(result.menuAccent).toBe('subtle')
  })

  it('accepts a composed visual style identifier', () => {
    const config = {
      style: 'reka-vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(config)
    expect(result.style).toBe('reka-vega')
  })

  it('accepts config without optional font field', () => {
    const configWithoutFont = {
      style: 'reka-vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(configWithoutFont)
    expect(result.font).toBeUndefined()
  })

  it('accepts config with font field set', () => {
    const config = {
      style: 'reka-vega',
      font: 'figtree',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(config)
    expect(result.font).toBe('figtree')
  })

  it('validates menuColor enum values', () => {
    const validDefault = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      menuColor: 'default',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const validInverted = {
      ...validDefault,
      menuColor: 'inverted',
    }

    expect(() => rawConfigSchema.parse(validDefault)).not.toThrow()
    expect(() => rawConfigSchema.parse(validInverted)).not.toThrow()
  })

  it('validates menuAccent enum values', () => {
    const validSubtle = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      menuAccent: 'subtle',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const validBold = {
      ...validSubtle,
      menuAccent: 'bold',
    }

    expect(() => rawConfigSchema.parse(validSubtle)).not.toThrow()
    expect(() => rawConfigSchema.parse(validBold)).not.toThrow()
  })

  it('rejects invalid menuColor values', () => {
    const invalidConfig = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      menuColor: 'invalid',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    expect(() => rawConfigSchema.parse(invalidConfig)).toThrow()
  })

  it('accepts optional rtl flag', () => {
    const config = {
      style: 'reka-vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      rtl: true,
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(config)
    expect(result.rtl).toBe(true)
  })

  it('rtl is optional and defaults to undefined when omitted', () => {
    const config = {
      style: 'reka-vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    const result = rawConfigSchema.parse(config)
    expect(result.rtl).toBeUndefined()
  })

  it('rejects non-boolean rtl values', () => {
    const config = {
      style: 'reka-vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
        cssVariables: true,
      },
      rtl: 'yes',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    expect(() => rawConfigSchema.parse(config)).toThrow()
  })

  it('rejects invalid menuAccent values', () => {
    const invalidConfig = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      menuAccent: 'invalid',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    }

    expect(() => rawConfigSchema.parse(invalidConfig)).toThrow()
  })
})

describe('configSchema', () => {
  it('requires resolvedPaths including composables', () => {
    const config = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
      resolvedPaths: {
        cwd: '/project',
        tailwindConfig: '/project/tailwind.config.ts',
        tailwindCss: '/project/src/globals.css',
        utils: '/project/src/lib/utils',
        components: '/project/src/components',
        lib: '/project/src/lib',
        hooks: '/project/src/hooks',
        ui: '/project/src/components/ui',
        composables: '/project/src/composables',
      },
    }

    const result = configSchema.parse(config)
    expect(result.resolvedPaths.composables).toBe('/project/src/composables')
  })

  it('fails without composables in resolvedPaths', () => {
    const configWithoutComposables = {
      style: 'vega',
      typescript: true,
      tailwind: {
        css: 'src/globals.css',
        baseColor: 'neutral',
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
      resolvedPaths: {
        cwd: '/project',
        tailwindConfig: '/project/tailwind.config.ts',
        tailwindCss: '/project/src/globals.css',
        utils: '/project/src/lib/utils',
        components: '/project/src/components',
        lib: '/project/src/lib',
        hooks: '/project/src/hooks',
        ui: '/project/src/components/ui',
        // composables is missing
      },
    }

    expect(() => configSchema.parse(configWithoutComposables)).toThrow()
  })
})

describe('presetSchema', () => {
  it('validates complete preset', () => {
    const validPreset = {
      name: 'reka-vega',
      title: 'Vega',
      description: 'Vega / Lucide / Inter',
      base: 'reka',
      style: 'vega',
      baseColor: 'neutral',
      theme: 'neutral',
      iconLibrary: 'lucide',
      font: 'inter',
      menuAccent: 'subtle',
      menuColor: 'default',
      radius: 'default',
    }

    const result = presetSchema.parse(validPreset)
    expect(result.name).toBe('reka-vega')
    expect(result.base).toBe('reka')
    expect(result.style).toBe('vega')
    expect(result.iconLibrary).toBe('lucide')
    expect(result.font).toBe('inter')
  })

  it('requires all preset fields', () => {
    const incompletePreset = {
      name: 'reka-vega',
      title: 'Vega',
      // missing other fields
    }

    expect(() => presetSchema.parse(incompletePreset)).toThrow()
  })

  it('validates menuAccent enum in preset', () => {
    const presetWithBoldAccent = {
      name: 'test-preset',
      title: 'Test',
      description: 'Test preset',
      base: 'reka',
      style: 'vega',
      baseColor: 'neutral',
      theme: 'neutral',
      iconLibrary: 'lucide',
      font: 'inter',
      menuAccent: 'bold',
      menuColor: 'default',
      radius: 'default',
    }

    const result = presetSchema.parse(presetWithBoldAccent)
    expect(result.menuAccent).toBe('bold')
  })

  it('validates menuColor enum in preset', () => {
    const presetWithInvertedColor = {
      name: 'test-preset',
      title: 'Test',
      description: 'Test preset',
      base: 'reka',
      style: 'vega',
      baseColor: 'neutral',
      theme: 'neutral',
      iconLibrary: 'lucide',
      font: 'inter',
      menuAccent: 'subtle',
      menuColor: 'inverted',
      radius: 'default',
    }

    const result = presetSchema.parse(presetWithInvertedColor)
    expect(result.menuColor).toBe('inverted')
  })
})
