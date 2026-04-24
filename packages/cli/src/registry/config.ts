import type { Config } from "@/src/utils/get-config"
import deepmerge from "deepmerge"
import { BUILTIN_REGISTRIES, FALLBACK_STYLE } from "@/src/registry/constants"
import { configSchema } from "@/src/schema"
import { createConfig } from "@/src/utils/get-config"

// Visual styles correspond to per-style published registries at
// `public/r/styles/{base}-{style}/<comp>.json`. They're produced by the
// design-system codegen pipeline. The CLI's init/create flow asks the user
// for a base + visual style separately, then composes them into a single
// identifier (e.g. `reka-luma`) which is what gets written to components.json
// and used directly in fetch URLs — matching shadcn-ui's model.
const VISUAL_STYLES = new Set(["vega", "nova", "maia", "lyra", "mira", "luma"])

/**
 * Composes a base + visual style choice into the canonical style identifier
 * stored in `components.json`. For visual styles, returns `${base}-${style}`
 * (e.g. `"reka-luma"`). For non-visual styles like `"new-york-v4"`, returns
 * the style unchanged.
 */
export function composeStyleId(
  base: string | undefined,
  style: string | undefined,
): string {
  if (!style) {
    return FALLBACK_STYLE
  }

  // Already a full identifier — pass through.
  if (style.includes("-") || !VISUAL_STYLES.has(style)) {
    return style
  }

  return `${base || "reka"}-${style}`
}

/**
 * Resolves the registry style segment used in fetch URLs like
 * `styles/{registryStyle}/<comp>.json`.
 *
 * The `style` field in `components.json` is the **full** style identifier
 * (e.g. `"reka-luma"`, `"new-york-v4"`), matching shadcn-ui's model. We just
 * pass it through, falling back to `FALLBACK_STYLE` when unset.
 */
export function resolveRegistryStyle(style: string | undefined): string {
  return style || FALLBACK_STYLE
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

export function configWithDefaults(config?: Partial<Config> | Config) {
  const baseConfig = createConfig({
    style: FALLBACK_STYLE,
    registries: BUILTIN_REGISTRIES,
  })

  if (!config) {
    return baseConfig
  }

  return configSchema.parse(
    deepmerge(baseConfig, {
      ...config,
      style: resolveStyleFromConfig(config),
      registries: { ...BUILTIN_REGISTRIES, ...config.registries },
    }),
  )
}
