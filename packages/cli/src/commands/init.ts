import type { Config } from '@/src/utils/get-config'
import { promises as fs } from 'node:fs'
import { Command } from 'commander'
import deepmerge from 'deepmerge'
import fsExtra from 'fs-extra'
import { ofetch } from 'ofetch'
import path from 'pathe'
import prompts from 'prompts'
import { z } from 'zod'
import { preFlightInit } from '@/src/preflights/preflight-init'
import {
  getRegistryBaseColors,
  getRegistryItems,
  getRegistryStyles,
} from '@/src/registry/api'
import { buildUrlAndHeadersForRegistryItem } from '@/src/registry/builder'
import { configWithDefaults } from '@/src/registry/config'
import {
  BASE_COLORS,
  BASES,
  BUILTIN_REGISTRIES,
  FONTS,
  ICON_LIBRARIES,
  PRESETS,
  STYLES,
} from '@/src/registry/constants'
import { clearRegistryContext } from '@/src/registry/context'
import { isUrl } from '@/src/registry/utils'
import { rawConfigSchema } from '@/src/schema'
import { addComponents } from '@/src/utils/add-components'
import { createProject, TEMPLATES } from '@/src/utils/create-project'
import { loadEnvFiles } from '@/src/utils/env-loader'
import * as ERRORS from '@/src/utils/errors'
import {
  createFileBackup,
  deleteFileBackup,
  FILE_BACKUP_SUFFIX,
  restoreFileBackup,
} from '@/src/utils/file-helper'
import {
  createConfig,
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  getConfig,
  resolveConfigPaths,
} from '@/src/utils/get-config'
import {
  getProjectConfig,
  getProjectInfo,
  getProjectTailwindVersionFromConfig,
} from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { decodePreset, isEncodedPreset } from '@/src/utils/preset-encoding'
import { ensureRegistriesInConfig } from '@/src/utils/registries'
import { spinner } from '@/src/utils/spinner'
import { updateTailwindContent } from '@/src/utils/updaters/update-tailwind-content'

process.on('exit', (code) => {
  const filePath = path.resolve(process.cwd(), 'components.json')

  // Delete backup if successful.
  if (code === 0) {
    return deleteFileBackup(filePath)
  }

  // Restore backup if error.
  return restoreFileBackup(filePath)
})

export async function resolvePreset(value: string) {
  if (isUrl(value)) {
    try {
      const data = await ofetch(value)
      return data as (typeof PRESETS)[number]
    }
    catch {
      logger.error(`Failed to fetch preset from ${highlighter.info(value)}.`)
      return null
    }
  }
  const named = PRESETS.find(p => p.name === value)
  if (named)
    return named

  if (isEncodedPreset(value)) {
    const decoded = decodePreset(value)
    if (decoded) {
      // Normalize font to one supported by the CLI registry; fall back to 'inter'.
      const font = FONTS.find(f => f.name === decoded.font)?.name ?? 'inter'
      return {
        name: value,
        title: value,
        description: '',
        base: 'reka',
        ...decoded,
        font,
      } as (typeof PRESETS)[number]
    }
  }

  return null
}

export const initOptionsSchema = z.object({
  cwd: z.string(),
  name: z.string().optional(),
  preset: z.string().optional(),
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  isNewProject: z.boolean(),
  srcDir: z.boolean().optional(),
  cssVariables: z.boolean(),
  template: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return TEMPLATES[val as keyof typeof TEMPLATES]
        }
        return true
      },
      {
        message: 'Invalid template. Please use \'nuxt\', \'vite\', \'astro\', or \'laravel\'.',
      },
    ),
  base: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return BASES.find(base => base.name === val)
        }
        return true
      },
      {
        message: `Invalid base. Please use '${BASES.map(base => base.name).join('\', \'')}'`,
      },
    ),
  style: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return STYLES.find(style => style.name === val)
        }
        return true
      },
      {
        message: `Invalid style. Please use '${STYLES.map(style => style.name).join('\', \'')}'`,
      },
    ),
  iconLibrary: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return ICON_LIBRARIES.find(lib => lib.name === val)
        }
        return true
      },
      {
        message: `Invalid icon library. Please use '${ICON_LIBRARIES.map(lib => lib.name).join('\', \'')}'`,
      },
    ),
  font: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return FONTS.find(font => font.name === val)
        }
        return true
      },
      {
        message: `Invalid font. Please use '${FONTS.map(font => font.name).join('\', \'')}'`,
      },
    ),
  baseColor: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return BASE_COLORS.find(color => color.name === val)
        }

        return true
      },
      {
        message: `Invalid base color. Please use '${BASE_COLORS.map(
          color => color.name,
        ).join('\', \'')}'`,
      },
    ),
  baseStyle: z.boolean(),
})

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .argument('[components...]', 'names, url or local path to component')
  .option(
    '-p, --preset <preset>',
    `use a preset configuration or URL. (${PRESETS.map(p => p.name).join(', ')})`,
  )
  .option(
    '-t, --template <template>',
    'the template to use. (nuxt, vite, astro, laravel)',
  )
  .option(
    '--base <base>',
    'the component library base to use. (reka)',
    undefined,
  )
  .option(
    '--style <style>',
    'the visual style to use. (vega, nova, maia, lyra, mira)',
    undefined,
  )
  .option(
    '--icon-library <icon-library>',
    'the icon library to use. (lucide, tabler, hugeicons, phosphor, remixicon)',
    undefined,
  )
  .option(
    '--font <font>',
    'the font to use. (inter, figtree, jetbrains-mono, geist, geist-mono)',
    undefined,
  )
  .option(
    '-b, --base-color <base-color>',
    'the base color to use. (neutral, gray, zinc, stone, slate)',
    undefined,
  )
  .option('-y, --yes', 'skip confirmation prompt.', true)
  .option('-d, --defaults,', 'use default configuration.', false)
  .option('-f, --force', 'force overwrite of existing configuration.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-s, --silent', 'mute output.', false)
  .option(
    '--src-dir',
    'use the src directory when creating a new project.',
    false,
  )
  .option(
    '--no-src-dir',
    'do not use the src directory when creating a new project.',
  )
  .option('--css-variables', 'use css variables for theming.', true)
  .option('--no-css-variables', 'do not use css variables for theming.')
  .option('--no-base-style', 'do not install the base shadcn style.')
  .action(async (components, opts) => {
    try {
      // Resolve and apply preset (CLI flags take precedence over preset values).
      if (opts.preset) {
        const preset = await resolvePreset(opts.preset)
        if (!preset) {
          logger.error(
            `Invalid preset "${opts.preset}". Available presets: ${PRESETS.map(p => p.name).join(', ')}`,
          )
          process.exit(1)
        }
        opts.base = opts.base ?? preset.base
        opts.style = opts.style ?? preset.style
        opts.iconLibrary = opts.iconLibrary ?? preset.iconLibrary
        opts.font = opts.font ?? preset.font
        opts.baseColor = opts.baseColor ?? preset.baseColor
        opts.yes = true
      }

      // Apply defaults when --defaults flag is set.
      if (opts.defaults) {
        opts.template = opts.template || 'nuxt'
        opts.base = opts.base || 'reka'
        opts.style = opts.style || 'vega'
        opts.iconLibrary = opts.iconLibrary || 'lucide'
        opts.font = opts.font || 'inter'
        opts.baseColor = opts.baseColor || 'neutral'
      }

      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        isNewProject: false,
        components,
        ...opts,
      })

      await loadEnvFiles(options.cwd)

      // We need to check if we're initializing with a new style.
      // This will allow us to determine if we need to install the base style.
      // And if we should prompt the user for a base color.
      if (components.length > 0) {
        // We don't know the full config at this point.
        // So we'll use a shadow config to fetch the first item.
        let shadowConfig = configWithDefaults(
          createConfig({
            resolvedPaths: {
              cwd: options.cwd,
            },
          }),
        )

        // Check if there's a components.json file.
        // If so, we'll merge with our shadow config.
        const componentsJsonPath = path.resolve(options.cwd, 'components.json')
        if (fsExtra.existsSync(componentsJsonPath)) {
          const existingConfig = await fsExtra.readJson(componentsJsonPath)
          const config = rawConfigSchema.partial().parse(existingConfig)
          const baseConfig = createConfig({
            resolvedPaths: {
              cwd: options.cwd,
            },
          })
          shadowConfig = configWithDefaults({
            ...config,
            resolvedPaths: {
              ...baseConfig.resolvedPaths,
              cwd: options.cwd,
            },
          })

          // Since components.json might not be valid at this point.
          // Temporarily rename components.json to allow preflight to run.
          // We'll rename it back after preflight.
          createFileBackup(componentsJsonPath)
        }

        // Ensure all registries used in components are configured.
        const { config: updatedConfig } = await ensureRegistriesInConfig(
          components,
          shadowConfig,
          {
            silent: true,
            writeFile: false,
          },
        )
        shadowConfig = updatedConfig

        // This forces a shadowConfig validation early in the process.
        buildUrlAndHeadersForRegistryItem(components[0], shadowConfig)

        const [item] = await getRegistryItems([components[0]], {
          config: shadowConfig,
        })
        if (item?.type === 'registry:style') {
          // Set a default base color so we're not prompted.
          // The style will extend or override it.
          options.baseColor = 'neutral'

          // If the style extends none, we don't want to install the base style.
          options.baseStyle
            = item.extends === 'none' ? false : options.baseStyle
        }
      }

      // If --no-base-style, we don't want to prompt for a base color either.
      // The style will extend or override it.
      if (!options.baseStyle) {
        options.baseColor = 'neutral'
      }

      await runInit(options)

      logger.log(
        `${highlighter.success(
          'Success!',
        )} Project initialization completed.\nYou may now add components.`,
      )

      // We need when running with custom cwd.
      deleteFileBackup(path.resolve(options.cwd, 'components.json'))
      logger.break()
    }
    catch (error) {
      logger.break()
      handleError(error)
    }
    finally {
      clearRegistryContext()
    }
  })

export async function runInit(
  options: z.infer<typeof initOptionsSchema> & {
    skipPreflight?: boolean
  },
) {
  let projectInfo
  if (!options.skipPreflight) {
    const preflight = await preFlightInit(options)
    if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
      const { projectPath } = await createProject(options)
      if (!projectPath) {
        process.exit(1)
      }
      options.cwd = projectPath
      options.isNewProject = true
    }
    projectInfo = preflight.projectInfo
  }
  else {
    projectInfo = await getProjectInfo(options.cwd)
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo)

  let config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : await promptForConfig(await getConfig(options.cwd), options)

  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlighter.info(
        'components.json',
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Prepare the list of components to be added.
  const components = [
    // "index" is the default shadcn style.
    // Why index? Because when style is true, we read style from components.json and fetch that.
    // i.e new-york from components.json then fetch /styles/new-york/index.
    // TODO: Fix this so that we can extend any style i.e --style=new-york.
    ...(options.baseStyle ? ['index'] : []),
    ...(options.components ?? []),
  ]

  // Ensure registries are configured for the components we're about to add.
  const fullConfigForRegistry = await resolveConfigPaths(options.cwd, config)
  const { config: configWithRegistries } = await ensureRegistriesInConfig(
    components,
    fullConfigForRegistry,
    {
      silent: true,
    },
  )

  // Update config with any new registries found.
  if (configWithRegistries.registries) {
    config.registries = configWithRegistries.registries
  }

  const componentSpinner = spinner(`Writing components.json.`).start()
  const targetPath = path.resolve(options.cwd, 'components.json')
  const backupPath = `${targetPath}${FILE_BACKUP_SUFFIX}`

  // Merge with backup config if it exists and not using --force
  if (!options.force && fsExtra.existsSync(backupPath)) {
    const existingConfig = await fsExtra.readJson(backupPath)

    // Move registries at the end of the config.
    const { registries, ...merged } = deepmerge(existingConfig, config)
    config = { ...merged, registries }
  }

  // Make sure to filter out built-in registries.
  // TODO: fix this in ensureRegistriesInConfig.
  config.registries = Object.fromEntries(
    Object.entries(config.registries || {}).filter(
      ([key]) => !Object.keys(BUILTIN_REGISTRIES).includes(key),
    ),
  )

  // Write components.json.
  await fs.writeFile(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
  componentSpinner.succeed()

  // Add components.
  const fullConfig = await resolveConfigPaths(options.cwd, config)

  await addComponents(components, fullConfig, {
    // Init will always overwrite files.
    overwrite: true,
    silent: options.silent,
    baseStyle: options.baseStyle,
    isNewProject:
      options.isNewProject || projectInfo?.framework.name === 'nuxt4',
  })

  // If a new project is using src dir, let's update the tailwind content config.
  // TODO: Handle this per framework.
  if (options.isNewProject && options.srcDir) {
    await updateTailwindContent(
      ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
      fullConfig,
      {
        silent: options.silent,
      },
    )
  }

  return fullConfig
}

async function promptForConfig(defaultConfig: Config | null = null, opts?: z.infer<typeof initOptionsSchema>) {
  let base = opts?.base ?? 'reka'
  let style = opts?.style ?? 'vega'
  let font = opts?.font ?? 'inter'
  let iconLibrary = opts?.iconLibrary ?? 'lucide'
  let baseColor = opts?.baseColor ?? 'neutral'
  let typescript = defaultConfig?.typescript ?? true
  let tailwindCss = defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS
  let tailwindCssVariables = opts?.cssVariables ?? defaultConfig?.tailwind.cssVariables ?? true
  let tailwindPrefix = defaultConfig?.tailwind.prefix ?? ''
  let tailwindConfig = defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG
  let componentsAlias = defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS
  let utilsAlias = defaultConfig?.aliases.utils ?? DEFAULT_UTILS

  if (opts?.preset === undefined && !opts?.defaults) {
    const [styles, baseColors] = await Promise.all([
      getRegistryStyles(),
      getRegistryBaseColors(),
    ])

    logger.info('')
    const options = await prompts([
      {
        type: 'toggle',
        name: 'typescript',
        message: `Would you like to use ${highlighter.info(
          'TypeScript',
        )} (recommended)?`,
        initial: typescript,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: 'select',
        name: 'base',
        message: `Which ${highlighter.info('component library')} would you like to use?`,
        choices: BASES.map(b => ({
          title: b.label,
          value: b.name,
          description: b.description,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'style',
        message: `Which ${highlighter.info('visual style')} would you like to use?`,
        choices: [
          ...STYLES.map(s => ({
            title: s.label,
            value: s.name,
            description: s.description,
          })),
          ...styles.filter(s => !STYLES.find(st => st.name === s.name)).map(s => ({
            title: s.label,
            value: s.name,
          })),
        ],
        initial: 0,
      },
      {
        type: 'select',
        name: 'iconLibrary',
        message: `Which ${highlighter.info('icon library')} would you like to use?`,
        choices: ICON_LIBRARIES.map(lib => ({
          title: lib.label,
          value: lib.name,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'font',
        message: `Which ${highlighter.info('font')} would you like to use?`,
        choices: FONTS.map(f => ({
          title: f.label,
          value: f.name,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'tailwindBaseColor',
        message: `Which color would you like to use as the ${highlighter.info(
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
        message: `Where is your ${highlighter.info('global CSS')} file?`,
        initial: tailwindCss,
      },
      {
        type: 'toggle',
        name: 'tailwindCssVariables',
        message: `Would you like to use ${highlighter.info(
          'CSS variables',
        )} for theming?`,
        initial: tailwindCssVariables,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: 'text',
        name: 'tailwindPrefix',
        message: `Are you using a custom ${highlighter.info(
          'tailwind prefix eg. tw-',
        )}? (Leave blank if not)`,
        initial: '',
      },
      {
        type: 'text',
        name: 'tailwindConfig',
        message: `Where is your ${highlighter.info(
          'tailwind.config.js',
        )} located?`,
        initial: tailwindConfig,
      },
      {
        type: 'text',
        name: 'components',
        message: `Configure the import alias for ${highlighter.info(
          'components',
        )}:`,
        initial: componentsAlias,
      },
      {
        type: 'text',
        name: 'utils',
        message: `Configure the import alias for ${highlighter.info('utils')}:`,
        initial: utilsAlias,
      },
    ])

    base = options.base ?? base
    style = options.style ?? style
    font = options.font ?? font
    iconLibrary = options.iconLibrary ?? iconLibrary
    baseColor = options.tailwindBaseColor ?? baseColor
    typescript = options.typescript ?? typescript
    tailwindCss = options.tailwindCss ?? tailwindCss
    tailwindCssVariables = options.tailwindCssVariables ?? tailwindCssVariables
    tailwindPrefix = options.tailwindPrefix ?? tailwindPrefix
    tailwindConfig = options.tailwindConfig ?? tailwindConfig
    componentsAlias = options.components ?? componentsAlias
    utilsAlias = options.utils ?? utilsAlias
  }

  return rawConfigSchema.parse({
    $schema: 'https://shadcn-vue.com/schema.json',
    base,
    style,
    font,
    iconLibrary,
    tailwind: {
      config: tailwindConfig,
      css: tailwindCss,
      baseColor,
      cssVariables: tailwindCssVariables,
      prefix: tailwindPrefix,
    },
    typescript,
    aliases: {
      utils: utilsAlias,
      components: componentsAlias,
      // TODO: fix this.
      lib: componentsAlias.replace(/\/components$/, '/lib'),
      composables: componentsAlias.replace(/\/components$/, '/composables'),
    },
  })
}

async function promptForMinimalConfig(
  defaultConfig: Config,
  opts: z.infer<typeof initOptionsSchema>,
) {
  let base = opts.base ?? defaultConfig.base ?? 'reka'
  let style = opts.style ?? defaultConfig.style
  let iconLibrary = opts.iconLibrary ?? defaultConfig.iconLibrary ?? 'lucide'
  let font = opts.font ?? defaultConfig.font ?? 'inter'
  let baseColor = opts.baseColor
  let cssVariables = defaultConfig.tailwind.cssVariables

  if (opts.preset === undefined && !opts.defaults) {
    const [styles, baseColors, tailwindVersion] = await Promise.all([
      getRegistryStyles(),
      getRegistryBaseColors(),
      getProjectTailwindVersionFromConfig(defaultConfig),
    ])

    const options = await prompts([
      {
        type: opts.base ? null : 'select',
        name: 'base',
        message: `Which ${highlighter.info('component library')} would you like to use?`,
        choices: BASES.map(b => ({
          title: b.label,
          value: b.name,
          description: b.description,
        })),
        initial: 0,
      },
      {
        type: tailwindVersion === 'v4' || opts.style ? null : 'select',
        name: 'style',
        message: `Which ${highlighter.info('visual style')} would you like to use?`,
        choices: [
          ...STYLES.map(s => ({
            title: s.name === 'vega' ? 'Vega (Recommended)' : s.label,
            value: s.name,
            description: s.description,
          })),
          ...styles.filter(s => !STYLES.find(st => st.name === s.name)).map(s => ({
            title: s.label,
            value: s.name,
          })),
        ],
        initial: 0,
      },
      {
        type: opts.iconLibrary ? null : 'select',
        name: 'iconLibrary',
        message: `Which ${highlighter.info('icon library')} would you like to use?`,
        choices: ICON_LIBRARIES.map(lib => ({
          title: lib.label,
          value: lib.name,
        })),
        initial: 0,
      },
      {
        type: opts.font ? null : 'select',
        name: 'font',
        message: `Which ${highlighter.info('font')} would you like to use?`,
        choices: FONTS.map(f => ({
          title: f.label,
          value: f.name,
        })),
        initial: 0,
      },
      {
        type: opts.baseColor ? null : 'select',
        name: 'tailwindBaseColor',
        message: `Which color would you like to use as the ${highlighter.info(
          'base color',
        )}?`,
        choices: baseColors.map(color => ({
          title: color.label,
          value: color.name,
        })),
      },
    ])

    base = options.base ?? base
    style = options.style ?? style ?? 'vega'
    iconLibrary = options.iconLibrary ?? iconLibrary
    font = options.font ?? font
    baseColor = options.tailwindBaseColor ?? baseColor
    cssVariables = opts.cssVariables
  }

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    base,
    style,
    font,
    iconLibrary,
    tailwind: {
      ...defaultConfig?.tailwind,
      baseColor,
      cssVariables,
    },
    typescript: defaultConfig.typescript,
    aliases: defaultConfig?.aliases,
  })
}
