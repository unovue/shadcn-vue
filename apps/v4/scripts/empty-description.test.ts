import type { Component, HTMLAttributes } from 'vue'
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { ModuleKind, transpileModule } from 'typescript'
import { afterAll, describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { compileScript, parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'

const appDir = fileURLToPath(new URL('../', import.meta.url))
const temporaryDir = await mkdtemp(join(appDir, '.empty-description-test-'))
afterAll(() => rm(temporaryDir, { recursive: true, force: true }))

const paths = [
  'registry/new-york-v4/ui/empty/EmptyDescription.vue',
  'registry/bases/reka/ui/empty/EmptyDescription.vue',
  ...(await readdir(join(appDir, 'styles')))
    .filter(style => style.startsWith('reka-'))
    .map(style => `styles/${style}/ui/empty/EmptyDescription.vue`),
]

// Compile the real SFCs, rather than reimplementing their props or template.
for (const [index, path] of paths.entries()) {
  const filename = join(appDir, path)
  const { descriptor } = parse(await readFile(filename, 'utf8'), { filename })
  const script = compileScript(descriptor, { id: `empty-description-${index}`, inlineTemplate: true })
  const compiledPath = join(temporaryDir, `${index}.mjs`)
  await writeFile(compiledPath, transpileModule(script.content, {
    compilerOptions: { module: ModuleKind.ESNext },
  }).outputText)
  const { default: component } = await import(pathToFileURL(compiledPath).href) as { default: Component }

  describe(path, () => {
    async function render(className?: HTMLAttributes['class']) {
      return renderToString(createSSRApp({
        render: () => h(component, { 'class': className, 'aria-label': 'Description' }, () => 'Hello'),
      }))
    }

    it.each([
      ['string', 'text-red-500'],
      ['array', ['text-red-500', 'custom-description']],
      ['object', { 'text-red-500': true, 'hidden': false }],
    ])('merges the %s class prop', async (_, className) => {
      const html = await render(className)
      expect(html).toContain('text-red-500')
      if (Array.isArray(className))
        expect(html).toContain('custom-description')
      expect(html).not.toMatch(/class="[^"]*\bhidden\b/)
      expect(html).not.toContain('text-muted-foreground')
      expect(html).toContain('[&amp;&gt;a]:underline')
      expect(html).toContain('data-slot="empty-description"')
      expect(html).toContain('aria-label="Description"')
      expect(html).toContain('Hello')
    })

    it('keeps default classes without a class prop', async () => {
      expect(await render()).toContain('text-muted-foreground')
    })
  })
}
