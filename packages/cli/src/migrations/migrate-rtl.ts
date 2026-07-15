import type { Config } from '@/src/utils/get-config'
import { promises as fs } from 'node:fs'
import path from 'pathe'
import prompts from 'prompts'
import { glob } from 'tinyglobby'
import { transform as metaTransform } from 'vue-metamorph'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { spinner } from '@/src/utils/spinner'
import { transformRtl } from '@/src/utils/transformers/transform-rtl'

// Files that may need manual RTL adjustments.
const FILES_NEEDING_MANUAL_REVIEW = [
  'Sidebar.vue',
  'Pagination.vue',
  'Calendar.vue',
]

const RTL_DOCS_URL = 'https://shadcn-vue.com/docs/rtl'

// Per-file RTL transform. Exported for unit testing.
// Runs ONLY the rtl plugin (not the full transformers/index.ts pipeline)
// so the migration doesn't touch imports, css vars, tw prefix, etc.
export function migrateRtlFile(
  content: string,
  filename: string,
  config: Config,
): string {
  return metaTransform(content, filename, [
    transformRtl({
      filename,
      raw: content,
      config: { ...config, rtl: true },
    }),
  ]).code
}

export async function migrateRtl(
  config: Config,
  options: { yes?: boolean, path?: string } = {},
) {
  // Determine files to migrate.
  let files: string[]
  let basePath: string

  if (options.path) {
    // User provided a path/glob.
    basePath = config.resolvedPaths.cwd
    const isGlob = options.path.includes('*')

    if (isGlob) {
      files = await glob(options.path, {
        cwd: basePath,
        onlyFiles: true,
        ignore: ['**/node_modules/**'],
      })
    }
    else {
      const fullPath = path.resolve(basePath, options.path)
      const stat = await fs.stat(fullPath).catch(() => null)

      if (!stat) {
        throw new Error(`File not found: ${options.path}`)
      }

      if (stat.isDirectory()) {
        basePath = fullPath
        files = await glob('**/*.{vue,js,ts,jsx,tsx}', {
          cwd: basePath,
          onlyFiles: true,
          ignore: ['**/node_modules/**'],
        })
      }
      else if (stat.isFile()) {
        files = [options.path]
      }
      else {
        throw new Error(`Unsupported path type: ${options.path}`)
      }
    }

    if (files.length === 0) {
      throw new Error(`No files found matching: ${options.path}`)
    }
  }
  else {
    // Default: use ui path from components.json.
    if (!config.resolvedPaths.ui) {
      throw new Error(
        'Could not find a valid `ui` path in your `components.json`. Please provide a path or glob pattern.',
      )
    }

    basePath = config.resolvedPaths.ui
    files = await glob('**/*.{vue,js,ts,jsx,tsx}', {
      cwd: basePath,
      onlyFiles: true,
    })
  }

  // Confirm with user.
  if (!options.yes) {
    const relativePath = options.path
      ? options.path
      : `./${path.relative(config.resolvedPaths.cwd, basePath)}`

    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      initial: true,
      message: `We will migrate ${highlighter.info(
        String(files.length),
      )} file(s) in ${highlighter.info(relativePath)} to RTL. Continue?`,
    })

    if (!confirm) {
      logger.info('Migration cancelled.')
      process.exit(0)
    }
  }

  // Update components.json to set rtl: true.
  const configSpinner = spinner('Updating components.json...').start()
  try {
    const configPath = path.resolve(config.resolvedPaths.cwd, 'components.json')
    const existingConfig = JSON.parse(await fs.readFile(configPath, 'utf-8'))
    existingConfig.rtl = true
    await fs.writeFile(
      configPath,
      `${JSON.stringify(existingConfig, null, 2)}\n`,
    )
    configSpinner.succeed('Updated components.json.')
  }
  catch {
    configSpinner.fail('Failed to update components.json.')
    throw new Error(
      'Could not update components.json. Please manually set `rtl: true`.',
    )
  }

  // Transform files.
  const migrationSpinner = spinner('Migrating files to RTL...').start()
  let transformedCount = 0
  const filesNeedingReview: string[] = []

  await Promise.all(
    files.map(async (file) => {
      migrationSpinner.text = `Migrating ${file}...`

      const filePath = path.join(basePath, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const transformed = migrateRtlFile(content, filePath, config)

      // Only write if content changed.
      if (transformed !== content) {
        await fs.writeFile(filePath, transformed)
        transformedCount++
      }

      // Check if this file needs manual review.
      const fileName = path.basename(file)
      if (FILES_NEEDING_MANUAL_REVIEW.includes(fileName)) {
        filesNeedingReview.push(file)
      }
    }),
  )

  migrationSpinner.succeed(
    `Migration complete. ${transformedCount} file(s) transformed.`,
  )

  // Show message for files that need manual review.
  if (filesNeedingReview.length > 0) {
    logger.break()
    logger.warn('The following components may need manual RTL adjustments:')
    for (const file of filesNeedingReview) {
      logger.info(`  - ${file}`)
    }
    logger.break()
    logger.info(`See ${highlighter.info(RTL_DOCS_URL)} for more information.`)
  }
}
