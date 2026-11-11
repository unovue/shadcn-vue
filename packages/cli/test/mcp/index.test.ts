import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { detectPackageManager } from 'nypm'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { server } from '../../src/mcp'
import { searchRegistries } from '../../src/registry'

vi.mock('nypm', () => ({ detectPackageManager: vi.fn() }))
vi.mock('@/src/registry', () => ({
  searchRegistries: vi.fn(),
  getRegistryItems: vi.fn(),
}))
vi.mock('@/src/registry/api', () => ({
  getRegistriesConfig: vi.fn().mockResolvedValue({ registries: { '@shadcn': 'https://example.com/r/{name}.json' } }),
}))

describe('mcp search and list add commands', () => {
  const client = new Client({ name: 'mcp-test', version: '1.0.0' })

  beforeAll(async () => {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
    await server.connect(serverTransport)
    await client.connect(clientTransport)
  })

  beforeEach(() => {
    vi.mocked(detectPackageManager).mockResolvedValue({ name: 'pnpm', command: 'pnpm' })
    vi.mocked(searchRegistries).mockResolvedValue({
      pagination: { total: 5, offset: 1, limit: 2, hasMore: true },
      items: [
        { name: 'button', type: 'registry:ui', description: 'A button', registry: '@shadcn', addCommandArgument: '@shadcn/button' },
        { name: 'card', type: 'registry:ui', registry: '@shadcn', addCommandArgument: '@shadcn/card' },
      ],
    })
  })

  afterAll(async () => {
    await client.close()
    await server.close()
  })

  it.each(['search_items_in_registries', 'list_items_in_registries'])(
    '%s resolves add commands and preserves item order and pagination',
    async (name) => {
      const result = await client.callTool({
        name,
        arguments: { registries: ['@shadcn'], query: 'button', limit: 2, offset: 1 },
      })

      expect(result.isError).not.toBe(true)
      expect(result.content).toEqual([{
        type: 'text',
        text: expect.stringContaining('- button (registry:ui) - A button [@shadcn] \n  Add command: `pnpm shadcn-vue add @shadcn/button`\n\n- card (registry:ui) [@shadcn] \n  Add command: `pnpm shadcn-vue add @shadcn/card`'),
      }])
      expect(result.content).toEqual([{
        type: 'text',
        text: expect.stringContaining('Showing items 2-3 of 5:'),
      }])
      expect(result.content).toEqual([{
        type: 'text',
        text: expect.stringContaining('More items available. Use offset: 3 to see the next page.'),
      }])
    },
  )

  it.each(['search_items_in_registries', 'list_items_in_registries'])(
    '%s returns command-generation failures as MCP errors',
    async (name) => {
      vi.mocked(detectPackageManager).mockRejectedValue(new Error('Package manager detection failed'))

      const result = await client.callTool({
        name,
        arguments: { registries: ['@shadcn'], query: 'button' },
      })

      expect(result).toMatchObject({
        isError: true,
        content: [{ type: 'text', text: 'Error: Package manager detection failed' }],
      })
    },
  )
})
