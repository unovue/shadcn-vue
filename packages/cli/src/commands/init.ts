import { existsSync } from 'node:fs'
import process from 'node:process'
import path from 'pathe'
import { Command } from 'commander'
import { z } from 'zod'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { handleError } from '../utils/handle-error'
import frameworksCommands from './frameworks'

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

      // Get the corresponding framework commands
      // TODO: Pass this to action inside a `context` argument to the function
      const framework = 'vue'
      const { loadConfig, init } = frameworksCommands[framework]

      // Read config
      const config = await loadConfig(cwd, options)

      // Init
      await init(cwd, config)

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
