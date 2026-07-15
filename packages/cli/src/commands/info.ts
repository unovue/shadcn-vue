import { Command } from 'commander'
import consola from 'consola'
import { getConfig } from '@/src/utils/get-config'
import { getProjectInfo } from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'

export const info = new Command()
  .name('info')
  .description('get information about your project')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('--json', 'output as JSON.', false)
  .action(async (opts) => {
    try {
      const projectInfo = await getProjectInfo(opts.cwd)
      const config = await getConfig(opts.cwd)

      if (opts.json) {
        consola.log(
          JSON.stringify(
            {
              project: projectInfo ?? null,
              config: config ?? null,
            },
            null,
            2,
          ),
        )
        return
      }

      logger.info('> project info')
      consola.log(projectInfo)
      logger.break()
      logger.info('> components.json')
      consola.log(config)
    }
    catch (error) {
      handleError(error)
    }
  })
