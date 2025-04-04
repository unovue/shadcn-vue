import type { RegistryItem } from '@/src/registry/schema'
import type { Config } from '@/src/utils/get-config'
import { spinner } from '@/src/utils/spinner'
import { addDependency } from 'nypm'

export async function updateDependencies(
  dependencies: RegistryItem['dependencies'],
  config: Config,
  options: {
    silent?: boolean
  },
) {
  dependencies = Array.from(new Set(dependencies))
  if (!dependencies?.length) {
    return
  }

  options = {
    silent: false,
    ...options,
  }

  const dependenciesSpinner = spinner(`Installing dependencies.`, { silent: options.silent })?.start()
  dependenciesSpinner?.start()

  await addDependency(dependencies, { cwd: config.resolvedPaths.cwd })
  dependenciesSpinner?.succeed()
}
