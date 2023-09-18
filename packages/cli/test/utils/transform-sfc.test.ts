import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { transform } from '../../src/utils/transformers'

describe('transformSFC', () => {
  const appVuePath = resolve(__dirname, '../fixtures/transform-sfc/app.vue')
  const content = readFileSync(appVuePath, 'utf-8')
  test('basic', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: content,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })
})
