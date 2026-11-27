import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { hasBaseDemo, loadDemoSource } from '@/lib/docs-demos'

const SECTIONS = ['components', 'ai-elements']

interface DemoRef {
  name: string
  kind: 'preview' | 'source'
  type?: string
}

function unquote(value: string) {
  return value.trim().replace(/^["']|["']$/g, '')
}

function demoRefs(markdown: string): DemoRef[] {
  const text = markdown.replace(/<!--.*?-->/gs, '')
  const refs: DemoRef[] = []

  for (const match of text.matchAll(/^[ \t]*::component-(preview|source)[ \t]*\n[ \t]*---\n(.*?)\n[ \t]*---/gms)) {
    const kind = match[1] as 'preview' | 'source'
    const body = match[2]!
    const name = /^[ \t]*name:(.*)$/m.exec(body)?.[1]
    const type = /^[ \t]*type:(.*)$/m.exec(body)?.[1]
    if (name) {
      refs.push({ name: unquote(name), kind, type: type ? unquote(type) : undefined })
    }
  }

  for (const match of text.matchAll(/^[ \t]*::component-(preview|source)\{([^}]*)\}/gm)) {
    const kind = match[1] as 'preview' | 'source'
    const attrs = match[2]!
    const name = /\bname=["']([^"']+)["']/.exec(attrs)?.[1]
    const type = /\btype=["']([^"']+)["']/.exec(attrs)?.[1]
    if (name) {
      refs.push({ name, kind, type })
    }
  }

  for (const match of text.matchAll(/<Component(Preview|Source)\b([^>]*)>/g)) {
    const kind = match[1] === 'Preview' ? 'preview' : 'source'
    const attrs = match[2]!
    const name = /\bname=["']([^"']+)["']/.exec(attrs)?.[1]
    const type = /\btype=["']([^"']+)["']/.exec(attrs)?.[1]
    if (name) {
      refs.push({ name, kind, type })
    }
  }

  return refs
}

function imports(source: string) {
  const fromOrDynamic = [...source.matchAll(/(?:from|import\()\s*['"]([^'"]+)['"]/g)].map(match => match[1]!)
  const sideEffect = [...source.matchAll(/(?:^|[;\n>])\s*import\s+['"]([^'"]+)['"]/gm)].map(match => match[1]!)
  return [...fromOrDynamic, ...sideEffect]
}

const appFolder = fileURLToPath(new URL('../../', import.meta.url))
const componentsFolder = `${appFolder}components/`

function resolveFile(basePath: string) {
  const candidates = [basePath, `${basePath}.ts`, `${basePath}.vue`, `${basePath}/index.ts`]
  return candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile())
}

// Follows explicit imports and Nuxt auto-imported component tags (uppercase tags absent from <script>)
// across local helpers and app-level components, composables, and lib modules.
function modules(source: string, folder: string, seen = new Set<string>()): string[] {
  const script = [...source.matchAll(/<script[^>]*>(.*?)<\/script>/gs)].map(match => match[1]).join('\n')
  const template = source.replace(/<script[^>]*>.*?<\/script>/gs, '')
  const tags = new Set([...template.matchAll(/<([A-Z]\w*)/g)].map(match => match[1]!))
  const autoImported = [...tags]
    .filter(tag => !new RegExp(`\\b${tag}\\b`).test(script))
    .flatMap(tag => [`${componentsFolder}${tag}.vue`, `${componentsFolder}demo/${tag}.vue`])
    .filter(file => existsSync(file) && statSync(file).isFile())
  const specifiers = imports(source)
  const helpers = specifiers.flatMap((file) => {
    if (file.startsWith('./') || file.startsWith('../')) {
      const resolved = resolveFile(resolve(folder, file))
      return resolved ? [resolved] : []
    }
    if (/^[@~]\/(?:components|composables|lib)\//.test(file)) {
      const resolved = resolveFile(file.replace(/^[@~]\//, appFolder))
      return resolved ? [resolved] : []
    }
    return []
  })
  const files = [...autoImported, ...helpers].filter(file => !seen.has(file) && seen.add(file))
  return [...specifiers, ...files.flatMap(file => modules(readFileSync(file, 'utf8'), dirname(file), seen))]
}

function isGalleryChartFallback(ref: DemoRef) {
  return ref.kind === 'preview'
    && ref.name.toLowerCase().includes('chart')
    && !ref.name.toLowerCase().includes('demo')
    && !hasBaseDemo(ref.name, 'vase')
}

const pages = SECTIONS.flatMap((section) => {
  const folder = fileURLToPath(new URL(`../../content/docs/${section}/vase/`, import.meta.url))
  return existsSync(folder)
    ? readdirSync(folder).filter(file => file.endsWith('.md')).map(file => ({ page: `${section}/${file}`, path: `${folder}${file}` }))
    : []
})

describe('the demos of the vase pages', () => {
  it('has pages to check', () => {
    expect(pages.length).toBeGreaterThan(0)
  })

  it('finds the demo that a base has of its own', () => {
    expect(hasBaseDemo('AccordionDemo', 'vase')).toBe(true)
    expect(hasBaseDemo('AccordionDemo', 'reka')).toBe(false)
    expect(hasBaseDemo('AccordionDemo')).toBe(false)
  })

  it('follows a component of the docs that a demo imports', () => {
    const source = '<script setup>import Markdown from \'@/components/Markdown.vue\'</script><template><Markdown /></template>'
    expect(modules(source, componentsFolder)).toContain('@/registry/bases/reka/ui/code-block')
  })

  it('catches side-effect imports, block previews, gallery chart fallbacks, and YAML component-source blocks', () => {
    expect(modules('<script setup>import \'reka-ui\'</script>', componentsFolder)).toContain('reka-ui')
    expect(demoRefs('::component-source\n---\nname: FooDemo\n---\n::')).toEqual([
      { name: 'FooDemo', kind: 'source', type: undefined },
    ])
    expect(demoRefs('::component-preview\n---\nname: dashboard-01\ntype: block\n---\n::')).toEqual([
      { name: 'dashboard-01', kind: 'preview', type: 'block' },
    ])
    expect(isGalleryChartFallback({ name: 'ChartAreaDefault', kind: 'preview' })).toBe(true)
    expect(isGalleryChartFallback({ name: 'ChartBarInteractive', kind: 'preview' })).toBe(false)
  })

  it.each(pages)('$page names demos that use no reka module', async ({ path }) => {
    const reka = []
    for (const ref of demoRefs(readFileSync(path, 'utf8'))) {
      if (ref.type === 'block') {
        reka.push(`${ref.name}: type=block uses new-york-v4/blocks`)
        continue
      }
      if (isGalleryChartFallback(ref)) {
        reka.push(`${ref.name}: chart preview falls back to new-york-v4/charts`)
        continue
      }
      const source = await loadDemoSource(ref.name, 'vase')
      const folder = `${componentsFolder}demo/${hasBaseDemo(ref.name, 'vase') ? 'vase' : ''}`
      reka.push(...modules(source, folder).filter(file => /new-york-v4|reka/.test(file)).map(file => `${ref.name}: ${file}`))
    }
    expect(reka).toEqual([])
  })
})
