import { existsSync, promises as fs } from 'node:fs'
import { consola } from 'consola'
import path from 'pathe'
import { colors } from 'consola/utils'
import { type Change, diffLines } from 'diff'
import type { z } from 'zod'
import type { Config } from '../../../utils/get-config'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
} from '@/src/utils/registry'
import type { registryIndexSchema } from '@/src/utils/registry/schema'
import { transform } from '@/src/utils/transformers'

interface DiffOptions {
  yes: boolean
  cwd: string
  path?: string
  component?: string
}

export default async function (cwd: string, config: Config, options: DiffOptions) {
  const registryIndex = await getRegistryIndex()

  if (!options.component) {
    const targetDir = config.resolvedPaths.components

    // Find all components that exist in the project.
    const projectComponents = registryIndex.filter((item) => {
      for (const file of item.files) {
        const filePath = path.resolve(targetDir, file)
        if (existsSync(filePath))
          return true
      }

      return false
    })

    // Check for updates.
    const componentsWithUpdates = []
    for (const component of projectComponents) {
      const changes = await diffComponent(component, config)
      if (changes.length) {
        componentsWithUpdates.push({
          name: component.name,
          changes,
        })
      }
    }

    if (!componentsWithUpdates.length) {
      consola.info('No updates found.')
      process.exit(0)
    }

    consola.info('The following components have updates available:')
    for (const component of componentsWithUpdates) {
      consola.info(`- ${component.name}`)
      for (const change of component.changes)
        consola.info(`  - ${change.filePath}`)
    }

    consola.log('')
    consola.info(
      `Run ${colors.green('diff <component>')} to see the changes.`,
    )
    process.exit(0)
  }

  // Show diff for a single component.
  const component = registryIndex.find(
    item => item.name === options.component,
  )

  if (!component) {
    consola.error(
      `The component ${colors.green(options.component)} does not exist.`,
    )
    process.exit(1)
  }

  const changes = await diffComponent(component, config)

  if (!changes.length) {
    consola.info(`No updates found for ${options.component}.`)
    process.exit(0)
  }

  for (const change of changes) {
    consola.info(`- ${change.filePath}`)
    printDiff(change.patch)
    consola.log('')
  }
}

async function diffComponent(
  component: z.infer<typeof registryIndexSchema>[number],
  config: Config,
) {
  const payload = await fetchTree(config.style, [component])
  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)

  const changes = []

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item)

    if (!targetDir)
      continue

    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file.name)

      if (!existsSync(filePath))
        continue

      const fileContent = await fs.readFile(filePath, 'utf8')

      const registryContent = await transform({
        filename: file.name,
        raw: file.content,
        config,
        baseColor,
      })

      const patch = diffLines(registryContent as string, fileContent)
      if (patch.length > 1) {
        changes.push({
          file: file.name,
          filePath,
          patch,
        })
      }
    }
  }

  return changes
}

// TODO: Does is it need to async?
function printDiff(diff: Change[]) {
  diff.forEach((part) => {
    if (part) {
      if (part.added)
        return process.stdout.write(colors.green(part.value))

      if (part.removed)
        return process.stdout.write(colors.red(part.value))

      return process.stdout.write(part.value)
    }
  })
}
