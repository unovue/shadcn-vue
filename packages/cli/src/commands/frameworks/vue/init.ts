import { existsSync, promises as fs } from 'node:fs'
import { template } from 'lodash-es'
import { addDependency, addDevDependency } from 'nypm'
import { gte } from 'semver'
import { consola } from 'consola'
import path from 'pathe'
import ora from 'ora'
import { applyPrefixesCss } from '../../../utils/transformers/transform-tw-prefix'
import { transformByDetype } from '../../../utils/transformers/transform-sfc'
import { transformCJSToESM } from '../../../utils/transformers/transform-cjs-to-esm'
import * as templates from '../../../utils/templates'
import { getProjectInfo } from '../../../utils/get-project-info'
import { getRegistryBaseColor } from '../../../utils/registry'
import type { Config } from '../../../utils/get-config'

const PROJECT_DEPENDENCIES = {
  base: [
    'tailwindcss-animate',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'radix-vue',
  ],
  nuxt: [
    '@nuxtjs/tailwindcss',
  ],
}

export default async function (cwd: string, config: Config) {
  const spinner = ora('Initializing project...')?.start()

  // Check in in a Nuxt project.
  const { isNuxt, shadcnNuxt } = await getProjectInfo()
  if (isNuxt) {
    consola.log('')
    shadcnNuxt
      ? consola.info(`Detected a Nuxt project with 'shadcn-nuxt' v${shadcnNuxt.version}...`)
      : consola.warn(`Detected a Nuxt project without 'shadcn-nuxt' module. It's recommended to install it.`)
  }

  // Ensure all resolved paths directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === 'utils' && resolvedPath.endsWith('/utils')) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, '')
    }

    if (!existsSync(dirname))
      await fs.mkdir(dirname, { recursive: true })
  }

  const extension = config.typescript ? 'ts' : 'js'

  // Write tailwind config.
  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    transformCJSToESM(
      config.resolvedPaths.tailwindConfig,
      config.tailwind.cssVariables
        ? template(templates.TAILWIND_CONFIG_WITH_VARIABLES)({ extension, framework: config.framework, prefix: config.tailwind.prefix })
        : template(templates.TAILWIND_CONFIG)({ extension, framework: config.framework, prefix: config.tailwind.prefix }),
    ),
    'utf8',
  )

  // Write css file.
  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)
  if (baseColor) {
    await fs.writeFile(
      config.resolvedPaths.tailwindCss,
      config.tailwind.cssVariables
        ? config.tailwind.prefix
          ? applyPrefixesCss(baseColor.cssVarsTemplate, config.tailwind.prefix)
          : baseColor.cssVarsTemplate
        : baseColor.inlineColorsTemplate,
      'utf8',
    )
  }

  // Write cn file.
  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === 'ts' ? templates.UTILS : await transformByDetype(templates.UTILS, '.ts'),
    'utf8',
  )

  spinner?.succeed()

  // Install dependencies.
  const dependenciesSpinner = ora('Installing dependencies...')?.start()

  // Starting from `shadcn-nuxt` version 0.10.4, Base dependencies are handled by the module so no need to re-add them by the CLI
  const baseDeps = gte(shadcnNuxt?.version || '0.0.0', '0.10.4') ? [] : PROJECT_DEPENDENCIES.base
  const iconsDep = config.style === 'new-york' ? ['@radix-icons/vue'] : ['lucide-vue-next']
  const deps = baseDeps.concat(iconsDep).filter(Boolean)

  await Promise.allSettled(
    [
      config.framework === 'nuxt' && await addDevDependency(PROJECT_DEPENDENCIES.nuxt, {
        cwd,
        silent: true,
      }),
      await addDependency(deps, {
        cwd,
        silent: true,
      }),
    ],
  )

  dependenciesSpinner?.succeed()
}
