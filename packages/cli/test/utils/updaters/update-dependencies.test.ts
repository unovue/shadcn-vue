import { addDependency, addDevDependency, detectPackageManager } from 'nypm'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { spinner } from '../../../src/utils/spinner'
import { updateDependencies } from '../../../src/utils/updaters/update-dependencies'

vi.mock('nypm', () => ({
  addDependency: vi.fn(),
  addDevDependency: vi.fn(),
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
    delete process.env.npm_config_user_agent

    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'pnpm',
      command: 'pnpm',
    })
    vi.mocked(addDependency).mockResolvedValue({} as any)
    vi.mocked(addDevDependency).mockResolvedValue({} as any)

    const mockSpinner = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
    }
    vi.mocked(spinner).mockReturnValue(mockSpinner as any)
  })

  it('installs de-duplicated dependencies with nypm', async () => {
    await updateDependencies(
      ['@tanstack/vue-table', 'reka-ui', 'reka-ui'],
      ['tailwindcss', 'tailwindcss'],
      config,
      { silent: false },
    )

    expect(addDependency).toHaveBeenCalledWith(
      ['@tanstack/vue-table', 'reka-ui'],
      {
        cwd: '/test/project',
        packageManager: 'pnpm',
        silent: false,
      },
    )
    expect(addDevDependency).toHaveBeenCalledWith(['tailwindcss'], {
      cwd: '/test/project',
      packageManager: 'pnpm',
      silent: false,
    })
  })

  it('falls back to the dlx package manager user agent', async () => {
    vi.mocked(detectPackageManager).mockResolvedValue(undefined)
    process.env.npm_config_user_agent = 'pnpm/11.5.0 npm/? node/v24.11.1'

    await updateDependencies(['@tanstack/vue-table'], [], config, {
      silent: true,
    })

    expect(addDependency).toHaveBeenCalledWith(['@tanstack/vue-table'], {
      cwd: '/test/project',
      packageManager: 'pnpm',
      silent: true,
    })
  })

  it('skips package manager detection when there is nothing to install', async () => {
    await updateDependencies([], [], config, { silent: true })

    expect(detectPackageManager).not.toHaveBeenCalled()
    expect(addDependency).not.toHaveBeenCalled()
    expect(addDevDependency).not.toHaveBeenCalled()
  })
})
