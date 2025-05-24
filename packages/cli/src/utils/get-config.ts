import { cosmiconfig } from 'cosmiconfig'
import { getTsconfig } from 'get-tsconfig'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { z } from 'zod'
import { getProjectInfo } from '@/src/utils/get-project-info'
import { resolveImport } from '@/src/utils/resolve-import'
import { highlighter } from './highlighter'

/** @deprecated */
export const TAILWIND_CSS_PATH = {
  nuxt: 'assets/css/tailwind.css',
  vite: 'src/assets/index.css',
  laravel: 'resources/css/app.css',
  astro: 'src/styles/globals.css',
}

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_TAILWIND_CSS = TAILWIND_CSS_PATH.nuxt // decide to go with Nuxt's as default
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js'
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate'
export const DEFAULT_TYPESCRIPT_CONFIG = './tsconfig.json'

// zernonia: replaced this from `c12` because it cause error with `components` folder in Nuxt.
// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.boolean().default(true),
    tailwind: z.object({
      config: z.string().optional(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().default('').optional(),
    }),
    aliases: z.object({
      components: z.string(),
      composables: z.string().optional(),
      utils: z.string(),
      ui: z.string().optional(),
      lib: z.string().optional(),
    }),
    iconLibrary: z.string().optional(),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    composables: z.string(),
    lib: z.string(),
    ui: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

// TODO: type the key.
// Okay for now since I don't want a breaking change.
export const workspaceConfigSchema = z.record(configSchema)

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  // Set default icon library if not provided.
  if (!config.iconLibrary) {
    config.iconLibrary = config.style === 'new-york' ? 'radix' : 'lucide'
  }

  return await resolveConfigPaths(cwd, config)
}

export function getTSConfig(cwd: string, tsconfigName: 'tsconfig.json' | 'jsconfig.json') {
  const parsedConfig = getTsconfig(path.resolve(cwd, 'package.json'), tsconfigName)
  if (parsedConfig === null) {
    throw new Error(
      `Failed to find ${highlighter.info(tsconfigName)}`,
    )
  }

  return parsedConfig
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsconfigType = config.typescript ? 'tsconfig.json' : 'jsconfig.json'
  const tsConfig = getTSConfig(cwd, tsconfigType)

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      tailwindConfig: config.tailwind.config
        ? path.resolve(cwd, config.tailwind.config)
        : '',
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig),
      ui: config.aliases.ui
        ? await resolveImport(config.aliases.ui, tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases.components, tsConfig))
            ?? cwd,
            'ui',
          ),
      // TODO: Make this configurable.
      // For now, we assume the lib and hooks directories are one level up from the components directory.
      lib: config.aliases.lib
        ? await resolveImport(config.aliases.lib, tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases.utils, tsConfig)) ?? cwd,
            '..',
          ),
      composables: config.aliases.composables
        ? await resolveImport(config.aliases.composables, tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases.components, tsConfig))
            ?? cwd,
            '..',
            'composables',
          ),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)
    if (!configResult) {
      return null
    }

    return rawConfigSchema.parse(configResult.config)
  }
  catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}

// Note: we can check for -workspace.yaml or "workspace" in package.json.
// Since cwd is not necessarily the root of the project.
// We'll instead check if ui aliases resolve to a different root.
export async function getWorkspaceConfig(config: Config) {
  // eslint-disable-next-line prefer-const
  let resolvedAliases: any = {}

  for (const key of Object.keys(config.aliases)) {
    if (!isAliasKey(key, config)) {
      continue
    }

    const resolvedPath = config.resolvedPaths[key]
    const packageRoot = await findPackageRoot(
      config.resolvedPaths.cwd,
      resolvedPath,
    )

    if (!packageRoot) {
      resolvedAliases[key] = config
      continue
    }

    resolvedAliases[key] = await getConfig(packageRoot)
  }

  const result = workspaceConfigSchema.safeParse(resolvedAliases)
  if (!result.success) {
    return null
  }

  return result.data
}

export async function findPackageRoot(cwd: string, resolvedPath: string) {
  const commonRoot = findCommonRoot(cwd, resolvedPath)
  const relativePath = path.relative(commonRoot, resolvedPath)

  const packageRoots = await glob('**/package.json', {
    cwd: commonRoot,
    deep: 3,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/public/**'],
  })

  const matchingPackageRoot = packageRoots
    .map(pkgPath => path.dirname(pkgPath))
    .find(pkgDir => relativePath.startsWith(pkgDir))

  return matchingPackageRoot ? path.join(commonRoot, matchingPackageRoot) : null
}

function isAliasKey(
  key: string,
  config: Config,
): key is keyof Config['aliases'] {
  return Object.keys(config.resolvedPaths)
    .filter(key => key !== 'utils')
    .includes(key)
}

export function findCommonRoot(cwd: string, resolvedPath: string) {
  const parts1 = cwd.split(path.sep)
  const parts2 = resolvedPath.split(path.sep)
  const commonParts = []

  for (let i = 0; i < Math.min(parts1.length, parts2.length); i++) {
    if (parts1[i] !== parts2[i]) {
      break
    }
    commonParts.push(parts1[i])
  }

  return commonParts.join(path.sep)
}

// TODO: Cache this call.
export async function getTargetStyleFromConfig(cwd: string, fallback: string) {
  const projectInfo = await getProjectInfo(cwd)
  return projectInfo?.tailwindVersion === 'v4' ? 'new-york-v4' : fallback
}
