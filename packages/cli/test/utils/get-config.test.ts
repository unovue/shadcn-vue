import path from 'pathe'
import { expect, it } from 'vitest'

import { getConfig, getRawConfig } from '../../src/utils/get-config'

it('get raw config', async () => {
  expect(
    await getRawConfig(path.resolve(__dirname, '../fixtures/config-none')),
  ).toEqual(null)

  expect(
    await getRawConfig(path.resolve(__dirname, '../fixtures/config-partial')),
  ).toEqual({
    style: 'default',
    tailwind: {
      config: './tailwind.config.ts',
      css: './src/assets/css/tailwind.css',
      baseColor: 'neutral',
      cssVariables: false,
    },
    // tsConfigPath: './tsconfig.json',
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
    typescript: true,
  })

  expect(
    getRawConfig(path.resolve(__dirname, '../fixtures/config-invalid')),
  ).rejects.toThrowError()
})

it('get config', async () => {
  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-none')),
  ).toEqual(null)

  expect(
    getConfig(path.resolve(__dirname, '../fixtures/config-invalid')),
  ).rejects.toThrowError()

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-partial')),
  ).toEqual({
    style: 'default',
    tailwind: {
      config: './tailwind.config.ts',
      css: './src/assets/css/tailwind.css',
      baseColor: 'neutral',
      cssVariables: false,
    },
    typescript: true,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
    // tsConfigPath: './tsconfig.json',
    resolvedPaths: {
      cwd: path.resolve(__dirname, '../fixtures/config-partial'),
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        'tailwind.config.ts',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './src/assets/css/tailwind.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './components',
      ),
      composables: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './composables',
      ),
      ui: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './components/ui',
      ),
      utils: path.resolve(
        __dirname,
        '../fixtures/config-partial',
        './lib/utils',
      ),
      lib: path.resolve(__dirname, '../fixtures/config-partial', './lib'),
    },
    iconLibrary: 'lucide',
  })

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-full')),
  ).toEqual({
    style: 'new-york',
    typescript: true,
    tailwind: {
      config: 'tailwind.config.ts',
      baseColor: 'zinc',
      css: 'src/app/globals.css',
      cssVariables: true,
      prefix: 'tw-',
    },
    aliases: {
      components: '~/components',
      composables: '~/composables',
      utils: '~/lib/utils',
      lib: '~/lib',
      ui: '~/ui',
    },
    iconLibrary: 'lucide',
    resolvedPaths: {
      cwd: path.resolve(__dirname, '../fixtures/config-full'),
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-full',
        'tailwind.config.ts',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/app/globals.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/components',
      ),
      composables: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/composables',
      ),
      ui: path.resolve(__dirname, '../fixtures/config-full', './src/ui'),
      lib: path.resolve(__dirname, '../fixtures/config-full', './src/lib'),
      utils: path.resolve(
        __dirname,
        '../fixtures/config-full',
        './src/lib/utils',
      ),
    },
  })

  expect(
    await getConfig(path.resolve(__dirname, '../fixtures/config-js')),
  ).toEqual({
    style: 'default',
    tailwind: {
      config: './tailwind.config.js',
      css: './src/assets/css/tailwind.css',
      baseColor: 'neutral',
      cssVariables: false,
    },
    typescript: false,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
    iconLibrary: 'radix',
    resolvedPaths: {
      cwd: path.resolve(__dirname, '../fixtures/config-js'),
      tailwindConfig: path.resolve(
        __dirname,
        '../fixtures/config-js',
        'tailwind.config.js',
      ),
      tailwindCss: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './src/assets/css/tailwind.css',
      ),
      components: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './components',
      ),
      composables: path.resolve(
        __dirname,
        '../fixtures/config-js',
        './composables',
      ),
      ui: path.resolve(__dirname, '../fixtures/config-js', './components/ui'),
      utils: path.resolve(__dirname, '../fixtures/config-js', './lib/utils'),
      lib: path.resolve(__dirname, '../fixtures/config-js', './lib'),
    },
  })
})
