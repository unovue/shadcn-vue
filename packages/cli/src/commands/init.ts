import { existsSync, promises as fs } from 'node:fs'
import process from 'node:process'
import path from 'pathe'
import { Command } from 'commander'
import template from 'lodash.template'
import ora from 'ora'
import prompts from 'prompts'
import { z } from 'zod'
import { addDependency, addDevDependency } from 'nypm'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import * as templates from '../utils/templates'
import {
  getRegistryBaseColor,
  getRegistryBaseColors,
  getRegistryStyles,
} from '../utils/registry'
import { handleError } from '../utils/handle-error'
import { transformByDetype } from '../utils/transformers/transform-sfc'
import {
  type Config,
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_UTILS,
  TAILWIND_CSS_PATH,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '../utils/get-config'
import { transformCJSToESM } from '../utils/transformers/transform-cjs-to-esm'

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

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        consola.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      // Read config.
      const existingConfig = await getConfig(cwd)
      const config = await promptForConfig(cwd, existingConfig, options.yes)

      await runInit(cwd, config)

      consola.log('')
      consola.info(
        `${colors.green('Success!')} Project initialization completed.`,
      )
      consola.log('')
    }
    catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false,
) {
  const highlight = (text: string) => colors.cyan(text)

  const styles = await getRegistryStyles()
  const baseColors = await getRegistryBaseColors()

  const options = await prompts([
    {
      type: 'toggle',
      name: 'typescript',
      message: `Would you like to use ${highlight('TypeScript')} (recommended)?`,
      initial: defaultConfig?.typescript ?? true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'select',
      name: 'framework',
      message: `Which ${highlight('framework')} are you using?`,
      choices: [
        { title: 'Vite', value: 'vite' },
        { title: 'Nuxt', value: 'nuxt' },
        { title: 'Laravel', value: 'laravel' },
        { title: 'Astro', value: 'astro' },
      ],
    },
    {
      type: 'select',
      name: 'style',
      message: `Which ${highlight('style')} would you like to use?`,
      choices: styles.map(style => ({
        title: style.label,
        value: style.name,
      })),
    },
    {
      type: 'select',
      name: 'tailwindBaseColor',
      message: `Which color would you like to use as ${highlight(
        'base color',
      )}?`,
      choices: baseColors.map(color => ({
        title: color.label,
        value: color.name,
      })),
    },
    {
      type: 'text',
      name: 'tailwindCss',
      message: `Where is your ${highlight('global CSS')} file?`,
      initial: (prev, values) => defaultConfig?.tailwind.css ?? TAILWIND_CSS_PATH[values.framework as 'vite' | 'nuxt' | 'laravel' | 'astro'],
    },
    {
      type: 'toggle',
      name: 'tailwindCssVariables',
      message: `Would you like to use ${highlight(
        'CSS variables',
      )} for colors?`,
      initial: defaultConfig?.tailwind.cssVariables ?? true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'text',
      name: 'tailwindConfig',
      message: `Where is your ${highlight('tailwind.config')} located?`,
      initial: (prev, values) => {
        if (defaultConfig?.tailwind.config)
          return defaultConfig?.tailwind.config
        if (values.framework === 'astro')
          return 'tailwind.config.mjs'
        else return DEFAULT_TAILWIND_CONFIG
      },
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlight('utils')}:`,
      initial: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
    },
  ])

  const config = rawConfigSchema.parse({
    $schema: 'https://shadcn-vue.com/schema.json',
    style: options.style,
    typescript: options.typescript,
    framework: options.framework,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
    },
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  if (!skip) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlight('components.json')}. Proceed?`,
      initial: true,
    })

    if (!proceed)
      process.exit(0)
  }

  // Write to file.
  consola.log('')
  const spinner = ora('Writing components.json...').start()
  const targetPath = path.resolve(cwd, 'components.json')
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8')
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora('Initializing project...')?.start()

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
        ? template(templates.TAILWIND_CONFIG_WITH_VARIABLES)({ extension, framework: config.framework })
        : template(templates.TAILWIND_CONFIG)({ extension, framework: config.framework }),
    ),
    'utf8',
  )

  // Write css file.
  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)
  if (baseColor) {
    await fs.writeFile(
      config.resolvedPaths.tailwindCss,
      config.tailwind.cssVariables
        ? baseColor.cssVarsTemplate
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

  const deps = PROJECT_DEPENDENCIES.base.concat(
    config.style === 'new-york' ? ['@radix-icons/vue'] : ['lucide-vue-next'],
  ).filter(Boolean)

  async function addNuxtDevDeps() {
    if (config.framework === 'nuxt') {
      await addDevDependency(PROJECT_DEPENDENCIES.nuxt, {
        cwd,
        silent: true,
      })
    }
  }

  await Promise.allSettled(
    [
      addNuxtDevDeps(),
      addDependency(deps, {
        cwd,
        silent: true,
      }),
    ],
  )

  dependenciesSpinner?.succeed()
}
