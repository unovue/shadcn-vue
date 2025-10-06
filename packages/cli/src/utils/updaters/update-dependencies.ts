import type { RegistryItem } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import { addDependency } from 'nypm'
import { spinner } from '@/src/utils/spinner'

export async function updateDependencies(
  dependencies: RegistryItem['dependencies'],
  devDependencies: RegistryItem['devDependencies'],
  config: Config,
  options: {
    silent?: boolean
  },
) {
  dependencies = Array.from(new Set(dependencies))
  devDependencies = Array.from(new Set(devDependencies))

  if (!dependencies?.length && !devDependencies?.length) {
    return
  }

  options = {
    silent: false,
    ...options,
  }

  const dependenciesSpinner = spinner(`Installing dependencies.`, { silent: options.silent })?.start()
  dependenciesSpinner?.start()

  if (dependencies?.length) {
    await addDependency(dependencies, {
      cwd: config.resolvedPaths.cwd,
      silent: true,
      dev: false,
    })
  }

  // Install dev dependencies
  if (devDependencies?.length) {
    await addDependency(devDependencies, {
      cwd: config.resolvedPaths.cwd,
      silent: true,
      dev: true,
    })
  }

  dependenciesSpinner?.succeed()
}
