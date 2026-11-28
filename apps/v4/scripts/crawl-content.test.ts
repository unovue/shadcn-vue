import assert from 'node:assert/strict'
import { cp, mkdir, mkdtemp, readdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { crawlBlock, crawlExample, crawlLib, crawlUI } from './crawl-content'

const root = await mkdtemp(path.join(tmpdir(), 'form-registry-'))
const uiRoot = path.join(root, 'ui')
const appRoot = fileURLToPath(new URL('../', import.meta.url))

try {
  await mkdir(uiRoot)
  // Windows junctions do not require symbolic-link privileges.
  await symlink(path.join(appRoot, 'node_modules'), path.join(root, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir')
  for (const [name, source] of [
    ['rules', '<script setup>import { useForm } from "vee-validate"; useForm()</script>'],
    ['schema', '<script setup>import { toTypedSchema } from "@vee-validate/zod"; import * as z from "zod"; toTypedSchema(z.object({}))</script>'],
  ]) {
    await mkdir(path.join(uiRoot, name))
    await writeFile(path.join(uiRoot, name, 'Example.vue'), source)
  }

  for (const [name, base] of [['legacy-form', 'new-york-v4'], ['base-form', 'bases/reka']]) {
    await cp(path.join(appRoot, 'registry', base, 'ui/form'), path.join(uiRoot, name), { recursive: true })
  }

  const items = await crawlUI(uiRoot)
  assert.deepEqual(items.map(item => item.name).sort(), ['base-form', 'legacy-form', 'rules', 'schema'])
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

const vaseRoot = await mkdtemp(path.join(tmpdir(), 'vase-registry-'))

try {
  const files: Record<string, Record<string, string>> = {
    'vase-button': {
      'Button.vue': [
        '<script setup lang="ts">',
        'import { Button } from "@vase-ui/vue/button"',
        'import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder"',
        'import { cn } from "@/registry/bases/vase/lib/utils"',
        'import { Spinner } from "@/registry/bases/vase/ui/spinner"',
        '</script>',
      ].join('\n'),
    },
    'bare-setup': {
      'Example.vue': '<script setup lang="ts">import "temporal-polyfill/global"</script>',
    },
    'bare-script': {
      'Example.vue': '<script lang="ts">import "temporal-polyfill/global"\nexport default {}</script>',
    },
    'bare-script-and-setup': {
      'Example.vue': '<script lang="ts">import "temporal-polyfill/global"\nexport default {}</script>\n<script setup lang="ts">import { ref } from "vue"\nref(0)</script>',
    },
    'bare-ts': {
      'polyfill.ts': 'import "temporal-polyfill/global"\n',
    },
  }

  for (const [name, folder] of Object.entries(files)) {
    await mkdir(path.join(vaseRoot, name))
    for (const [file, source] of Object.entries(folder))
      await writeFile(path.join(vaseRoot, name, file), source)
  }

  const items = await crawlUI(vaseRoot)
  const find = (name: string) => items.find(item => item.name === name)!

  assert.deepEqual(find('vase-button').dependencies, ['@vase-ui/vue'])
  assert.deepEqual(find('vase-button').registryDependencies, ['spinner'])

  for (const name of ['bare-setup', 'bare-script', 'bare-script-and-setup', 'bare-ts'])
    assert.deepEqual(find(name).dependencies, ['temporal-polyfill'], `${name} needs temporal-polyfill`)

  // eslint-disable-next-line no-console
  console.log('crawl-content: vase dependencies and bare imports')
}
finally {
  await rm(vaseRoot, { recursive: true, force: true })
}

const temporalRoot = await mkdtemp(path.join(tmpdir(), 'vase-temporal-'))

try {
  const vaseBase = path.join(appRoot, 'registry/bases/vase')
  const uiRoot = path.join(temporalRoot, 'ui')
  const libRoot = path.join(temporalRoot, 'lib')
  const examplesRoot = path.join(temporalRoot, 'examples')
  const blocksRoot = path.join(temporalRoot, 'blocks')
  for (const dir of [uiRoot, libRoot, examplesRoot, blocksRoot])
    await mkdir(dir)

  for (const name of ['calendar', 'range-calendar']) {
    await cp(path.join(vaseBase, 'ui', name), path.join(uiRoot, name), { recursive: true })
    await cp(path.join(vaseBase, 'examples', name), path.join(examplesRoot, name), { recursive: true })
  }
  await cp(path.join(vaseBase, 'lib/temporal.ts'), path.join(libRoot, 'temporal.ts'))
  await cp(path.join(vaseBase, 'blocks/preview-02'), path.join(blocksRoot, 'preview-02'), { recursive: true })

  const uiItems = await crawlUI(uiRoot)
  assert.deepEqual(uiItems.map(item => item.name).sort(), ['calendar', 'range-calendar'])
  for (const item of uiItems) {
    assert.ok(item.registryDependencies?.includes('temporal'), `${item.name} needs the temporal lib item`)
    assert.ok(!item.dependencies?.includes('temporal-polyfill'), `${item.name} leaves temporal-polyfill to the temporal lib item`)
  }

  const libItems = await crawlLib(libRoot)
  assert.deepEqual(libItems.map(item => item.name), ['temporal'])
  assert.deepEqual(libItems[0]!.dependencies, ['temporal-polyfill'])

  const contentItems = [...await crawlExample(examplesRoot), ...await crawlBlock(blocksRoot)]
  assert.deepEqual(contentItems.map(item => item.name).sort(), ['calendar-example', 'preview-02', 'range-calendar-example'])
  for (const item of contentItems)
    assert.ok(item.registryDependencies?.includes('temporal'), `${item.name} needs the temporal lib item`)

  for (const folder of ['ui', 'examples', 'blocks']) {
    for (const file of await readdir(path.join(vaseBase, folder), { recursive: true })) {
      if (!file.endsWith('.vue'))
        continue
      const source = await readFile(path.join(vaseBase, folder, file), 'utf8')
      const read = source.search(/\bnew\s+Temporal\.|\bTemporal\.Now\b|\bTemporal\.\w+\.\w+\(/)
      if (read !== -1) {
        const call = source.indexOf('installTemporal()')
        assert.ok(call !== -1 && call < read, `${folder}/${file} calls installTemporal() before it reads Temporal`)
      }
    }
  }
  // eslint-disable-next-line no-console
  console.log('crawl-content: vase temporal lib item and call ordering')
}
finally {
  await rm(temporalRoot, { recursive: true, force: true })
}
