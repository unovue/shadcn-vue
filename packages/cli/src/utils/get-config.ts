import type { z } from 'zod'
import { existsSync } from 'node:fs'
import { loadConfig } from 'c12'
import { getTsconfig } from 'get-tsconfig'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { BUILTIN_REGISTRIES } from '@/src/registry/constants'
import { ConfigParseError } from '@/src/registry/errors'
import {
  configSchema,
  rawConfigSchema,
  workspaceConfigSchema,
} from '@/src/schema'
import { detectFrameworkConfigFiles, getFrameworkTsConfigPath, getProjectInfo, isTypeScriptProject } from '@/src/utils/get-project-info'
import { resolveImport } from '@/src/utils/resolve-import'

export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_TAILWIND_CSS = 'assets/css/tailwind.css' // decide to go with Nuxt's as default
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js'
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate'
export const DEFAULT_TYPESCRIPT_CONFIG = './tsconfig.json'

export type Config = z.infer<typeof configSchema>

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

export async function resolveConfigPaths(
  cwd: string,
  config: z.infer<typeof rawConfigSchema>,
) {
  // Merge built-in registries with user registries
  config.registries = {
    ...BUILTIN_REGISTRIES,
    ...(config.registries || {}),
  }

  const detectedFramework = await detectFrameworkConfigFiles(cwd)
  const isTypeScript = await isTypeScriptProject(cwd)

  const tsConfigPath = path.resolve(
    cwd,
    await getFrameworkTsConfigPath(cwd, detectedFramework, isTypeScript),
  )

  // Read tsconfig.json.
  const tsConfig = await getTsconfig(tsConfigPath, isTypeScript ? undefined : 'jsconfig.json')

  if (tsConfig === null) {
    throw new Error(
      `Failed to load ${config.typescript ? 'tsconfig' : 'jsconfig'}.json.`.trim(),
    )
  }

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
      // For now, we assume the lib and composables directories are one level up from the components directory.
      lib: config.aliases.lib
        ? await resolveImport(config.aliases.lib, tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases.utils, tsConfig)) ?? cwd,
            '..',
          ),
      hooks: config.aliases.hooks
        ? await resolveImport(config.aliases.hooks, tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases.components, tsConfig))
            ?? cwd,
            '..',
            'hooks',
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

export async function getRawConfig(
  cwd: string,
): Promise<z.infer<typeof rawConfigSchema> | null> {
  try {
    const configResult = await loadConfig({
      name: 'components',
      configFile: 'components',
      cwd,
      dotenv: false,
      packageJson: false,
      rcFile: false,
      jitiOptions: {
        rebuildFsCache: true,
        moduleCache: true,
      },
    })

    if (!configResult.config || Object.keys(configResult.config).length === 0) {
      return null
    }

    const config = rawConfigSchema.parse(configResult.config)

    // Check if user is trying to override built-in registries
    if (config.registries) {
      for (const registryName of Object.keys(config.registries)) {
        if (registryName in BUILTIN_REGISTRIES) {
          throw new Error(
            `"${registryName}" is a built-in registry and cannot be overridden.`,
          )
        }
      }
    }

    return config
  }
  catch (error) {
    // Work around a c12/jiti resolution bug: when no `components.json` (or
    // `components.config.*`) file exists, c12's internal fallback chain for
    // an extensionless `configFile` (here, the literal string "components")
    // can end up calling `existsSync("components")` relative to the actual
    // process cwd instead of the resolved project cwd. Since virtually every
    // Vue/Nuxt project has a sibling `components/` directory, this
    // accidentally resolves to that directory and gets passed — as a bare,
    // unresolved specifier — into `jiti.import()`, which then throws a raw
    // `MODULE_NOT_FOUND` for `'components'` instead of c12 reporting "no
    // config found". This is indistinguishable from "no config file present"
    // from our side, so treat it the same way (return null) rather than
    // surfacing it as a config parse error. Only do this when there's no
    // explicit config file present — if one of these exists, a
    // MODULE_NOT_FOUND for 'components' is a real failure (e.g. the user's
    // own components.config.ts importing a missing module) and must still
    // surface as ConfigParseError instead of being silently swallowed.
    // See: https://github.com/unjs/c12 (upstream issue pending).
    const hasExplicitConfigFile
      = existsSync(path.resolve(cwd, 'components.json'))
        || existsSync(path.resolve(cwd, 'components.config.ts'))
        || existsSync(path.resolve(cwd, 'components.config.js'))
        || existsSync(path.resolve(cwd, 'components.config.mjs'))
        || existsSync(path.resolve(cwd, 'components.config.cjs'))

    if (
      error instanceof Error
      && (error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND'
      && error.message.includes('\'components\'')
      && !hasExplicitConfigFile
    ) {
      return null
    }

    throw new ConfigParseError(cwd, error)
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
      resolvedPath!,
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
  // Only upgrade "new-york" to "new-york-v4" for Tailwind v4 projects.
  // Other styles (e.g. "reka-nova", "reka-luma") should be used as-is.
  if (projectInfo?.tailwindVersion === 'v4' && fallback === 'new-york') {
    return 'new-york-v4'
  }
  return fallback
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Creates a config object with sensible defaults.
 * Useful for universal registry items that bypass framework detection.
 *
 * @param partial - Partial config values to override defaults
 * @returns A complete Config object
 */
export function createConfig(partial?: DeepPartial<Config>): Config {
  const defaultConfig: Config = {
    typescript: true,
    resolvedPaths: {
      cwd: process.cwd(),
      tailwindConfig: '',
      tailwindCss: '',
      utils: '',
      components: '',
      ui: '',
      lib: '',
      hooks: '',
      composables: '',
    },
    style: '',
    font: 'inter',
    tailwind: {
      config: '',
      css: '',
      baseColor: '',
      cssVariables: false,
    },
    // rsc: false,
    // tsx: true,
    aliases: {
      components: '',
      utils: '',
    },
    registries: {
      ...BUILTIN_REGISTRIES,
    },
  }

  // Deep merge the partial config with defaults
  if (partial) {
    return {
      ...defaultConfig,
      ...partial,
      resolvedPaths: {
        ...defaultConfig.resolvedPaths,
        ...(partial.resolvedPaths || {}),
      },
      tailwind: {
        ...defaultConfig.tailwind,
        ...(partial.tailwind || {}),
      },
      aliases: {
        ...defaultConfig.aliases,
        ...(partial.aliases || {}),
      },
      registries: {
        ...defaultConfig.registries,
        ...(partial.registries || {}),
      },
    }
  }

  return defaultConfig
}
