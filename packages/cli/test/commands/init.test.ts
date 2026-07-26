import fs from 'node:fs'
import { addDependency } from 'nypm'
import path from 'pathe'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { applyInitUrlOptions, initOptionsSchema, runInit } from '../../src/commands/init'
import { DEFAULT_PRESETS, resolveCreateUrl, resolveInitUrl } from '../../src/preset/presets'
import * as registry from '../../src/registry'
import { getConfig } from '../../src/utils/get-config'

vi.mock('nypm')
vi.mock('fs/promises', () => ({
  writeFile: vi.fn(),
  mkdir: vi.fn(),
}))
vi.mock('ora')

it.skip('init config-full', async () => {
  vi.spyOn(registry, 'getRegistryBaseColor').mockResolvedValue({
    inlineColors: {},
    cssVars: {},
    inlineColorsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
    cssVarsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
  })
  vi.spyOn(registry, 'getRegistryItem').mockResolvedValue({
    name: 'new-york',
    dependencies: [
      'tailwindcss-animate',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      '@lucide/vue',
      '@radix-icons/vue',
      '@tabler/icons-vue',
      '@phosphor-icons/vue',
    ],
    registryDependencies: [],
    tailwind: {
      config: {
        theme: {
          extend: {
            borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
            },
          },
        },
        plugins: ['require("tailwindcss-animate")'],
      },
    },
    files: [],
    cssVariables: {
      light: {
        '--radius': '0.5rem',
      },
    },
  })

  const mockMkdir = vi.spyOn(fs.promises, 'mkdir').mockResolvedValue(undefined)
  const mockWriteFile = vi.spyOn(fs.promises, 'writeFile').mockResolvedValue()

  const targetDir = path.resolve(__dirname, '../fixtures/config-full')
  const config = await getConfig(targetDir)

  await runInit(config!)

  expect(mockMkdir).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/src\/lib$/),
    expect.anything(),
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/src\/components$/),
    expect.anything(),
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/tailwind.config.ts$/),
    expect.stringContaining('/** @type {import(\'tailwindcss\').Config} */'),
    'utf8',
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/src\/app\/globals.css$/),
    expect.stringContaining('@tailwind base'),
    'utf8',
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    3,
    expect.stringMatching(/src\/lib\/utils.ts$/),
    expect.stringContaining('import { type ClassValue, clsx } from \'clsx\''),
    'utf8',
  )
  expect(addDependency).toHaveBeenCalledWith(
    [
      'tailwindcss-animate',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'reka-ui',
      '@radix-icons/vue',
      '@tabler/icons-vue',
      '@phosphor-icons/vue',
    ],
    {
      cwd: targetDir,
      silent: true,
    },
  )

  mockMkdir.mockRestore()
  mockWriteFile.mockRestore()
})

describe('initOptionsSchema', () => {
  const base = {
    cwd: '/tmp/my-app',
    yes: true,
    defaults: false,
    force: false,
    silent: false,
    isNewProject: false,
    cssVariables: true,
    baseStyle: true,
  }

  it('accepts minimal valid input', () => {
    const result = initOptionsSchema.parse(base)
    expect(result.cwd).toBe('/tmp/my-app')
    expect(result.yes).toBe(true)
  })

  it('accepts a preset string', () => {
    const result = initOptionsSchema.parse({ ...base, preset: 'reka-vega' })
    expect(result.preset).toBe('reka-vega')
  })

  it('accepts a preset URL', () => {
    const url = 'https://example.com/my-preset.json'
    const result = initOptionsSchema.parse({ ...base, preset: url })
    expect(result.preset).toBe(url)
  })

  it('preset is optional', () => {
    const result = initOptionsSchema.parse(base)
    expect(result.preset).toBeUndefined()
  })

  it('parses pointer flags', () => {
    const result = initOptionsSchema.parse({ ...base, pointer: true })
    expect(result.pointer).toBe(true)
  })

  it('applies pointer to raw init urls', () => {
    const url = applyInitUrlOptions(
      new URL('https://shadcn-vue.com/init?preset=a0'),
      { pointer: true },
    )

    expect(url.searchParams.get('pointer')).toBe('true')
  })

  it('removes pointer from raw init urls when disabled', () => {
    const url = applyInitUrlOptions(
      new URL('https://shadcn-vue.com/init?preset=a0&pointer=true'),
      { pointer: false },
    )

    expect(url.searchParams.has('pointer')).toBe(false)
  })

  it('accepts valid style', () => {
    const result = initOptionsSchema.parse({ ...base, style: 'vega' })
    expect(result.style).toBe('vega')
  })

  it('rejects invalid style', () => {
    expect(() => initOptionsSchema.parse({ ...base, style: 'unknown-style' })).toThrow()
  })

  it('accepts valid base color', () => {
    const result = initOptionsSchema.parse({ ...base, baseColor: 'neutral' })
    expect(result.baseColor).toBe('neutral')
  })

  it('rejects invalid base color', () => {
    expect(() => initOptionsSchema.parse({ ...base, baseColor: 'pink' })).toThrow()
  })
})

describe('default presets', () => {
  it('exposes all built-in presets', () => {
    const names = Object.keys(DEFAULT_PRESETS)
    expect(names).toContain('vega')
    expect(names).toContain('nova')
    expect(names).toContain('maia')
    expect(names).toContain('lyra')
    expect(names).toContain('mira')
    expect(names).toContain('luma')
    expect(names).toContain('sera')
  })

  it('each preset has a complete design system config', () => {
    for (const preset of Object.values(DEFAULT_PRESETS)) {
      expect(preset.base).toBeDefined()
      expect(preset.style).toBeDefined()
      expect(preset.baseColor).toBeDefined()
      expect(preset.theme).toBeDefined()
      expect(preset.iconLibrary).toBeDefined()
      expect(preset.font).toBeDefined()
      expect(preset.menuAccent).toBeDefined()
      expect(preset.menuColor).toBeDefined()
      expect(preset.radius).toBeDefined()
      expect(preset.fontHeading).toBeDefined()
      expect(preset.rtl).toBeDefined()
    }
  })
})

describe('preset urls', () => {
  it('should append search params when provided', () => {
    const url = resolveCreateUrl({ rtl: true, pointer: true, template: 'nuxt' })
    const parsed = new URL(url)

    expect(parsed.searchParams.get('rtl')).toBe('true')
    expect(parsed.searchParams.get('pointer')).toBe('true')
    expect(parsed.searchParams.get('template')).toBe('nuxt')
  })

  it('should include pointer when enabled', () => {
    const url = resolveInitUrl(DEFAULT_PRESETS.nova, { pointer: true })
    const parsed = new URL(url)

    expect(parsed.searchParams.get('pointer')).toBe('true')
  })

  it('should not include pointer when disabled', () => {
    const url = resolveInitUrl(DEFAULT_PRESETS.nova, { pointer: false })
    const parsed = new URL(url)

    expect(parsed.searchParams.has('pointer')).toBe(false)
  })

  it('should include pointer with preset codes', () => {
    const url = resolveInitUrl(DEFAULT_PRESETS.nova, { preset: 'a0', pointer: true })
    const parsed = new URL(url)

    expect(parsed.searchParams.get('preset')).toBe('a0')
    expect(parsed.searchParams.get('pointer')).toBe('true')
  })
})

afterEach(() => {
  vi.resetAllMocks()
})
