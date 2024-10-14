import type { ConfigLoaderResult } from 'tsconfig-paths'
import { existsSync } from 'node:fs'
import { resolveImport } from '@/src/utils/resolve-import'
import { loadConfig as c12LoadConfig } from 'c12'
import path from 'pathe'
import { loadConfig } from 'tsconfig-paths'
import { z } from 'zod'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_TYPESCRIPT_CONFIG = './tsconfig.json'
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js'
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate'

export const TAILWIND_CSS_PATH = {
  nuxt: 'assets/css/tailwind.css',
  vite: 'src/assets/index.css',
  laravel: 'resources/css/app.css',
  astro: 'src/styles/globals.css',
}

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.boolean().default(true),
    tsConfigPath: z.string().default(DEFAULT_TYPESCRIPT_CONFIG),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().optional(),
    }),
    framework: z.string().default('Vite'),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().default('').optional(),
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
      ui: z.string(),
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
    config.tsConfigPath,
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
    tsConfigPath = config.tsConfigPath.includes('tsconfig.json') ? path.resolve(cwd, './jsconfig.json') : path.resolve(cwd, config.tsConfigPath)
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
      utils: resolveImport(config.aliases.utils, tsConfig),
      components: resolveImport(config.aliases.components, tsConfig),
      ui: config.aliases.ui
        ? resolveImport(config.aliases.ui, tsConfig)
        : resolveImport(config.aliases.components, tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await c12LoadConfig({
      name: 'components',
      configFile: 'components.json',
      cwd,
    })

    if (!configResult.config || Object.keys(configResult.config).length === 0)
      return null

    return rawConfigSchema.parse(configResult.config)
  }
  catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
