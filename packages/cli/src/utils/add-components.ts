import type { Config, configSchema } from '@/src/utils/get-config'
import type { z } from 'zod'
import { getProjectTailwindVersionFromConfig } from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { logger } from '@/src/utils/logger'
import { registryResolveItemsTree } from '@/src/utils/registry'
import { spinner } from '@/src/utils/spinner'
import { updateCssVars } from '@/src/utils/updaters/update-css-vars'
import { updateDependencies } from '@/src/utils/updaters/update-dependencies'
import { updateFiles } from '@/src/utils/updaters/update-files'
import { updateTailwindConfig } from '@/src/utils/updaters/update-tailwind-config'

export async function addComponents(
  components: string[],
  config: Config,
  options: {
    overwrite?: boolean
    silent?: boolean
    isNewProject?: boolean
  },
) {
  options = {
    overwrite: false,
    silent: false,
    isNewProject: false,
    ...options,
  }

  // TODO: Add workspace component
  return await addProjectComponents(components, config, options)
}

async function addProjectComponents(
  components: string[],
  config: z.infer<typeof configSchema>,
  options: {
    overwrite?: boolean
    silent?: boolean
    isNewProject?: boolean
  },
) {
  const registrySpinner = spinner(`Checking registry.`, {
    silent: options.silent,
  })?.start()
  const tree = await registryResolveItemsTree(components, config)
  if (!tree) {
    registrySpinner?.fail()
    return handleError(new Error('Failed to fetch components from registry.'))
  }
  registrySpinner?.succeed()

  const tailwindVersion = await getProjectTailwindVersionFromConfig(config)

  await updateTailwindConfig(tree.tailwind?.config, config, {
    silent: options.silent,
    tailwindVersion,
  })
  await updateCssVars(tree.cssVars, config, {
    cleanupDefaultNextStyles: options.isNewProject,
    silent: options.silent,
    tailwindVersion,
    tailwindConfig: tree.tailwind?.config,
  })

  await updateDependencies(tree.dependencies, config, {
    silent: options.silent,
  })
  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  })

  if (tree.docs) {
    logger.info(tree.docs)
  }
}
