import type { PackageManagerName } from 'nypm'
import type { RegistryItem } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import fs from 'node:fs'
import path from 'node:path'
import { addDependency, addDevDependency, detectPackageManager } from 'nypm'
import { spinner } from '@/src/utils/spinner'

export type SupportedPackageManager = PackageManagerName

/**
 * Detect the package manager in use for `cwd`. Mirrors shadcn-ui's
 * `getPackageManager` API.
 *
 * Detection order:
 * 1. `nypm.detectPackageManager` (lockfile / `packageManager` field)
 * 2. `node_modules/.pnpm` directory — strong signal pnpm was used even when
 *    the lockfile is missing (e.g. interrupted prior install)
 * 3. With `withFallback: true`, the parent process' `npm_config_user_agent`
 *    (e.g. `pnpm dlx` exports `pnpm/<version> ...`)
 * 4. Fallback to `'npm'`
 */
export async function getPackageManager(
  cwd: string,
  { withFallback }: { withFallback?: boolean } = { withFallback: false },
): Promise<SupportedPackageManager> {
  const detected = await detectPackageManager(cwd)
  if (detected?.name) {
    return detected.name
  }

  if (fs.existsSync(path.join(cwd, 'node_modules', '.pnpm'))) {
    return 'pnpm'
  }

  if (!withFallback) {
    return 'npm'
  }

  return getPackageManagerFromUserAgent() ?? 'npm'
}

export function getPackageManagerFromUserAgent(
  userAgent: string = process.env.npm_config_user_agent ?? '',
): SupportedPackageManager | null {
  if (userAgent.startsWith('pnpm'))
    return 'pnpm'
  if (userAgent.startsWith('yarn'))
    return 'yarn'
  if (userAgent.startsWith('bun'))
    return 'bun'
  if (userAgent.startsWith('deno'))
    return 'deno'
  if (userAgent.startsWith('npm'))
    return 'npm'
  return null
}

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

  const dependenciesSpinner = spinner(`Installing dependencies.`, {
    silent: options.silent,
  })?.start()

  const packageManager = await getPackageManager(config.resolvedPaths.cwd, {
    withFallback: true,
  })

  await installWithPackageManager(
    packageManager,
    dependencies,
    devDependencies,
    config.resolvedPaths.cwd,
    options.silent,
  )

  dependenciesSpinner?.succeed()
}

async function installWithPackageManager(
  packageManager: SupportedPackageManager,
  dependencies: string[],
  devDependencies: string[],
  cwd: string,
  silent: boolean,
) {
  const options = {
    cwd,
    packageManager,
    silent,
  }

  if (dependencies?.length) {
    await addDependency(dependencies, options)
  }

  if (devDependencies?.length) {
    await addDevDependency(devDependencies, options)
  }
}
