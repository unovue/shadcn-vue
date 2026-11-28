import consola from 'consola'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getShadcnRegistryIndex } from '@/src/registry/api'
import { SHADCN_VUE_URL } from '@/src/registry/constants'
import { getConfig } from '@/src/utils/get-config'
import { docs } from './docs'

const bases = vi.hoisted(() => [
  { name: 'reka', label: 'Reka UI', description: 'Reka', dependencies: ['reka-ui'] },
  { name: 'vase', label: 'Vase UI', description: 'Vase', dependencies: ['@vase-ui/vue'] },
])

vi.mock('@/src/registry/constants', async importOriginal => ({
  ...(await importOriginal<typeof import('@/src/registry/constants')>()),
  BASES: bases,
}))

vi.mock('@/src/registry/api', async importOriginal => ({
  ...(await importOriginal<typeof import('@/src/registry/api')>()),
  getShadcnRegistryIndex: vi.fn(),
}))

vi.mock('@/src/utils/get-config', async importOriginal => ({
  ...(await importOriginal<typeof import('@/src/utils/get-config')>()),
  getConfig: vi.fn(),
}))

vi.mock('consola', () => ({ default: { log: vi.fn() } }))

vi.mock('@/src/utils/handle-error', () => ({
  handleError: vi.fn(),
}))

vi.mock('@/src/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    log: vi.fn(),
    info: vi.fn(),
    break: vi.fn(),
  },
}))

const docsUrl = `${SHADCN_VUE_URL}/docs/components/button`

describe('docs command', () => {
  async function runDocs(...args: string[]) {
    await docs.parseAsync([...args, '--json'], { from: 'user' })

    return JSON.parse(vi.mocked(consola.log).mock.calls.at(-1)![0] as string)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getShadcnRegistryIndex).mockResolvedValue([{ name: 'button' }] as never)
  })

  it('uses the base of the project style and appends ?base= for non-default bases', async () => {
    vi.mocked(getConfig).mockResolvedValue({ style: 'reka-nova' } as never)
    expect(await runDocs('button')).toEqual({
      base: 'reka',
      results: [{ component: 'button', base: 'reka', links: { docs: docsUrl } }],
    })

    vi.mocked(getConfig).mockResolvedValue({ style: 'vase-nova' } as never)
    expect(await runDocs('button')).toEqual({
      base: 'vase',
      results: [{ component: 'button', base: 'vase', links: { docs: `${docsUrl}?base=vase` } }],
    })
  })

  it('prefers registry meta.links for the resolved base', async () => {
    vi.mocked(getShadcnRegistryIndex).mockResolvedValue([
      { name: 'button', meta: { links: { vase: { docs: 'https://example.com/vase/button' } } } },
    ] as never)

    vi.mocked(getConfig).mockResolvedValue({ style: 'vase-nova' } as never)
    expect(await runDocs('button')).toEqual({
      base: 'vase',
      results: [{ component: 'button', base: 'vase', links: { docs: 'https://example.com/vase/button' } }],
    })

    vi.mocked(getConfig).mockResolvedValue({ style: 'reka-nova' } as never)
    expect(await runDocs('button')).toEqual({
      base: 'reka',
      results: [{ component: 'button', base: 'reka', links: { docs: docsUrl } }],
    })
  })

  it('falls back to the first base without a composed project style', async () => {
    vi.mocked(getConfig).mockResolvedValue(null as never)
    expect((await runDocs('button')).base).toBe('reka')

    vi.mocked(getConfig).mockResolvedValue({ style: 'new-york-v4' } as never)
    expect((await runDocs('button')).base).toBe('reka')
  })

  it('lets --base override the project style', async () => {
    vi.mocked(getConfig).mockResolvedValue({ style: 'reka-nova' } as never)

    expect((await runDocs('button', '--base', 'vase')).base).toBe('vase')
  })
})
