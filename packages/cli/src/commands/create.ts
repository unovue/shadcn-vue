import { Command } from 'commander'
import path from 'pathe'
import prompts from 'prompts'
import { z } from 'zod'
import {
  BASE_COLORS,
  BASES,
  FONTS,
  ICON_LIBRARIES,
  PRESETS,
  STYLES,
} from '@/src/registry/constants'
import { createProject, TEMPLATES } from '@/src/utils/create-project'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { runInit } from './init'

export const createOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  preset: z.string().optional(),
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
        message: 'Invalid template. Please use \'nuxt\', \'vite\', or \'start\'.',
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
})

export const create = new Command()
  .name('create')
  .description('create a new project with full design system customization')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-p, --preset <preset>',
    `use a preset configuration. (${PRESETS.map(p => p.name).join(', ')})`,
  )
  .option(
    '-t, --template <template>',
    'the framework template to use. (nuxt, vite, start)',
  )
  .option(
    '--base <base>',
    'the component library base to use. (reka)',
  )
  .option(
    '--style <style>',
    'the visual style to use. (vega, nova, maia, lyra, mira)',
  )
  .option(
    '--icon-library <icon-library>',
    'the icon library to use. (lucide, tabler, hugeicons, phosphor, remixicon)',
  )
  .option(
    '--font <font>',
    'the font to use. (inter, figtree, jetbrains-mono, geist, geist-mono)',
  )
  .option(
    '-b, --base-color <base-color>',
    'the base color to use. (neutral, gray, zinc, stone, slate)',
  )
  .action(async (opts) => {
    try {
      const options = createOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        ...opts,
      })

      logger.info('')
      logger.info(
        `${highlighter.info('shadcn-vue')} - Create a new Vue project with shadcn components.`,
      )
      logger.info('')

      // If a preset is provided, use it
      let preset = null
      if (options.preset) {
        preset = PRESETS.find(p => p.name === options.preset)
        if (!preset) {
          logger.error(
            `Invalid preset "${options.preset}". Available presets: ${PRESETS.map(p => p.name).join(', ')}`,
          )
          process.exit(1)
        }
      }

      // Prompt for configuration if not using preset
      let config = {
        template: options.template,
        base: options.base ?? preset?.base,
        style: options.style ?? preset?.style,
        iconLibrary: options.iconLibrary ?? preset?.iconLibrary,
        font: options.font ?? preset?.font,
        baseColor: options.baseColor ?? preset?.baseColor,
      }

      if (!options.yes) {
        const answers = await prompts([
          {
            type: config.template ? null : 'select',
            name: 'template',
            message: `Which ${highlighter.info('framework')} would you like to use?`,
            choices: [
              { title: 'Nuxt', value: 'nuxt', description: 'Full-stack Vue framework with file-based routing' },
              { title: 'Vite', value: 'vite', description: 'Fast build tool with Vue SPA template' },
              { title: 'TanStack Start', value: 'start', description: 'Modern full-stack framework' },
            ],
            initial: 0,
          },
          {
            type: preset ? null : 'select',
            name: 'usePreset',
            message: `Would you like to use a ${highlighter.info('preset')}?`,
            choices: [
              { title: 'No, customize everything', value: false },
              ...PRESETS.map(p => ({
                title: p.title,
                value: p.name,
                description: p.description,
              })),
            ],
            initial: 0,
          },
        ])

        config.template = answers.template ?? config.template ?? 'nuxt'

        // If user selected a preset
        if (answers.usePreset && answers.usePreset !== false) {
          const selectedPreset = PRESETS.find(p => p.name === answers.usePreset)
          if (selectedPreset) {
            config = {
              template: config.template,
              base: selectedPreset.base,
              style: selectedPreset.style,
              iconLibrary: selectedPreset.iconLibrary,
              font: selectedPreset.font,
              baseColor: selectedPreset.baseColor,
            }
          }
        }
        else if (!preset) {
          // Custom configuration prompts
          const customAnswers = await prompts([
            {
              type: config.base ? null : 'select',
              name: 'base',
              message: `Which ${highlighter.info('component library')} would you like to use?`,
              choices: BASES.map(base => ({
                title: base.label,
                value: base.name,
                description: base.description,
              })),
              initial: 0,
            },
            {
              type: config.style ? null : 'select',
              name: 'style',
              message: `Which ${highlighter.info('visual style')} would you like to use?`,
              choices: STYLES.map(style => ({
                title: style.label,
                value: style.name,
                description: style.description,
              })),
              initial: 0,
            },
            {
              type: config.iconLibrary ? null : 'select',
              name: 'iconLibrary',
              message: `Which ${highlighter.info('icon library')} would you like to use?`,
              choices: ICON_LIBRARIES.map(lib => ({
                title: lib.label,
                value: lib.name,
              })),
              initial: 0,
            },
            {
              type: config.font ? null : 'select',
              name: 'font',
              message: `Which ${highlighter.info('font')} would you like to use?`,
              choices: FONTS.map(font => ({
                title: font.label,
                value: font.name,
              })),
              initial: 0,
            },
            {
              type: config.baseColor ? null : 'select',
              name: 'baseColor',
              message: `Which ${highlighter.info('base color')} would you like to use?`,
              choices: BASE_COLORS.map(color => ({
                title: color.label,
                value: color.name,
              })),
              initial: 0,
            },
          ])

          config = {
            template: config.template,
            base: customAnswers.base ?? config.base ?? 'reka',
            style: customAnswers.style ?? config.style ?? 'vega',
            iconLibrary: customAnswers.iconLibrary ?? config.iconLibrary ?? 'lucide',
            font: customAnswers.font ?? config.font ?? 'inter',
            baseColor: customAnswers.baseColor ?? config.baseColor ?? 'neutral',
          }
        }
      }
      else {
        // Apply defaults if --yes flag is used
        config = {
          template: config.template ?? 'nuxt',
          base: config.base ?? 'reka',
          style: config.style ?? 'vega',
          iconLibrary: config.iconLibrary ?? 'lucide',
          font: config.font ?? 'inter',
          baseColor: config.baseColor ?? 'neutral',
        }
      }

      // Create the project
      const { projectPath, projectName, template } = await createProject({
        cwd: options.cwd,
        force: false,
        template: config.template,
      })

      if (!projectPath) {
        logger.error('Failed to create project.')
        process.exit(1)
      }

      logger.info('')
      logger.info(`Created ${highlighter.info(projectName)} with ${highlighter.info(template)} template.`)
      logger.info('')

      // Initialize shadcn-vue in the new project
      await runInit({
        cwd: projectPath,
        yes: true,
        defaults: false,
        force: true,
        silent: false,
        isNewProject: true,
        cssVariables: true,
        baseStyle: true,
        template: config.template,
        base: config.base,
        style: config.style,
        iconLibrary: config.iconLibrary,
        font: config.font,
        baseColor: config.baseColor,
        skipPreflight: true,
      })

      logger.break()
      logger.info(`${highlighter.success('Success!')} Project created at ${highlighter.info(projectPath)}`)
      logger.break()
      logger.info('Next steps:')
      logger.info(`  cd ${projectName}`)
      logger.info('  npm run dev')
      logger.break()
    }
    catch (error) {
      logger.break()
      handleError(error)
    }
  })
