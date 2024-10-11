import fs from 'node:fs'
import path from 'pathe'
import { addDependency } from 'nypm'
import { afterEach, expect, it, vi } from 'vitest'

import runInitVue from '../../src/commands/frameworks/vue/init'
import { getConfig } from '../../src/utils/get-config'
import * as registry from '../../src/utils/registry'

vi.mock('nypm')
vi.mock('fs/promises', () => ({
  writeFile: vi.fn(),
  mkdir: vi.fn(),
}))
vi.mock('ora')

it('init config-full', async () => {
  vi.spyOn(registry, 'getRegistryBaseColor').mockResolvedValue({
    inlineColors: {},
    cssVars: {},
    inlineColorsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
    cssVarsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
  })
  const mockMkdir = vi.spyOn(fs.promises, 'mkdir').mockResolvedValue(undefined)
  const mockWriteFile = vi.spyOn(fs.promises, 'writeFile').mockResolvedValue()

  const targetDir = path.resolve(__dirname, '../fixtures/config-full')
  const config = await getConfig(targetDir)

  await runInitVue(targetDir, config!)

  expect(mockMkdir).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/src\/app$/),
    expect.anything(),
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/src\/lib$/),
    expect.anything(),
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    3,
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
      'radix-vue',
      '@radix-icons/vue',
    ],
    {
      cwd: targetDir,
      silent: true,
    },
  )

  mockMkdir.mockRestore()
  mockWriteFile.mockRestore()
})

it('init config-partial', async () => {
  vi.spyOn(registry, 'getRegistryBaseColor').mockResolvedValue({
    inlineColors: {},
    cssVars: {},
    inlineColorsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
    cssVarsTemplate:
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
  })
  const mockMkdir = vi.spyOn(fs.promises, 'mkdir').mockResolvedValue(undefined)
  const mockWriteFile = vi.spyOn(fs.promises, 'writeFile').mockResolvedValue()

  const targetDir = path.resolve(__dirname, '../fixtures/config-partial')
  const config = await getConfig(targetDir)

  await runInitVue(targetDir, config!)

  expect(mockMkdir).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/src\/assets\/css$/),
    expect.anything(),
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/lib$/),
    expect.anything(),
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    3,
    expect.stringMatching(/components$/),
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
    expect.stringMatching(/src\/assets\/css\/tailwind.css$/),
    expect.stringContaining('@tailwind base'),
    'utf8',
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    3,
    expect.stringMatching(/utils.ts$/),
    expect.stringContaining('import { type ClassValue, clsx } from \'clsx\''),
    'utf8',
  )
  expect(addDependency).toHaveBeenCalledWith(
    [
      'tailwindcss-animate',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'radix-vue',
      'lucide-vue-next',
    ],
    {
      cwd: targetDir,
      silent: true,
    },
  )

  mockMkdir.mockRestore()
  mockWriteFile.mockRestore()
})

afterEach(() => {
  vi.resetAllMocks()
})
