import type { Framework } from '@/src/utils/frameworks'
import type {
  Config,
  RawConfig,
} from '@/src/utils/get-config'
import { FRAMEWORKS } from '@/src/utils/frameworks'
import {
  getConfig,
  getTSConfig,
  resolveConfigPaths,
} from '@/src/utils/get-config'
import { getPackageInfo } from '@/src/utils/get-package-info'
import fs from 'fs-extra'
import { parseTsconfig } from 'get-tsconfig'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { z } from 'zod'

export interface ProjectInfo {
  framework: Framework
  typescript: boolean
  tailwindConfigFile: string | null
  tailwindCssFile: string | null
  aliasPrefix: string | null
}

const PROJECT_SHARED_IGNORE = [
  '**/node_modules/**',
  '.nuxt',
  'public',
  'dist',
  'build',
]

const TS_CONFIG_SCHEMA = z.object({
  compilerOptions: z.object({
    paths: z.record(z.string().or(z.array(z.string()))),
  }),
})

export async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  const [
    configFiles,
    typescript,
    tailwindConfigFile,
    tailwindCssFile,
    aliasPrefix,
    packageJson,
  ] = await Promise.all([
    glob('**/{nuxt,vite,astro}.config.*|composer.json', {
      cwd,
      deep: 3,
      ignore: PROJECT_SHARED_IGNORE,
    }),
    isTypeScriptProject(cwd),
    getTailwindConfigFile(cwd),
    getTailwindCssFile(cwd),
    getTsConfigAliasPrefix(cwd),
    getPackageInfo(cwd, false),
  ])

  const type: ProjectInfo = {
    framework: FRAMEWORKS.manual,
    typescript,
    tailwindConfigFile,
    tailwindCssFile,
    aliasPrefix,
  }

  // Nuxt.
  if (configFiles.find(file => file.startsWith('nuxt.config.'))?.length) {
    type.framework = FRAMEWORKS.nuxt
    return type
  }

  // Astro.
  if (configFiles.find(file => file.startsWith('astro.config.'))?.length) {
    type.framework = FRAMEWORKS.astro
    return type
  }

  // Laravel.
  if (configFiles.find(file => file.startsWith('composer.json'))?.length) {
    type.framework = FRAMEWORKS.laravel
    return type
  }

  // Vite.
  // We'll assume that it got caught by the Remix check above.
  if (configFiles.find(file => file.startsWith('vite.config.'))?.length) {
    type.framework = FRAMEWORKS.vite
    return type
  }

  return type
}

export async function getTailwindCssFile(cwd: string) {
  const files = await glob(['**/*.css', '**/*.scss'], {
    cwd,
    deep: 5,
    ignore: PROJECT_SHARED_IGNORE,
  })

  if (!files.length) {
    return null
  }

  for (const file of files) {
    const contents = await fs.readFile(path.resolve(cwd, file), 'utf8')
    // Assume that if the file contains `@tailwind base` it's the main css file.
    if (contents.includes('@tailwind base')) {
      return file
    }
  }

  return null
}

export async function getTailwindConfigFile(cwd: string) {
  const files = await glob('tailwind.config.*', {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  })

  if (!files.length) {
    return null
  }

  return files[0]
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const isTypescript = await isTypeScriptProject(cwd)
  const tsconfigType = isTypescript ? 'tsconfig.json' : 'jsconfig.json'

  const tsConfig = getTSConfig(cwd, tsconfigType)
  const parsedTsConfig = parseTsconfig(tsConfig.path)

  const aliasPaths = parsedTsConfig.compilerOptions?.paths ?? {}

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(aliasPaths)) {
    if (
      paths.includes('./*')
      || paths.includes('./src/*')
      || paths.includes('./app/*')
      || paths.includes('./resources/js/*') // Laravel.
    ) {
      const cleanAlias = alias.replace(/\/\*$/, '') ?? null
      // handle Nuxt
      return cleanAlias === '#build' ? '@' : cleanAlias
    }
  }

  // Use the first alias as the prefix.
  return Object.keys(aliasPaths)?.[0]?.replace(/\/\*$/, '') ?? null
}

export async function isTypeScriptProject(cwd: string) {
  const files = await glob('tsconfig.*', {
    cwd,
    deep: 1,
    ignore: PROJECT_SHARED_IGNORE,
  })

  return files.length > 0
}

export async function getTsConfig(cwd: string) {
  for (const fallback of [
    'tsconfig.json',
    'tsconfig.web.json',
    'tsconfig.app.json',
  ]) {
    const filePath = path.resolve(cwd, fallback)
    if (!(await fs.pathExists(filePath))) {
      continue
    }

    // We can't use fs.readJSON because it doesn't support comments.
    const contents = await fs.readFile(filePath, 'utf8')
    const cleanedContents = contents.replace(/\/\*\s*\*\//g, '')
    const result = TS_CONFIG_SCHEMA.safeParse(JSON.parse(cleanedContents))

    if (result.error) {
      continue
    }

    return result.data
  }

  return null
}

export async function getProjectConfig(
  cwd: string,
  defaultProjectInfo: ProjectInfo | null = null,
): Promise<Config | null> {
  // Check for existing component config.
  const [existingConfig, projectInfo] = await Promise.all([
    getConfig(cwd),
    !defaultProjectInfo
      ? getProjectInfo(cwd)
      : Promise.resolve(defaultProjectInfo),
  ])

  if (existingConfig) {
    return existingConfig
  }

  if (
    !projectInfo
    || !projectInfo.tailwindConfigFile
    || !projectInfo.tailwindCssFile
  ) {
    return null
  }

  const config: RawConfig = {
    $schema: 'https://shadcn-vue.com/schema.json',
    typescript: projectInfo.typescript,
    style: 'new-york',
    tailwind: {
      config: projectInfo.tailwindConfigFile,
      baseColor: 'zinc',
      css: projectInfo.tailwindCssFile,
      cssVariables: true,
      prefix: '',
    },
    iconLibrary: 'lucide',
    aliases: {
      components: `${projectInfo.aliasPrefix}/components`,
      ui: `${projectInfo.aliasPrefix}/components/ui`,
      composables: `${projectInfo.aliasPrefix}/composables`,
      lib: `${projectInfo.aliasPrefix}/lib`,
      utils: `${projectInfo.aliasPrefix}/lib/utils`,
    },
  }

  return await resolveConfigPaths(cwd, config)
}
