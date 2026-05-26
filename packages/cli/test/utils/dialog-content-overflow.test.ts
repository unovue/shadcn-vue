import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const dialogContentFiles = [
  'apps/v4/registry/bases/reka/ui/dialog/DialogContent.vue',
  'apps/v4/registry/new-york-v4/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-luma/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-lyra/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-maia/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-mira/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-nova/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-sera/ui/dialog/DialogContent.vue',
  'apps/v4/styles/reka-vega/ui/dialog/DialogContent.vue',
]

describe('v4 dialog content overflow', () => {
  it.each(dialogContentFiles)('%s stays scrollable in short viewports', async (file) => {
    const content = await readFile(join(process.cwd(), file), 'utf8')

    expect(content).toContain('max-h-[calc(100dvh-2rem)]')
    expect(content).toContain('overflow-y-auto')
  })
})
