import { isPresetCode } from 'shadcn-vue/preset'

const PRESET_FLAG_PATTERN = /^--preset\s+(\S+)$/i

export function parsePresetInput(value: string): string | null {
  const input = value.trim()

  if (!input)
    return null

  const preset = input.match(PRESET_FLAG_PATTERN)?.[1]?.trim() ?? input

  return isPresetCode(preset) ? preset : null
}
