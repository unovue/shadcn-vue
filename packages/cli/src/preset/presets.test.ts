import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { promptForBase } from './presets'

const bases = vi.hoisted(() => [
  { name: 'reka', label: 'Reka UI', description: 'Reka', dependencies: ['reka-ui'] },
])

vi.mock('@/src/registry/constants', async importOriginal => ({
  ...(await importOriginal<typeof import('@/src/registry/constants')>()),
  BASES: bases,
}))

vi.mock('prompts', () => ({ default: vi.fn() }))

vi.mock('@/src/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    log: vi.fn(),
    info: vi.fn(),
    break: vi.fn(),
  },
}))

describe('promptForBase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns the only base without a prompt', async () => {
    expect(await promptForBase()).toBe('reka')
    expect(prompts).not.toHaveBeenCalled()
  })

  describe('with several bases', () => {
    beforeEach(() => {
      bases.push({ name: 'vase', label: 'Vase UI', description: 'Vase', dependencies: ['@vase-ui/vue'] })
    })

    afterEach(() => {
      bases.length = 1
    })

    it('asks which base to use', async () => {
      vi.mocked(prompts).mockResolvedValue({ base: 'vase' })

      expect(await promptForBase()).toBe('vase')

      const [question] = vi.mocked(prompts).mock.calls[0] as unknown as [{ choices: { value: string }[] }]
      expect(question.choices.map(choice => choice.value)).toEqual(['reka', 'vase'])
    })

    it('exits when the user cancels the prompt', async () => {
      vi.mocked(prompts).mockResolvedValue({})
      const exit = vi.spyOn(process, 'exit').mockImplementation((() => {
        throw new Error('process.exit called')
      }) as never)

      try {
        await expect(promptForBase()).rejects.toThrow('process.exit called')
        expect(exit).toHaveBeenCalledWith(1)
      }
      finally {
        exit.mockRestore()
      }
    })
  })
})
