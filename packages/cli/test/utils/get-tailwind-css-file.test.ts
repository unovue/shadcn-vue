import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { getTailwindCssFile } from '../../src/utils/get-project-info'

describe('get tailwindcss file', async () => {
  it.each([
    {
      name: 'nuxt',
      file: 'assets/css/tailwind.css',
    },
    {
      name: 'vite',
      file: 'src/index.css',
    },
  ])(`getTailwindCssFile($name) -> $file`, async ({ name, file }) => {
    expect(
      await getTailwindCssFile(
        path.resolve(__dirname, `../fixtures/frameworks/${name}`),
      ),
    ).toBe(file)
  })
})
