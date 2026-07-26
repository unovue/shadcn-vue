import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { getTsConfigAliasPrefix } from '../../src/utils/get-project-info'

describe('get ts config alias prefix', async () => {
  it.each([
    {
      name: 'nuxt',
      prefix: '@',
    },
    // {
    //   name: 'vite',
    //   prefix: '@',
    // },
    // {
    //   name: 'next-app-custom-alias',
    //   prefix: '@custom-alias',
    // },
  ])(`getTsConfigAliasPrefix($name) -> $prefix`, async ({ name, prefix }) => {
    expect(
      await getTsConfigAliasPrefix(
        path.resolve(__dirname, `../fixtures/frameworks/${name}`),
      ),
    ).toBe(prefix)
  })
})
