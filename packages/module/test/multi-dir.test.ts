import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('multi component directories', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/multi-dir', import.meta.url)),
  })

  it('renders components from both directories', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Base Button')
    expect(html).toContain('AI Chat Panel')
  })
})
