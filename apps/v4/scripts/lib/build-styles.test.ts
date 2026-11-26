import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { STYLES } from '@/registry/styles'
import { configuredBases } from '../registry.config'
import { buildBaseStyles } from './build-styles'
import { buildStyleRegistry } from './build-styles-registry'

assert.ok(configuredBases.some(base => base.name === 'reka'), 'reka is a configured base')
assert.ok(configuredBases.every(base => !base.buildMainRegistry), 'the main registry is not a configured base')

const root = await mkdtemp(path.join(tmpdir(), 'build-styles-'))

try {
  await mkdir(path.join(root, 'registry/styles'), { recursive: true })
  for (const style of STYLES) {
    await writeFile(
      path.join(root, `registry/styles/style-${style.name}.css`),
      `.style-${style.name} {\n  .cn-button {\n    @apply ${style.name}-box;\n  }\n}\n`,
    )
  }

  const bases = ['alpha', 'beta'].map(name => ({ name, path: `bases/${name}`, contentTypes: [] }))
  for (const { name } of bases) {
    const uiDir = path.join(root, `registry/bases/${name}/ui`)
    await mkdir(path.join(uiDir, 'button'), { recursive: true })
    await writeFile(path.join(uiDir, 'button/Button.vue'), [
      '<script setup lang="ts">',
      `import { Spinner } from "@/registry/bases/${name}/ui/spinner"`,
      '</script>',
      '',
      '<template>',
      '  <button class="cn-button">',
      '    <Spinner />',
      '  </button>',
      '</template>',
      '',
    ].join('\n'))
    await writeFile(path.join(uiDir, '_registry.ts'), 'export const ui = []\n')
  }

  for (const base of bases) {
    const { sourceCount, styles } = await buildBaseStyles(base, root)
    assert.equal(sourceCount, 2, `${base.name} has a button and a registry file`)
    assert.deepEqual(styles.map(style => style.name), STYLES.map(style => `${base.name}-${style.name}`))
    assert.ok(styles.every(style => style.transformedFiles === 1 && style.totalReplacements === 1))
  }

  for (const { name } of bases) {
    for (const style of STYLES) {
      const outDir = path.join(root, `styles/${name}-${style.name}/ui`)
      const output = await readFile(path.join(outDir, 'button/Button.vue'), 'utf8')

      assert.ok(output.includes(`${style.name}-box`), `${name}-${style.name} expands cn-button`)
      assert.ok(!output.includes('cn-button'), `${name}-${style.name} drops the cn-button token`)
      assert.ok(output.includes(`@/styles/${name}-${style.name}/ui/spinner`), `${name}-${style.name} imports its own files`)
      assert.ok(!output.includes('@/registry/bases/'), `${name}-${style.name} keeps no import from the shared base`)
      assert.deepEqual(await readdir(outDir), ['button'], `${name}-${style.name} skips _registry.ts`)
    }
  }
  assert.deepEqual(
    (await readdir(path.join(root, 'styles'))).sort(),
    bases.flatMap(base => STYLES.map(style => `${base.name}-${style.name}`)).sort(),
  )

  const baseItems = {
    ui: [{ name: 'button', type: 'registry:ui', files: [{ path: 'ui/button/Button.vue', type: 'registry:ui' }] }],
    lib: [{ name: 'utils', type: 'registry:lib', files: [{ path: 'lib/utils.ts', type: 'registry:lib' }] }],
  }
  for (const base of bases) {
    const registry = buildStyleRegistry(base, 'nova', baseItems)
    assert.deepEqual(registry.items.map(item => item.name), ['index', 'button', 'utils'])
    assert.equal(registry.items[1]!.files![0]!.path, `styles/${base.name}-nova/ui/button/Button.vue`)
    assert.equal(registry.items[2]!.files![0]!.path, `registry/bases/${base.name}/lib/utils.ts`)
  }

  // eslint-disable-next-line no-console
  console.log('build-styles: every base builds its own styles and registries')
}
finally {
  await rm(root, { recursive: true, force: true })
}
