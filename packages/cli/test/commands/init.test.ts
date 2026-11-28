import type { Config } from '../../src/utils/get-config'
import fs from 'node:fs'
import { addDependency } from 'nypm'
import path from 'pathe'
import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  applyInitUrlOptions,
  init,
  initOptionsSchema,
  promptForConfig,
  promptForMinimalConfig,
  resolveInitPresetUrl,
  runInit,
} from '../../src/commands/init'
import {
  DEFAULT_PRESETS,
  resolveCreateUrl,
  resolveInitUrl,
  resolveRegistryBaseConfig,
} from '../../src/preset/presets'
import * as registry from '../../src/registry'
import { getRegistryBaseColors, getRegistryStyles } from '../../src/registry/api'
import { getConfig } from '../../src/utils/get-config'
import { getProjectTailwindVersionFromConfig } from '../../src/utils/get-project-info'

const bases = vi.hoisted(() => [
  { name: 'reka', label: 'Reka UI', description: 'Reka', dependencies: ['reka-ui'] },
])

vi.mock('../../src/registry/constants', async importOriginal => ({
  ...(await importOriginal<typeof import('../../src/registry/constants')>()),
  BASES: bases,
}))

vi.mock('../../src/preset/presets', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/preset/presets')>()
  return { ...actual, resolveRegistryBaseConfig: vi.fn(actual.resolveRegistryBaseConfig) }
})

vi.mock('../../src/registry/api', async importOriginal => ({
  ...(await importOriginal<typeof import('../../src/registry/api')>()),
  getRegistryStyles: vi.fn(),
  getRegistryBaseColors: vi.fn(),
}))

vi.mock('../../src/utils/get-project-info', async importOriginal => ({
  ...(await importOriginal<typeof import('../../src/utils/get-project-info')>()),
  getProjectTailwindVersionFromConfig: vi.fn(),
}))

vi.mock('../../src/utils/handle-error', () => ({
  handleError: vi.fn(),
}))

vi.mock('../../src/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    log: vi.fn(),
    info: vi.fn(),
    break: vi.fn(),
  },
}))

vi.mock('prompts', () => ({ default: vi.fn() }))
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
      'cn',
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
    expect.stringContaining('export { cn } from \'cn\''),
    'utf8',
  )
  expect(addDependency).toHaveBeenCalledWith(
    [
      'tailwindcss-animate',
      'class-variance-authority',
      'cn',
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

const vase = { name: 'vase', label: 'Vase UI', description: 'Vase', dependencies: ['@vase-ui/vue'] }

const VASE_PRESET_CODE = 'a4gfFC4'

function parseInitOptions(overrides: Record<string, unknown> = {}) {
  return initOptionsSchema.parse({
    cwd: '/tmp/app',
    yes: true,
    defaults: false,
    force: false,
    silent: true,
    isNewProject: false,
    cssVariables: true,
    baseStyle: true,
    ...overrides,
  })
}

function projectConfig(style: string) {
  return {
    $schema: 'https://shadcn-vue.com/schema.json',
    style,
    typescript: true,
    tailwind: { config: '', css: 'src/style.css', baseColor: 'neutral', cssVariables: true, prefix: '' },
    aliases: { components: '@/components', utils: '@/lib/utils' },
    resolvedPaths: { cwd: '/tmp/app' },
  } as Config
}

function baseQuestionType() {
  const questions = vi.mocked(prompts).mock.calls.at(-1)![0] as unknown as { name: string, type: unknown }[]

  return questions.find(question => question.name === 'base')!.type
}

describe('resolveInitPresetUrl', () => {
  const baseOf = (url: string) => new URL(url).searchParams.get('base')

  it('uses the base of the preset code', () => {
    const url = resolveInitPresetUrl(VASE_PRESET_CODE, {})

    expect(baseOf(url)).toBe('vase')
    expect(new URL(url).searchParams.get('preset')).toBe(VASE_PRESET_CODE)
  })

  it('lets --base win over the base of the preset code', () => {
    expect(baseOf(resolveInitPresetUrl(VASE_PRESET_CODE, { base: 'reka' }))).toBe('reka')
  })

  it('uses the base of a named preset unless --base is set', () => {
    expect(baseOf(resolveInitPresetUrl('nova', {}))).toBe('reka')
    expect(baseOf(resolveInitPresetUrl('nova', { base: 'vase' }))).toBe('vase')
  })

  it('keeps the base of a preset URL and applies the options', () => {
    const url = resolveInitPresetUrl('https://shadcn-vue.com/init?base=vase&style=nova', { pointer: true })

    expect(baseOf(url)).toBe('vase')
    expect(new URL(url).searchParams.get('pointer')).toBe('true')
  })

  it('throws for an unknown preset', () => {
    expect(() => resolveInitPresetUrl('unknown-preset', {})).toThrow('Unknown preset: unknown-preset')
  })
})

describe('init --defaults with a preset code', () => {
  beforeEach(() => {
    bases.push(vase)
  })

  afterEach(() => {
    bases.length = 1
  })

  it('preserves the base from a preset code when --defaults is set', async () => {
    vi.mocked(resolveRegistryBaseConfig).mockRejectedValueOnce(new Error('stop'))

    await init.parseAsync(['--preset', VASE_PRESET_CODE, '--defaults', '--cwd', '/tmp/app'], { from: 'user' })

    const [initUrl] = vi.mocked(resolveRegistryBaseConfig).mock.calls[0]!
    expect(new URL(initUrl).searchParams.get('base')).toBe('vase')
  })

  it('lets --base override a preset code when --defaults is set', async () => {
    vi.mocked(resolveRegistryBaseConfig).mockRejectedValueOnce(new Error('stop'))

    await init.parseAsync(['--preset', VASE_PRESET_CODE, '--defaults', '--base', 'reka', '--cwd', '/tmp/app'], { from: 'user' })

    const [initUrl] = vi.mocked(resolveRegistryBaseConfig).mock.calls[0]!
    expect(new URL(initUrl).searchParams.get('base')).toBe('reka')
  })
})

describe('the base prompt of init', () => {
  beforeEach(() => {
    vi.mocked(prompts).mockResolvedValue({})
    vi.mocked(getRegistryStyles).mockResolvedValue([])
    vi.mocked(getRegistryBaseColors).mockResolvedValue([])
    vi.mocked(getProjectTailwindVersionFromConfig).mockResolvedValue('v4')
  })

  it('is skipped when reka is the only base', async () => {
    await promptForMinimalConfig(projectConfig('reka-nova'), parseInitOptions())
    expect(baseQuestionType()).toBeNull()

    await promptForConfig(projectConfig('reka-nova'), parseInitOptions())
    expect(baseQuestionType()).toBeNull()
  })

  describe('with several bases', () => {
    beforeEach(() => {
      bases.push(vase)
    })

    afterEach(() => {
      bases.length = 1
    })

    it('is asked when --base is not set', async () => {
      await promptForMinimalConfig(projectConfig('reka-nova'), parseInitOptions())
      expect(baseQuestionType()).toBe('select')

      await promptForConfig(projectConfig('reka-nova'), parseInitOptions())
      expect(baseQuestionType()).toBe('select')
    })

    it('is skipped when --base is set', async () => {
      await promptForMinimalConfig(projectConfig('reka-nova'), parseInitOptions({ base: 'vase' }))
      expect(baseQuestionType()).toBeNull()

      await promptForConfig(projectConfig('reka-nova'), parseInitOptions({ base: 'vase' }))
      expect(baseQuestionType()).toBeNull()
    })
  })
})

describe('the style of init', () => {
  beforeEach(() => {
    bases.push(vase)
    vi.mocked(prompts).mockResolvedValue({})
    vi.mocked(getRegistryStyles).mockResolvedValue([])
    vi.mocked(getRegistryBaseColors).mockResolvedValue([])
    vi.mocked(getProjectTailwindVersionFromConfig).mockResolvedValue('v4')
  })

  afterEach(() => {
    bases.length = 1
  })

  const styleOf = async (style: string, base: string) =>
    (await promptForMinimalConfig(projectConfig(style), parseInitOptions({ base }))).style

  it('keeps the style of the project for reka', async () => {
    expect(await styleOf('new-york-v4', 'reka')).toBe('new-york-v4')
    expect(await styleOf('reka-nova', 'reka')).toBe('reka-nova')
  })

  it('falls back to vega when the project style belongs to another base', async () => {
    expect(await styleOf('new-york-v4', 'vase')).toBe('vase-vega')
    expect(await styleOf('new-york', 'vase')).toBe('vase-vega')
    expect(await styleOf('reka-nova', 'vase')).toBe('vase-vega')
    expect(await styleOf('vase-nova', 'reka')).toBe('reka-vega')
  })

  it('keeps the style of the project for its own base', async () => {
    expect(await styleOf('vase-nova', 'vase')).toBe('vase-nova')
  })
})

afterEach(() => {
  vi.resetAllMocks()
})
