import type { MockInstance } from 'vitest'
import fs from 'fs-extra'
import prompts from 'prompts'
import { x } from 'tinyexec'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { createProject, TEMPLATES } from '../../src/utils/create-project'
import { spinner } from '../../src/utils/spinner'

// Mock dependencies
vi.mock('fs-extra')
vi.mock('tinyexec')
vi.mock('prompts')
vi.mock('nypm', () => ({
  detectPackageManager: vi.fn().mockResolvedValue({ name: 'npm' }),
}))
vi.mock('@/src/utils/spinner')
vi.mock('@/src/utils/logger', () => ({
  logger: {
    break: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))

describe('createProject', () => {
  let mockExit: MockInstance

  beforeEach(() => {
    vi.clearAllMocks()

    // Reset all fs mocks
    vi.mocked(fs.access).mockResolvedValue(undefined)
    vi.mocked(fs.existsSync).mockReturnValue(false)
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined)
    vi.mocked(fs.writeFile).mockResolvedValue(undefined)

    // Mock x (tinyexec) to resolve immediately without actual execution
    vi.mocked(x).mockResolvedValue({ stdout: '', stderr: '' } as any)

    // Reset prompts mock
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    // Mock spinner
    const mockSpinner = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
      fail: vi.fn().mockReturnThis(),
      stop: vi.fn().mockReturnThis(),
    }
    vi.mocked(spinner).mockReturnValue(mockSpinner as any)
  })

  afterEach(() => {
    vi.resetAllMocks()
    mockExit?.mockRestore()
  })

  it('should create a Nuxt project with default options', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({
      projectPath: '/test/my-app',
      projectName: 'my-app',
      template: TEMPLATES.nuxt,
    })

    expect(x).toHaveBeenCalledWith(
      'npx',
      expect.arrayContaining(['nuxi@latest', 'init', '/test/my-app']),
      expect.any(Object),
    )
  })

  it('should create a Vite project when selected', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'vite', name: 'my-vite-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({
      projectPath: '/test/my-vite-app',
      projectName: 'my-vite-app',
      template: TEMPLATES.vite,
    })
  })

  it('should throw error if project path already exists', async () => {
    vi.mocked(fs.existsSync).mockImplementation((path: any) => {
      return path.toString().includes('existing-app/package.json')
    })
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'existing-app' })

    mockExit = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it('should throw error if path is not writable', async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error('Permission denied'))
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    mockExit = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
