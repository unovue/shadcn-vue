import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { Command } from 'commander'
import { type Change, diffLines } from 'diff'
import * as z from 'zod'
import type { Config } from '@/src/utils/get-config'
import { getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
} from '@/src/utils/registry'
import type { registryIndexSchema } from '@/src/utils/registry/schema'
import { transform } from '@/src/utils/transformers'

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

      const config = await getConfig(cwd)
      if (!config) {
        consola.warn(
          `Configuration is missing. Please run ${colors.green(
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
      }

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

        console.log('')
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
        console.log('')
      }
    }
    catch (error) {
      handleError(error)
    }
  })

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
