import type { z } from 'zod'
import type { registryConfigSchema } from '@/src/registry/schema'
import open from 'open'
import prompts from 'prompts'
import { getRegistryItems } from '@/src/registry/api'
import { buildUrlAndHeadersForRegistryItem } from '@/src/registry/builder'
import { configWithDefaults } from '@/src/registry/config'
import { SHADCN_VUE_URL } from '@/src/registry/constants'
import { isUrl } from '@/src/registry/utils'
import { createConfig } from '@/src/utils/get-config'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { ensureRegistriesInConfig } from '@/src/utils/registries'

// Ported from shadcn-ui/packages/shadcn/src/preset/presets.ts.
// Named presets available via `init --preset <name>`.
export const DEFAULT_PRESETS = {
  vega: {
    title: 'Vega',
    description: 'Lucide / Inter',
    base: 'reka',
    style: 'vega',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'lucide',
    font: 'inter',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
  nova: {
    title: 'Nova',
    description: 'Lucide / Geist',
    base: 'reka',
    style: 'nova',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'lucide',
    font: 'geist-sans',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
  maia: {
    title: 'Maia',
    description: 'Hugeicons / Figtree',
    base: 'reka',
    style: 'maia',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'hugeicons',
    font: 'figtree',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
  lyra: {
    title: 'Lyra',
    description: 'Phosphor / JetBrains Mono',
    base: 'reka',
    style: 'lyra',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'phosphor',
    font: 'jetbrains-mono',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
  mira: {
    title: 'Mira',
    description: 'Hugeicons / Inter',
    base: 'reka',
    style: 'mira',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'hugeicons',
    font: 'inter',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
  luma: {
    title: 'Luma',
    description: 'Lucide / Inter',
    base: 'reka',
    style: 'luma',
    baseColor: 'neutral',
    theme: 'neutral',
    iconLibrary: 'lucide',
    font: 'inter',
    fontHeading: 'inherit',
    menuAccent: 'subtle' as const,
    menuColor: 'default' as const,
    radius: 'default',
    rtl: false,
  },
}

export function resolveCreateUrl(
  searchParams?: Partial<{
    command: 'create' | 'init'
    template: string
    rtl: boolean
    pointer: boolean
    base: string
  }>,
) {
  const url = new URL(`${SHADCN_VUE_URL}/create`)
  const { rtl, pointer, ...params } = searchParams ?? {}

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  }

  if (rtl) {
    url.searchParams.set('rtl', 'true')
  }

  if (pointer) {
    url.searchParams.set('pointer', 'true')
  }

  return url.toString()
}

export async function promptToOpenPresetBuilder(options: {
  createUrl: string
  followUp: string
  prompt?: boolean
}) {
  logger.break()
  logger.log(
    `  Build your custom preset on ${highlighter.info(options.createUrl)}`,
  )
  logger.log(`  ${options.followUp}`)
  logger.break()

  if (options.prompt === false) {
    return
  }

  const { proceed } = await prompts({
    type: 'confirm',
    name: 'proceed',
    message: 'Open in browser?',
    initial: true,
  })

  if (proceed) {
    await open(options.createUrl)
  }
}

export function resolveInitUrl(
  preset: {
    base: string
    style: string
    baseColor: string
    theme: string
    iconLibrary: string
    font: string
    fontHeading?: string
    rtl: boolean
    menuAccent: string
    menuColor: string
    radius: string
  },
  options?: { template?: string, preset?: string, pointer?: boolean },
) {
  const params = new URLSearchParams({
    base: preset.base,
    style: preset.style,
    baseColor: preset.baseColor,
    theme: preset.theme,
    iconLibrary: preset.iconLibrary,
    font: preset.font,
    rtl: String(preset.rtl ?? false),
    menuAccent: preset.menuAccent,
    menuColor: preset.menuColor,
    radius: preset.radius,
  })

  if (preset.fontHeading && preset.fontHeading !== 'inherit') {
    params.set('fontHeading', preset.fontHeading)
  }

  // Pass the original preset code so the server can apply
  // version-specific backward-compat fixups.
  if (options?.preset) {
    params.set('preset', options.preset)
  }

  if (options?.template) {
    params.set('template', options.template)
  }

  if (options?.pointer) {
    params.set('pointer', 'true')
  }

  // Signal the server to record this init run.
  params.set('track', '1')

  return `${SHADCN_VUE_URL}/init?${params.toString()}`
}

export async function promptForBase() {
  // shadcn-vue currently has a single base ("reka"). This is a no-op prompt
  // kept for parity with shadcn-ui so the call site code mirrors directly.
  return 'reka' as const
}

export type PromptForPresetResult
  = | { kind: 'preset', url: string, base: string }
    | { kind: 'custom' }
    | { kind: 'cancelled' }

export async function promptForPreset(options: {
  rtl: boolean
  pointer?: boolean
  base: string
  template?: string
}): Promise<PromptForPresetResult> {
  const presets = Object.entries(DEFAULT_PRESETS)

  const { selectedPreset } = await prompts({
    type: 'select',
    name: 'selectedPreset',
    message: `Which ${highlighter.info('preset')} would you like to use?`,
    choices: [
      ...presets.map(([name, preset]) => ({
        title: preset.title,
        description: preset.description,
        value: name,
      })),
      {
        title: 'Custom',
        description: `Build your own at ${highlighter.info(`${SHADCN_VUE_URL}/create`)}`,
        value: 'custom',
      },
    ],
  })

  if (!selectedPreset) {
    return { kind: 'cancelled' }
  }

  if (selectedPreset === 'custom') {
    const createUrl = resolveCreateUrl({
      command: 'init',
      rtl: options.rtl,
      pointer: options.pointer,
      base: options.base,
      ...(options.template && { template: options.template }),
    })
    await promptToOpenPresetBuilder({
      createUrl,
      followUp: `Then ${highlighter.info('copy and run the command')} from shadcn-vue.com.`,
    })
    return { kind: 'custom' }
  }

  const preset = DEFAULT_PRESETS[selectedPreset as keyof typeof DEFAULT_PRESETS]
  if (!preset) {
    return { kind: 'cancelled' }
  }

  return {
    kind: 'preset',
    url: resolveInitUrl(
      { ...preset, base: options.base, rtl: options.rtl },
      {
        template: options.template,
        pointer: options.pointer,
      },
    ),
    base: options.base,
  }
}

export async function resolveRegistryBaseConfig(
  initUrl: string,
  cwd: string,
  options?: {
    registries?: z.infer<typeof registryConfigSchema>
  },
) {
  // Use a shadow config to fetch the registry:base item.
  let shadowConfig = configWithDefaults(
    createConfig({
      resolvedPaths: {
        cwd,
      },
      ...(options?.registries && { registries: options.registries }),
    }),
  )

  // Ensure all registries used in the init URL are configured.
  const { config: updatedConfig } = await ensureRegistriesInConfig(
    [initUrl],
    shadowConfig,
    {
      silent: true,
      writeFile: false,
    },
  )
  shadowConfig = updatedConfig

  // This forces a shadowConfig validation early in the process.
  buildUrlAndHeadersForRegistryItem(initUrl, shadowConfig)

  const [item] = await getRegistryItems([initUrl], {
    config: shadowConfig,
    useCache: true,
  })

  // Fail fast: if the init URL doesn't resolve to a registry:base item with a
  // config, silently falling back to defaults would mask broken preset
  // propagation — exactly the bug this flow was introduced to fix.
  if (item?.type !== 'registry:base' || !item.config) {
    throw new Error(
      `Expected a registry:base item with a config from ${initUrl}, got ${
        item?.type ?? 'nothing'
      }.`,
    )
  }
  const registryBaseConfig = item.config as Record<string, unknown>

  // Overlay URL-derived params onto the returned config. The server-side
  // `buildRegistryBase` may not emit every preset field (older deployments
  // don't know about `fontHeading` for example), but the CLI built the init
  // URL locally with every field it cares about. Filling missing fields from
  // the URL makes the preset flow work end-to-end without waiting on a
  // server redeploy.
  if (isUrl(initUrl)) {
    const params = new URL(initUrl).searchParams
    const fontHeading = params.get('fontHeading')
    if (
      fontHeading
      && fontHeading !== 'inherit'
      && fontHeading !== params.get('font')
      && !registryBaseConfig.fontHeading
    ) {
      registryBaseConfig.fontHeading = fontHeading
    }
  }

  // Strip the track param so subsequent fetches don't re-trigger tracking.
  let cleanUrl = initUrl
  if (isShadcnVueInitUrl(initUrl)) {
    const url = new URL(initUrl)
    url.searchParams.delete('track')
    cleanUrl = url.toString()
  }

  return {
    registryBaseConfig,
    installStyleIndex: item?.extends !== 'none',
    url: cleanUrl,
  }
}

function isShadcnVueInitUrl(url: string) {
  if (!isUrl(url))
    return false
  const parsed = new URL(url)
  const trusted = new URL(SHADCN_VUE_URL)
  return parsed.origin === trusted.origin && parsed.pathname === '/init'
}

export { isUrl }
