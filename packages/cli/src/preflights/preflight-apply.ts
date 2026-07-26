import fs from 'fs-extra'
import path from 'pathe'
import * as ERRORS from '@/src/utils/errors'
import { getConfig } from '@/src/utils/get-config'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'

export async function preFlightApply(options: { cwd: string }) {
  const errors: Record<string, boolean> = {}

  if (
    !fs.existsSync(options.cwd)
    || !fs.existsSync(path.resolve(options.cwd, 'package.json'))
  ) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      config: null,
    }
  }

  if (!fs.existsSync(path.resolve(options.cwd, 'components.json'))) {
    errors[ERRORS.MISSING_CONFIG] = true
    return {
      errors,
      config: null,
    }
  }

  try {
    const config = await getConfig(options.cwd)
    if (!config) {
      reportInvalidConfig(options.cwd)
    }

    return {
      errors,
      config,
    }
  }
  catch {
    reportInvalidConfig(options.cwd)
  }
}

function reportInvalidConfig(cwd: string): never {
  logger.break()
  logger.error(
    `An invalid or empty ${highlighter.info(
      'components.json',
    )} file was found at ${highlighter.info(
      cwd,
    )}.\nBefore you can apply a preset, you must create a valid ${highlighter.info(
      'components.json',
    )} file by running the ${highlighter.info('init')} command.`,
  )
  logger.break()
  process.exit(1)
}
