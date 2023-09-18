import path from 'node:path'
import { existsSync } from 'node:fs'
import { cosmiconfig } from 'cosmiconfig'
import type { ConfigLoaderResult } from 'tsconfig-paths'
import { loadConfig } from 'tsconfig-paths'
import * as z from 'zod'
import { resolveImport } from '@/src/utils/resolve-import'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_TAILWIND_CSS = 'src/assets/index.css'
export const DEFAULT_TAILWIND_CSS_NUXT = 'assets/style/tailwind.css'
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js'
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate'

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.boolean().default(false),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
    }),
    framework: z.string(),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
    }),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema
  .extend({
    resolvedPaths: z.object({
      tailwindConfig: z.string(),
      tailwindCss: z.string(),
      utils: z.string(),
      components: z.string(),
    }),
  })

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config)
    return null

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  let tsConfig: ConfigLoaderResult | undefined
  let tsConfigPath = path.resolve(
    cwd,
    config.framework === 'nuxt' ? '.nuxt/tsconfig.json' : './tsconfig.json',
  )

  if (config.typescript) {
    // Read tsconfig.json.
    tsConfig = loadConfig(tsConfigPath)
    // In new Vue project, tsconfig has references to tsconfig.app.json, which is causing the path not resolving correctly
    // If no paths were found, try to load tsconfig.app.json.
    if ('paths' in tsConfig && Object.keys(tsConfig.paths).length === 0) {
      tsConfigPath = path.resolve(cwd, './tsconfig.app.json')
      if (existsSync(tsConfigPath))
        tsConfig = loadConfig(tsConfigPath)
    }
  }
  else {
    tsConfigPath = path.resolve(cwd, './jsconfig.json')
    tsConfig = loadConfig(tsConfigPath)
  }

  if (tsConfig.resultType === 'failed') {
    throw new Error(
        `Failed to load ${tsConfigPath}. ${tsConfig.message ?? ''}`.trim(),
    )
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult)
      return null

    return rawConfigSchema.parse(configResult.config)
  }
  catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
