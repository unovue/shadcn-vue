import type { DesignSystemConfig } from '@/registry/config'
import { decodePreset, isPresetCode } from 'shadcn-vue/preset'
import { designSystemConfigSchema } from '@/registry/config'

// Parses design system config from URL search params (either a `preset` code
// or an explicit param set).
export function parseDesignSystemConfig(
  searchParams: Record<string, string | undefined>,
) {
  let configInput: Record<string, unknown>
  const presetParam = searchParams.preset

  if (presetParam && isPresetCode(presetParam)) {
    const decoded = decodePreset(presetParam)
    if (!decoded) {
      return { success: false as const, error: 'Invalid preset code' }
    }
    configInput = {
      ...decoded,
      base: searchParams.base ?? decoded.base,
      template: searchParams.template,
      rtl: searchParams.rtl === 'true',
      pointer: searchParams.pointer === 'true',
    }
  }
  else {
    configInput = {
      base: searchParams.base,
      style: searchParams.style,
      iconLibrary: searchParams.iconLibrary,
      baseColor: searchParams.baseColor,
      theme: searchParams.theme,
      font: searchParams.font,
      fontHeading: searchParams.fontHeading,
      menuAccent: searchParams.menuAccent,
      menuColor: searchParams.menuColor,
      radius: searchParams.radius,
      template: searchParams.template,
      rtl: searchParams.rtl === 'true',
      pointer: searchParams.pointer === 'true',
    }
  }

  const result = designSystemConfigSchema.safeParse(configInput)

  if (!result.success) {
    return { success: false as const, error: result.error.issues[0]!.message }
  }

  return {
    success: true as const,
    data: {
      ...result.data,
      rtl: configInput.rtl === true,
      pointer: configInput.pointer === true,
    } as DesignSystemConfig & { rtl: boolean, pointer: boolean },
  }
}
