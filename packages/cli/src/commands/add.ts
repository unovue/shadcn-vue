import { existsSync } from 'node:fs'
import process from 'node:process'
import path from 'pathe'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { Command } from 'commander'
import { z } from 'zod'
import frameworksCommands from './frameworks'
import { handleError } from '@/src/utils/handle-error'

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

      // Get the corresponding framework commands
      // TODO: Pass this to action inside a `context` argument to the function
      const framework = 'vue'
      const { loadConfig, add } = frameworksCommands[framework]

      // Read config
      const config = await loadConfig(cwd, options)
      if (!config) {
        consola.warn(`Configuration is missing. Please run ${colors.green('init')} to create a components.json file.`)

        process.exit(1)
      }

      // Add components
      await add(cwd, config, options)
    }
    catch (error) {
      handleError(error)
    }
  })
