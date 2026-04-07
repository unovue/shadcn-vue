import type { MockInstance } from 'vitest'
import fs from 'fs-extra'
import { downloadTemplate } from 'giget'
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
vi.mock('giget')
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
    vi.mocked(fs.copy).mockResolvedValue(undefined)
    vi.mocked(fs.readJson).mockResolvedValue({ name: 'my-vue-app' })
    vi.mocked(fs.writeJson).mockResolvedValue(undefined)

    // Mock giget
    vi.mocked(downloadTemplate).mockResolvedValue({} as any)

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
    delete process.env.SHADCN_TEMPLATE_DIR
  })

  it('should download template via giget for nuxt', async () => {
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

    expect(downloadTemplate).toHaveBeenCalledWith(
      'github:unovue/shadcn-vue/templates/nuxt#dev',
      { dir: '/test/my-app' },
    )
  })

  it('should download template via giget for vite', async () => {
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

    expect(downloadTemplate).toHaveBeenCalledWith(
      'github:unovue/shadcn-vue/templates/vite#dev',
      { dir: '/test/my-vite-app' },
    )
  })

  it('should download template via giget for astro', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'astro', name: 'my-astro-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({
      projectPath: '/test/my-astro-app',
      projectName: 'my-astro-app',
      template: TEMPLATES.astro,
    })

    expect(downloadTemplate).toHaveBeenCalledWith(
      'github:unovue/shadcn-vue/templates/astro#dev',
      { dir: '/test/my-astro-app' },
    )
  })

  it('should download template via giget for laravel', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'laravel', name: 'my-laravel-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({
      projectPath: '/test/my-laravel-app',
      projectName: 'my-laravel-app',
      template: TEMPLATES.laravel,
    })

    expect(downloadTemplate).toHaveBeenCalledWith(
      'github:unovue/shadcn-vue/templates/laravel#dev',
      { dir: '/test/my-laravel-app' },
    )
  })

  it('should use local template dir when SHADCN_TEMPLATE_DIR is set', async () => {
    process.env.SHADCN_TEMPLATE_DIR = '/local/templates'
    vi.mocked(prompts).mockResolvedValue({ type: 'vite', name: 'my-app' })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(fs.copy).toHaveBeenCalledWith('/local/templates/vite', '/test/my-app')
    expect(downloadTemplate).not.toHaveBeenCalled()
  })

  it('should update package.json name after download', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'custom-name' })
    vi.mocked(fs.readJson).mockResolvedValue({ name: 'my-vue-app', private: true })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(fs.writeJson).toHaveBeenCalledWith(
      '/test/custom-name/package.json',
      { name: 'custom-name', private: true },
      { spaces: 2 },
    )
  })

  it('should run git init after download', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(x).toHaveBeenCalledWith(
      'git',
      ['init'],
      { nodeOptions: { cwd: '/test/my-app' } },
    )
  })

  it('should install dependencies after download', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(x).toHaveBeenCalledWith(
      'npm',
      ['install'],
      { throwOnError: true, nodeOptions: { cwd: '/test/my-app' } },
    )
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
