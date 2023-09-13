import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { transformSFC } from '../../src/utils/transformers/transform-sfc'

describe('transformSFC', () => {
  const appVuePath = resolve(__dirname, '../fixtures/transform-sfc/app.vue')
  const content = readFileSync(appVuePath, 'utf-8')
  test('basic', async () => {
    const result = await transformSFC({
      name: 'app.vue',
      content,
    }, {
      typescript: false,
    } as any)
    expect(result).toMatchSnapshot()
  })
})
