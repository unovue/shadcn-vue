import type { Config } from "@/src/utils/get-config"
import deepmerge from "deepmerge"
import { BUILTIN_REGISTRIES, FALLBACK_STYLE } from "@/src/registry/constants"
import { configSchema } from "@/src/schema"
import { createConfig } from "@/src/utils/get-config"

const DEFAULT_BASE = "reka"

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
