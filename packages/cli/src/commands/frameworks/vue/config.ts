import { promises as fs } from 'node:fs'
import path from 'pathe'
import ora from 'ora'
import { colors } from 'consola/utils'
import { consola } from 'consola'
import prompts from 'prompts'
import { getRegistryBaseColors, getRegistryStyles } from '../../../utils/registry'
import {
  type Config,
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_UTILS,
  TAILWIND_CSS_PATH,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '../../../utils/get-config'

export default async function (cwd: string, options: { yes: boolean, cwd: string }, prompt: boolean) {
  const existingConfig = await getConfig(cwd)
  return prompt ? await promptForConfig(cwd, existingConfig, options.yes) : existingConfig
}

async function promptForConfig(
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
      message: `Would you like to use ${highlight('TypeScript')}? ${colors.gray('(recommended)')}?`,
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
      name: 'tsConfigPath',
      message: (prev, values) => `Where is your ${highlight(values.typescript ? 'tsconfig.json' : 'jsconfig.json')} file?`,
      initial: (prev, values) => {
        const prefix = values.framework === 'nuxt' ? '.nuxt/' : './'
        const path = values.typescript ? 'tsconfig.json' : 'jsconfig.json'
        return prefix + path
      },
    },
    {
      type: 'text',
      name: 'tailwindCss',
      message: `Where is your ${highlight('global CSS')} file? ${colors.gray('(this file will be overwritten)')}`,
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
    // {
    //   type: 'text',
    //   name: 'tailwindPrefix',
    //   message: `Are you using a custom ${highlight(
    //     'tailwind prefix eg. tw-',
    //   )}? (Leave blank if not)`,
    //   initial: '',
    // },
    {
      type: 'text',
      name: 'tailwindConfig',
      message: `Where is your ${highlight('tailwind.config')} located? ${colors.gray('(this file will be overwritten)')}`,
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
    tsConfigPath: options.tsConfigPath,
    framework: options.framework,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
      // prefix: options.tailwindPrefix,
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
