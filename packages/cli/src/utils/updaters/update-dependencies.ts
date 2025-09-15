import type { RegistryItem } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import { ensureDependencyInstalled } from 'nypm'
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
    const ensureDeps = dependencies.map(dep => ensureDependencyInstalled(dep, {
      cwd: config.resolvedPaths.cwd,
      // @ts-expect-error type error
      silent: true,
      dev: false,
    }))

    await Promise.all(ensureDeps)
  }

  // Install dev dependencies
  if (devDependencies?.length) {
    const ensureDevDeps = devDependencies.map(dep => ensureDependencyInstalled(dep, {
      cwd: config.resolvedPaths.cwd,
      // @ts-expect-error type error
      silent: true,
      dev: true,
    }))

    await Promise.all(ensureDevDeps)
  }

  dependenciesSpinner?.succeed()
}
