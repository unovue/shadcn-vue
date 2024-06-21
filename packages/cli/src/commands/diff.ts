import { existsSync } from 'node:fs'
import process from 'node:process'
import path from 'pathe'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { Command } from 'commander'
import { z } from 'zod'
import frameworksCommands from './frameworks'
import { handleError } from '@/src/utils/handle-error'

const updateOptionsSchema = z.object({
  component: z.string().optional(),
  yes: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
})

export const diff = new Command()
  .name('diff')
  .description('check for updates against the registry')
  .argument('[component]', 'the component name')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (name, opts) => {
    try {
      const options = updateOptionsSchema.parse({
        component: name,
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
      const { loadConfig, diff } = frameworksCommands[framework]

      // Load Config
      const config = await loadConfig(cwd, options)
      if (!config) {
        consola.warn(
          `Configuration is missing. Please run ${colors.green(
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
      }

      // Run Diff Command
      await diff(cwd, config, options)
    }
    catch (error) {
      handleError(error)
    }
  })
