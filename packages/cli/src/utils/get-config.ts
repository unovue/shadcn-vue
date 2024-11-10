import { resolveImport } from '@/src/utils/resolve-import'
import { loadConfig as c12LoadConfig } from 'c12'
import { colors } from 'consola/utils'
import { getTsconfig } from 'get-tsconfig'
import path from 'pathe'
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
  const tsconfigType = config.typescript ? 'tsconfig.json' : 'jsconfig.json'
  const pathAliases = getTSConfig(cwd, tsconfigType)

  if (pathAliases === null) {
    throw new Error(
      `Missing ${colors.cyan('paths')} field in your ${colors.cyan(tsconfigType)} for path aliases. See: ${colors.underline('https//')}`,
    )
  }

  const utilsPath = resolveImport(config.aliases.utils, pathAliases)
  const componentsPath = resolveImport(config.aliases.components, pathAliases)
  const aliasError = (type: string, alias: string) =>
    new Error(
      `Invalid import alias found: (${colors.cyan(`"${type}": "${alias}"`)}) in ${colors.cyan('components.json')}.
   - Import aliases ${colors.underline('must use')} existing path aliases defined in your ${colors.cyan(tsconfigType)}.`,
    )

  if (utilsPath === undefined)
    throw aliasError('utils', config.aliases.utils)
  if (componentsPath === undefined)
    throw aliasError('components', config.aliases.components)

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: resolveImport(config.aliases.utils, pathAliases),
      components: resolveImport(config.aliases.components, pathAliases),
      ui: config.aliases.ui
        ? resolveImport(config.aliases.ui, pathAliases)
        : resolveImport(config.aliases.components, pathAliases),
    },
  })
}

export function getTSConfig(cwd: string, tsconfigName: 'tsconfig.json' | 'jsconfig.json') {
  const parsedConfig = getTsconfig(path.resolve(cwd, 'package.json'), tsconfigName)
  if (parsedConfig === null) {
    throw new Error(
      `Failed to find ${colors.cyan(tsconfigName)}`,
    )
  }

  return parsedConfig
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await c12LoadConfig({
      name: 'components',
      configFile: 'components',
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
