import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { FRAMEWORKS } from '../../src/utils/frameworks'
import { getProjectInfo } from '../../src/utils/get-project-info'

describe('get project info', async () => {
  it.each([
    {
      name: 'nuxt',
      type: {
        framework: FRAMEWORKS.nuxt,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.ts',
        tailwindCssFile: 'assets/css/tailwind.css',
        tailwindVersion: 'v4',
        aliasPrefix: '@',
      },
    },
    {
      name: 'vite',
      type: {
        framework: FRAMEWORKS.vite,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.js',
        tailwindCssFile: 'src/index.css',
        tailwindVersion: 'v4',
        aliasPrefix: null,
      },
    },
    {
      name: 'vite-tw3',
      type: {
        framework: FRAMEWORKS.vite,
        typescript: true,
        tailwindConfigFile: 'tailwind.config.js',
        tailwindCssFile: 'src/index.css',
        tailwindVersion: 'v3',
        aliasPrefix: null,
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
