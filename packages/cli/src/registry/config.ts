import type { Config } from "@/src/utils/get-config"
import deepmerge from "deepmerge"
import { BUILTIN_REGISTRIES, FALLBACK_STYLE } from "@/src/registry/constants"
import { configSchema } from "@/src/schema"
import { createConfig } from "@/src/utils/get-config"

const DEFAULT_BASE = "reka"

// Visual styles that are transformations of the base style
// These styles don't have separate registry entries - they use new-york-v4
// and apply CSS class transformations during installation
const VISUAL_STYLES = ["vega", "nova", "maia", "lyra", "mira", "luma"]

/**
 * Resolves the registry style to use for fetching components.
 * Visual styles (vega, nova, maia, lyra, mira) are mapped to new-york-v4.
 * The original style is preserved in config for applying transformations.
 */
export function resolveRegistryStyle(style: string | undefined): string {
  if (!style) {
    return FALLBACK_STYLE
  }

  // Extract base style name (remove version suffix like -v4)
  const baseStyle = style.split("-")[0]

  // Visual styles map to new-york-v4 for registry fetching
  if (VISUAL_STYLES.includes(baseStyle)) {
    return FALLBACK_STYLE
  }

  return style
}

function resolveStyleFromConfig(config: Partial<Config> | Config) {
  if (!config.style) {
    return FALLBACK_STYLE
  }

  // Check if we should use new-york-v4 for Tailwind v4.
  // We assume that if tailwind.config is empty, we're using Tailwind v4.
  if (config.style === "new-york" && config.tailwind?.config === "") {
    return FALLBACK_STYLE
  }

  return config.style
}

function resolveBaseFromConfig(config: Partial<Config> | Config) {
  if (!config.base) {
    return DEFAULT_BASE
  }

  return config.base
}

export function configWithDefaults(config?: Partial<Config> | Config) {
  const baseConfig = createConfig({
    style: FALLBACK_STYLE,
    base: DEFAULT_BASE,
    registries: BUILTIN_REGISTRIES,
  })

  if (!config) {
    return baseConfig
  }

  return configSchema.parse(
    deepmerge(baseConfig, {
      ...config,
      style: resolveStyleFromConfig(config),
      base: resolveBaseFromConfig(config),
      registries: { ...BUILTIN_REGISTRIES, ...config.registries },
    }),
  )
}
