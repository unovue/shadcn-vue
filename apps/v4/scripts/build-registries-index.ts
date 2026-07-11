import { promises as fs } from 'node:fs'
import path from 'node:path'
import { registriesIndexSchema } from 'shadcn-vue/schema'
import { registries } from '@/registry/registries'
import { buildRegistriesIndex } from './lib/registries-index'

async function main() {
  const index = buildRegistriesIndex(registries)

  // Guard: the output must satisfy the CLI's expectation exactly.
  registriesIndexSchema.parse(index)

  const outPath = path.resolve(process.cwd(), 'public/r/registries.json')
  await fs.writeFile(outPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8')

  console.log(`Wrote ${Object.keys(index).length} registries to ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
