import { Command } from 'commander'
import fs from 'fs-extra'
import { detectPackageManager } from 'nypm'
import { ofetch } from 'ofetch'
import open from 'open'
import path from 'pathe'
import prompts from 'prompts'
import validateProjectName from 'validate-npm-package-name'
import { z } from 'zod'
import {
  BASE_COLORS,
  BASES,
  FONTS,
  ICON_LIBRARIES,
  PRESETS,
  STYLES,
} from '@/src/registry/constants'
import { isUrl } from '@/src/registry/utils'
import { createProject, TEMPLATES } from '@/src/utils/create-project'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { runInit } from './init'

const SHADCN_VUE_URL = 'https://shadcn-vue.com'

export const createOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  name: z.string().optional(),
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
        message: `Invalid template. Please use ${Object.keys(TEMPLATES).map(t => `'${t}'`).join(', ')}.`,
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
  srcDir: z.boolean().optional(),
  rtl: z.boolean().optional(),
})

/**
 * Resolve a preset by name or URL.
 */
async function resolvePreset(value: string) {
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
  return PRESETS.find(p => p.name === value) ?? null
}

/**
 * Validate a project name using npm package name rules.
 * Returns an error string, or true if valid.
 */
export function validateName(name: string): string | true {
  const { validForNewPackages, errors, warnings } = validateProjectName(name)
  if (!validForNewPackages) {
    const issues = [...(errors ?? []), ...(warnings ?? [])]
    return issues.length > 0 ? issues[0] : 'Invalid project name.'
  }
  return true
}

/**
 * Build the shadcn-vue visual create URL for browser redirect.
 */
export function getShadcnCreateUrl(params?: Record<string, string>) {
  const url = new URL(`${SHADCN_VUE_URL}/create`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
  }
  return url.toString()
}

/**
 * Return template-specific boilerplate files to write after init,
 * so the new project shows something useful on first run.
 */
export function getTemplateFiles(template: string): Array<{ target: string, content: string }> {
  if (template === 'nuxt') {
    return [
      {
        target: 'app.vue',
        content: `<template>
  <div class="min-h-svh flex items-center justify-center">
    <NuxtPage />
  </div>
</template>
`,
      },
    ]
  }

  if (template === 'vite') {
    return [
      {
        target: 'src/App.vue',
        content: `<template>
  <div class="min-h-svh flex items-center justify-center">
    <p class="text-muted-foreground text-sm">
      Edit <code>src/App.vue</code> to get started.
    </p>
  </div>
</template>
`,
      },
    ]
  }

  if (template === 'vite-router') {
    return [
      {
        target: 'src/App.vue',
        content: `<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
`,
      },
      {
        target: 'src/views/HomeView.vue',
        content: `<template>
  <div class="min-h-svh flex items-center justify-center">
    <p class="text-muted-foreground text-sm">
      Edit <code>src/views/HomeView.vue</code> to get started.
    </p>
  </div>
</template>
`,
      },
    ]
  }

  return []
}

export const create = new Command()
  .name('create')
  .description('create a new project with full design system customization')
  .argument('[name]', 'the name of the project')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-p, --preset <preset>',
    `use a preset configuration or URL. (${PRESETS.map(p => p.name).join(', ')})`,
  )
  .option(
    '-t, --template <template>',
    `the framework template to use. (${Object.keys(TEMPLATES).join(', ')})`,
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
  .option(
    '--src-dir',
    'use the src directory when creating a new project.',
    false,
  )
  .option(
    '--no-src-dir',
    'do not use the src directory when creating a new project.',
  )
  .option('--rtl', 'enable right-to-left support.', false)
  .action(async (name, opts) => {
    try {
      const options = createOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        name,
        ...opts,
      })

      logger.info('')
      logger.info(
        `${highlighter.info('shadcn-vue')} - Create a new Vue project with shadcn components.`,
      )
      logger.info('')

      // If no name and no preset, open the browser-based visual create UI.
      if (!options.name && !options.preset) {
        const createUrl = getShadcnCreateUrl(
          options.template ? { template: options.template } : undefined,
        )
        logger.info(`Opening ${highlighter.info(createUrl)} in your browser.`)
        logger.info('Configure your project visually and run the generated command.')
        logger.info('')
        await open(createUrl)
        return
      }

      // Validate project name.
      if (options.name) {
        const nameCheck = validateName(options.name)
        if (nameCheck !== true) {
          logger.error(`Invalid project name "${options.name}": ${nameCheck}`)
          process.exit(1)
        }
      }

      // Resolve preset (by name or URL).
      let preset = null
      if (options.preset) {
        preset = await resolvePreset(options.preset)
        if (!preset) {
          logger.error(
            `Invalid preset "${options.preset}". Available presets: ${PRESETS.map(p => p.name).join(', ')}`,
          )
          process.exit(1)
        }
      }

      // Build the initial config from CLI flags / preset.
      let config = {
        name: options.name,
        template: options.template,
        base: options.base ?? preset?.base,
        style: options.style ?? preset?.style,
        iconLibrary: options.iconLibrary ?? preset?.iconLibrary,
        font: options.font ?? preset?.font,
        baseColor: options.baseColor ?? preset?.baseColor,
        srcDir: options.srcDir,
        rtl: options.rtl,
      }

      if (!options.yes) {
        // Prompt for name if not provided as argument.
        if (!config.name) {
          const { name: answeredName } = await prompts({
            type: 'text',
            name: 'name',
            message: 'What is your project named?',
            initial: 'my-vue-app',
            format: (value: string) => value.trim(),
            validate: (value: string) => {
              if (value.length > 128)
                return 'Name should be less than 128 characters.'
              return validateName(value)
            },
          })
          config.name = answeredName
        }

        const answers = await prompts([
          {
            type: config.template ? null : 'select',
            name: 'template',
            message: `Which ${highlighter.info('framework')} would you like to use?`,
            choices: [
              { title: 'Nuxt', value: 'nuxt', description: 'Full-stack Vue framework with file-based routing' },
              { title: 'Vite', value: 'vite', description: 'Fast build tool with Vue SPA template' },
              { title: 'Vite + Vue Router', value: 'vite-router', description: 'Vite with Vue Router for client-side routing' },
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

        if (answers.usePreset && answers.usePreset !== false) {
          const selectedPreset = PRESETS.find(p => p.name === answers.usePreset)
          if (selectedPreset) {
            config = {
              ...config,
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
            ...config,
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
        // Prompt for name if still missing (--yes doesn't provide a default name).
        if (!config.name) {
          const { name: answeredName } = await prompts({
            type: 'text',
            name: 'name',
            message: 'What is your project named?',
            initial: 'my-vue-app',
            format: (value: string) => value.trim(),
            validate: (value: string) => {
              if (value.length > 128)
                return 'Name should be less than 128 characters.'
              return validateName(value)
            },
          })
          config.name = answeredName
        }

        // Apply defaults for all other fields.
        config = {
          ...config,
          template: config.template ?? 'nuxt',
          base: config.base ?? 'reka',
          style: config.style ?? 'vega',
          iconLibrary: config.iconLibrary ?? 'lucide',
          font: config.font ?? 'inter',
          baseColor: config.baseColor ?? 'neutral',
        }
      }

      // Scaffold the framework project.
      const { projectPath, projectName, template } = await createProject({
        cwd: options.cwd,
        force: false,
        name: config.name,
        template: config.template,
      })

      if (!projectPath) {
        logger.error('Failed to create project.')
        process.exit(1)
      }

      logger.info('')
      logger.info(`Created ${highlighter.info(projectName)} with ${highlighter.info(template)} template.`)
      logger.info('')

      // Initialize shadcn-vue in the new project.
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
        srcDir: config.srcDir,
        skipPreflight: true,
      })

      // Write template-specific entry files (shadcn-aware starters).
      const templateFiles = getTemplateFiles(template)
      for (const { target, content } of templateFiles) {
        const filePath = path.join(projectPath, target)
        await fs.ensureDir(path.dirname(filePath))
        await fs.writeFile(filePath, content, 'utf-8')
      }

      // Detect package manager for accurate next-steps output.
      const packageManager = await detectPackageManager(options.cwd)
      const pmRun = packageManager?.name === 'npm'
        ? 'npm run'
        : packageManager?.name ?? 'npm run'

      logger.break()
      logger.info(`${highlighter.success('Success!')} Project created at ${highlighter.info(projectPath)}`)
      logger.break()
      logger.info('Next steps:')
      logger.info(`  cd ${projectName}`)
      logger.info(`  ${pmRun} dev`)
      logger.break()
    }
    catch (error) {
      logger.break()
      handleError(error)
    }
  })
