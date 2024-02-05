import { existsSync, promises as fs, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { Command } from 'commander'
import ora from 'ora'
import prompts from 'prompts'
import * as z from 'zod'
import { addDependency, addDevDependency } from 'nypm'
import { transform } from '@/src/utils/transformers'
import { getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
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
        consola.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        consola.warn(`Configuration is missing. Please run ${colors.green('init')} to create a components.json file.`)

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
        consola.warn('No components selected. Exiting.')
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedComponents)
      const payload = await fetchTree(config.style, tree)
      const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)

      if (!payload.length) {
        consola.warn('Selected components not found. Exiting.')
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
              consola.info(
                `Skipped ${item.name}. To overwrite, run with the ${colors.green(
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

        const componentDir = path.resolve(targetDir, item.name)
        if (!existsSync(componentDir))
          await fs.mkdir(componentDir, { recursive: true })

        const files = item.files.map(file => ({
          ...file,
          path: path.resolve(
            targetDir,
            item.name,
            file.name,
          ),
        }))

        // We need to write original files to disk if we're not using TypeScript.
        // Rewrite or delete added files after transformed
        if (!config.typescript) {
          for (const file of files)
            await fs.writeFile(file.path, file.content)
        }

        for (const file of files) {
          // Run transformers.
          const content = await transform({
            filename: file.path,
            raw: file.content,
            config,
            baseColor,
          })

          let filePath = file.path

          if (!config.typescript) {
            // remove original .ts file if we're not using TypeScript.
            if (file.path.endsWith('.ts')) {
              if (existsSync(file.path))
                rmSync(file.path)
            }
            filePath = file.path.replace(/\.ts$/, '.js')
          }

          await fs.writeFile(filePath, content)
        }

        // Install dependencies.

        await Promise.allSettled(
          [
            () => {
              if (item.dependencies?.length) {
                return addDependency(item.dependencies, {
                  cwd,
                })
              }
            },
            () => {
              if (item.devDependencies?.length) {
                return addDevDependency(item.devDependencies, {
                  cwd,
                })
              }
            },
          ],
        )
      }
      spinner.succeed('Done.')
    }
    catch (error) {
      handleError(error)
    }
  })
