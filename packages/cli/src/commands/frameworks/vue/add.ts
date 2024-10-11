import { existsSync, promises as fs, rmSync } from 'node:fs'
import { addDependency, addDevDependency } from 'nypm'
import { consola } from 'consola'
import path from 'pathe'
import ora from 'ora'
import prompts from 'prompts'
import { colors } from 'consola/utils'
import type { Config } from '../../../utils/get-config'
import { transform } from '@/src/utils/transformers'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from '@/src/utils/registry'

interface AddOptions {

  yes: boolean
  overwrite: boolean
  cwd: string
  all: boolean
  path?: string | undefined
  components?: string[] | undefined

}

export default async function (cwd: string, config: Config, options: AddOptions) {
  const registryIndex = await getRegistryIndex()

  let selectedComponents = options.all
    ? registryIndex.map(entry => entry.name)
    : options.components
  if (!options.components?.length && !options.all) {
    const { components } = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Which components would you like to add?',
      hint: 'Space to select. A to toggle all. Enter to submit.',
      instructions: false,
      choices: registryIndex.map(entry => ({
        title: entry.name,
        value: entry.name,
        selected: options.all
          ? true
          : options.components?.includes(entry.name),
      })),
    })
    selectedComponents = components
  }

  if (!selectedComponents?.length) {
    consola.warn('No components selected. Exiting.')
    process.exit(0)
  }

  const tree = await resolveTree(registryIndex, selectedComponents)
  const payload = await fetchTree(config.style, tree)
  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)

  if (!payload.length) {
    consola.warn('Selected components not found. Exiting.')
    process.exit(0)
  }

  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Ready to install components and dependencies. Proceed?',
      initial: true,
    })

    if (!proceed)
      process.exit(0)
  }

  const spinner = ora('Installing components...').start()
  for (const item of payload) {
    spinner.text = `Installing ${item.name}...`
    const targetDir = getItemTargetPath(
      config,
      item,
      options.path ? path.resolve(cwd, options.path) : undefined,
    )

    if (!targetDir)
      continue

    if (!existsSync(targetDir))
      await fs.mkdir(targetDir, { recursive: true })

    const existingComponent = item.files.filter(file =>
      existsSync(path.resolve(targetDir, item.name, file.name)),
    )

    if (existingComponent.length && !options.overwrite) {
      if (selectedComponents.includes(item.name)) {
        spinner.stop()
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Component ${item.name} already exists. Would you like to overwrite?`,
          initial: false,
        })

        if (!overwrite) {
          consola.info(
            `Skipped ${item.name}. To overwrite, run with the ${colors.green(
              '--overwrite',
            )} flag.`,
          )
          continue
        }

        spinner.start(`Installing ${item.name}...`)
      }
      else {
        continue
      }
    }

    // Install dependencies.
    await Promise.allSettled(
      [
        item.dependencies?.length && await addDependency(item.dependencies, {
          cwd,
          silent: true,
        }),
        item.devDependencies?.length && await addDevDependency(item.devDependencies, {
          cwd,
          silent: true,
        }),
      ],
    )

    const componentDir = path.resolve(targetDir, item.name)
    if (!existsSync(componentDir))
      await fs.mkdir(componentDir, { recursive: true })

    const files = item.files.map(file => ({
      ...file,
      path: path.resolve(
        targetDir,
        item.name,
        file.name,
      ),
    }))

    // We need to write original files to disk if we're not using TypeScript.
    // Rewrite or delete added files after transformed
    if (!config.typescript) {
      for (const file of files)
        await fs.writeFile(file.path, file.content)
    }

    for (const file of files) {
      // Run transformers.
      const content = await transform({
        filename: file.path,
        raw: file.content,
        config,
        baseColor,
      })

      let filePath = file.path

      if (!config.typescript) {
        // remove original .ts file if we're not using TypeScript.
        if (file.path.endsWith('.ts')) {
          if (existsSync(file.path))
            rmSync(file.path)
        }
        filePath = file.path.replace(/\.ts$/, '.js')
      }

      await fs.writeFile(filePath, content)
    }
  }

  spinner.succeed('Done.')
}
