import { Command } from 'commander'
import consola from 'consola'
import path from 'pathe'
import { getBase } from '@/src/commands/apply'
import { getShadcnRegistryIndex } from '@/src/registry/api'
import { BASES, SHADCN_VUE_URL } from '@/src/registry/constants'
import { getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'

export const docs = new Command()
  .name('docs')
  .description('get docs, api references and usage examples for components')
  .argument('<components...>', 'component names')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option(
    '-b, --base <base>',
    'the base to use (reka). defaults to project base.',
  )
  .option('--json', 'output as JSON.', false)
  .action(async (components: string[], opts) => {
    try {
      const cwd = path.resolve(opts.cwd)
      const config = await getConfig(cwd)
      const base = opts.base ?? getBase(config?.style)

      const index = await getShadcnRegistryIndex()

      if (!index) {
        logger.error('Failed to fetch the registry index.')
        process.exit(1)
      }

      const results: {
        component: string
        base: string
        links: Record<string, string>
      }[] = []

      for (const component of components) {
        const item = index.find(entry => entry.name === component)

        if (!item) {
          logger.error(
            `Component ${highlighter.info(
              component,
            )} not found in the shadcn-vue registry.`,
          )
          process.exit(1)
        }

        // Use meta.links from the registry if available, otherwise generate
        // default documentation links from the shadcn-vue website URL.
        const metaLinks = (
          item.meta?.links as Record<string, Record<string, string>> | undefined
        )?.[base]

        let links: Record<string, string>
        if (metaLinks && Object.keys(metaLinks).length > 0) {
          links = metaLinks
        }
        else {
          const fallbackUrl = `${SHADCN_VUE_URL}/docs/components/${component}`
          links = {
            docs: base === BASES[0].name ? fallbackUrl : `${fallbackUrl}?base=${encodeURIComponent(base)}`,
          }
        }

        results.push({ component, base, links })
      }

      if (opts.json) {
        consola.log(JSON.stringify({ base, results }, null, 2))
        return
      }

      if (results.length === 0) {
        return
      }

      // Compute max key length across all results for consistent alignment.
      const maxKeyLength = Math.max(
        ...results.flatMap(r => Object.keys(r.links).map(k => k.length)),
      )

      for (const { component, links } of results) {
        logger.log(highlighter.info(component))
        for (const [key, value] of Object.entries(links)) {
          logger.log(`  - ${key.padEnd(maxKeyLength + 2)}${value}`)
        }
        logger.break()
      }
    }
    catch (error) {
      handleError(error)
    }
  })
