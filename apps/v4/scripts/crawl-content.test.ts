import assert from 'node:assert/strict'
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { crawlUI } from './crawl-content'

const root = await mkdtemp(path.join(tmpdir(), 'form-registry-'))
const appRoot = fileURLToPath(new URL('../', import.meta.url))

try {
  await symlink(path.join(appRoot, 'node_modules'), path.join(root, 'node_modules'), 'dir')
  for (const [name, source] of [
    ['rules', '<script setup>import { useForm } from "vee-validate"; useForm()</script>'],
    ['schema', '<script setup>import { toTypedSchema } from "@vee-validate/zod"; import * as z from "zod"; toTypedSchema(z.object({}))</script>'],
  ]) {
    await mkdir(path.join(root, name))
    await writeFile(path.join(root, name, 'Example.vue'), source)
  }

  for (const [name, base] of [['legacy-form', 'new-york-v4'], ['base-form', 'bases/reka']]) {
    await cp(path.join(appRoot, 'registry', base, 'ui/form'), path.join(root, name), { recursive: true })
  }

  const items = await crawlUI(root)
  for (const name of ['rules', 'legacy-form', 'base-form']) {
    const item = items.find(item => item.name === name)!
    assert.ok(item.dependencies?.includes('vee-validate'), `${name} needs vee-validate`)
    assert.ok(!item.dependencies?.some(dep => dep === '@vee-validate/zod' || /^zod(?:@|$)/.test(dep)), `${name} must not install a schema library`)
  }

  const schema = items.find(item => item.name === 'schema')!
  assert.deepEqual(schema.dependencies, ['@vee-validate/zod', 'zod@3.25.76'])
  console.log('crawl-content: schema dependencies are opt-in')
}
finally {
  await rm(root, { recursive: true, force: true })
}
