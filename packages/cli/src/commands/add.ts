import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import { Command } from 'commander'
import ora from 'ora'
import prompts from 'prompts'
import * as z from 'zod'
import { addDependency, addDevDependency } from 'nypm'
import { transform } from '@/src/utils/transformers'
import { getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from '@/src/utils/registry'

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
})

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt.', true)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green('init')} to create a components.json file.`,
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      let selectedComponents = options.all
        ? registryIndex.map(entry => entry.name)
        : options.components
      if (!options.components?.length && !options.all) {
        const { components } = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Which components would you like to add?',
          hint: 'Space to select. A to toggle all. Enter to submit.',
          instructions: false,
          choices: registryIndex.map(entry => ({
            title: entry.name,
            value: entry.name,
            selected: options.all
              ? true
              : options.components?.includes(entry.name),
          })),
        })
        selectedComponents = components
      }

      if (!selectedComponents?.length) {
        logger.warn('No components selected. Exiting.')
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedComponents)
      const payload = await fetchTree(config.style, tree)
      const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)

      if (!payload.length) {
        logger.warn('Selected components not found. Exiting.')
        process.exit(0)
      }

      if (!options.yes) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: 'Ready to install components and dependencies. Proceed?',
          initial: true,
        })

        if (!proceed)
          process.exit(0)
      }

      const spinner = ora('Installing components...').start()
      for (const item of payload) {
        spinner.text = `Installing ${item.name}...`
        const targetDir = getItemTargetPath(
          config,
          item,
          options.path ? path.resolve(cwd, options.path) : undefined,
        )

        if (!targetDir)
          continue

        if (!existsSync(targetDir))
          await fs.mkdir(targetDir, { recursive: true })

        const existingComponent = item.files.filter(file =>
          existsSync(path.resolve(targetDir, item.name, file.name)),
        )

        if (existingComponent.length && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop()
            const { overwrite } = await prompts({
              type: 'confirm',
              name: 'overwrite',
              message: `Component ${item.name} already exists. Would you like to overwrite?`,
              initial: false,
            })

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  '--overwrite',
                )} flag.`,
              )
              continue
            }

            spinner.start(`Installing ${item.name}...`)
          }
          else {
            continue
          }
        }

        for (const file of item.files) {
          const componentDir = path.resolve(targetDir, item.name)
          let filePath = path.resolve(
            targetDir,
            item.name,
            file.name,
          )

          if (!config.typescript)
            filePath = filePath.replace(/\.ts$/, '.js')

          if (!existsSync(componentDir))
            await fs.mkdir(componentDir, { recursive: true })

          // Run transformers.
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config,
            baseColor,
          })

          await fs.writeFile(filePath, content)
        }

        // Install dependencies.
        if (item.dependencies?.length) {
          await addDependency(item.dependencies, {
            cwd,
          })
        }

        if (item.devDependencies?.length) {
          await addDevDependency(item.devDependencies, {
            cwd,
          })
        }
      }
      spinner.succeed('Done.')
    }
    catch (error) {
      handleError(error)
    }
  })
