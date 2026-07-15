import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { FRAMEWORKS } from '../../src/utils/frameworks'
import { getProjectInfo } from '../../src/utils/get-project-info'

describe('get project info', async () => {
  it.each([
    {
      name: 'nuxt',
      type: {
        framework: FRAMEWORKS.nuxt3,
        isSrcDir: false,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.ts',
        tailwindCssFile: 'assets/css/tailwind.css',
        tailwindVersion: 'v4',
        aliasPrefix: '@',
        packageManager: 'pnpm',
      },
    },
    {
      name: 'vite',
      type: {
        framework: FRAMEWORKS.vite,
        isSrcDir: true,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.js',
        tailwindCssFile: 'src/index.css',
        tailwindVersion: 'v4',
        aliasPrefix: null,
        packageManager: 'pnpm',
      },
    },
    {
      name: 'vite-tw3',
      type: {
        framework: FRAMEWORKS.vite,
        isSrcDir: true,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.js',
        tailwindCssFile: 'src/index.css',
        tailwindVersion: 'v3',
        aliasPrefix: null,
        packageManager: 'pnpm',
      },
    },
    {
      // Inertia + Rails-style project: @inertiajs/vue3 in deps but no
      // ./inertia/tsconfig.json — the alias should still resolve from the
      // root tsconfig.json. See issue #1817.
      name: 'inertia-rails',
      type: {
        framework: FRAMEWORKS.inertia,
        isSrcDir: false,
        typescript: true,
        tailwindConfigFile: null,
        tailwindCssFile: 'app/frontend/entrypoint.css',
        tailwindVersion: 'v4',
        aliasPrefix: '@',
        packageManager: 'pnpm',
      },
    },
    {
      // AdonisJS-style Inertia project: ./inertia/tsconfig.json exists and
      // must take precedence over the root tsconfig.json (which has no
      // paths — a regression to the root lookup would yield a null prefix).
      name: 'inertia-adonis',
      type: {
        framework: FRAMEWORKS.inertia,
        isSrcDir: false,
        typescript: true,
        tailwindConfigFile: null,
        tailwindCssFile: 'inertia/css/app.css',
        tailwindVersion: 'v4',
        aliasPrefix: '~',
        packageManager: 'pnpm',
      },
    },
  ])(`getProjectType($name) -> $type`, async ({ name, type }) => {
    expect(
      await getProjectInfo(
        path.resolve(__dirname, `../fixtures/frameworks/${name}`),
      ),
    ).toStrictEqual(type)
  })
})
