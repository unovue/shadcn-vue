import { execa } from 'execa'
import { detectPackageManager } from 'nypm'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { spinner } from '../../../src/utils/spinner'
import { updateDependencies } from '../../../src/utils/updaters/update-dependencies'

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

vi.mock('nypm', () => ({
  detectPackageManager: vi.fn(),
}))

vi.mock('../../../src/utils/spinner', () => ({
  spinner: vi.fn(),
}))

const config = {
  resolvedPaths: {
    cwd: '/test/project',
  },
} as any

describe('updateDependencies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'pnpm',
      command: 'pnpm',
    })
    vi.mocked(execa).mockResolvedValue({} as any)

    const mockSpinner = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
    }
    vi.mocked(spinner).mockReturnValue(mockSpinner as any)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('installs de-duplicated dependencies with pnpm', async () => {
    await updateDependencies(
      ['@tanstack/vue-table', 'reka-ui', 'reka-ui'],
      ['tailwindcss', 'tailwindcss'],
      config,
      { silent: false },
    )

    expect(execa).toHaveBeenCalledWith(
      'pnpm',
      ['add', '@tanstack/vue-table', 'reka-ui'],
      { cwd: '/test/project' },
    )
    expect(execa).toHaveBeenCalledWith(
      'pnpm',
      ['add', '-D', 'tailwindcss'],
      { cwd: '/test/project' },
    )
  })

  it('uses the package manager that invoked the CLI', async () => {
    vi.mocked(detectPackageManager).mockResolvedValue(undefined)
    vi.stubEnv(
      'npm_config_user_agent',
      'pnpm/11.5.0 npm/? node/v24.11.1',
    )

    await updateDependencies(['reka-ui'], [], config, { silent: true })

    expect(execa).toHaveBeenCalledWith('pnpm', ['add', 'reka-ui'], {
      cwd: '/test/project',
    })
  })

  it('uses npm install commands', async () => {
    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'npm',
      command: 'npm',
    })

    await updateDependencies(['reka-ui'], ['tailwindcss'], config, {
      silent: true,
    })

    expect(execa).toHaveBeenCalledWith('npm', ['install', 'reka-ui'], {
      cwd: '/test/project',
    })
    expect(execa).toHaveBeenCalledWith(
      'npm',
      ['install', '-D', 'tailwindcss'],
      { cwd: '/test/project' },
    )
  })

  it('prefixes Deno dependencies with npm:', async () => {
    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'deno',
      command: 'deno',
    })

    await updateDependencies(['reka-ui'], ['tailwindcss'], config, {
      silent: true,
    })

    expect(execa).toHaveBeenCalledWith('deno', ['add', 'npm:reka-ui'], {
      cwd: '/test/project',
    })
    expect(execa).toHaveBeenCalledWith(
      'deno',
      ['add', '-D', 'npm:tailwindcss'],
      { cwd: '/test/project' },
    )
  })

  it('skips package manager detection when there is nothing to install', async () => {
    await updateDependencies([], [], config, { silent: true })

    expect(detectPackageManager).not.toHaveBeenCalled()
    expect(execa).not.toHaveBeenCalled()
  })
})
