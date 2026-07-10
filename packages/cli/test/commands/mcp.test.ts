import { execa } from 'execa'
import { detectPackageManager } from 'nypm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mcp } from '../../src/commands/mcp'
import { getConfig } from '../../src/utils/get-config'
import { handleError } from '../../src/utils/handle-error'

vi.mock('node:fs', () => ({
  promises: {
    readFile: vi.fn().mockRejectedValue(new Error('not found')),
    writeFile: vi.fn(),
  },
}))

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

vi.mock('fs-extra', () => ({
  default: {
    ensureDir: vi.fn(),
  },
}))

vi.mock('nypm', () => ({
  detectPackageManager: vi.fn(),
}))

vi.mock('@/src/mcp', () => ({
  server: {
    connect: vi.fn(),
  },
}))

vi.mock('@/src/utils/get-config', () => ({
  getConfig: vi.fn(),
}))

vi.mock('@/src/utils/handle-error', () => ({
  handleError: vi.fn(),
}))

vi.mock('@/src/utils/logger', () => ({
  logger: {
    break: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    log: vi.fn(),
    success: vi.fn(),
  },
}))

vi.mock('@/src/utils/spinner', () => ({
  spinner: vi.fn(() => {
    const instance = {
      start: vi.fn(),
      succeed: vi.fn(),
    }
    instance.start.mockReturnValue(instance)
    return instance
  }),
}))

describe('mcp init', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getConfig).mockResolvedValue(null)
    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'deno',
      command: 'deno',
    })
    vi.mocked(execa).mockResolvedValue({} as any)
  })

  it('prefixes npm dependencies when installing with deno', async () => {
    await mcp.parseAsync([
      'node',
      'mcp',
      '--cwd',
      '/test/project',
      'init',
      '--client',
      'vscode',
    ])

    expect(handleError).not.toHaveBeenCalled()
    expect(execa).toHaveBeenCalledWith(
      'deno',
      ['add', '-D', 'npm:shadcn-vue@latest'],
      { cwd: '/test/project' },
    )
  })
})
