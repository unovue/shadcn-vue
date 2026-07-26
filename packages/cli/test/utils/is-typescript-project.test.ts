import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { isTypeScriptProject } from '../../src/utils/get-project-info'

describe('is TypeScript project', async () => {
  it.each([
    {
      name: 'nuxt',
      result: true,
    },
  ])(`isTypeScriptProject($name) -> $result`, async ({ name, result }) => {
    expect(
      await isTypeScriptProject(
        path.resolve(__dirname, `../fixtures/frameworks/${name}`),
      ),
    ).toBe(result)
  })
})
