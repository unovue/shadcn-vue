import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { hasBaseDemo, loadDemoSource } from '@/lib/docs-demos'

const SECTIONS = ['components', 'ai-elements']

// The demos that a page names: ::component-preview and ::component-source.
function demoNames(markdown: string) {
  const text = markdown.replace(/<!--.*?-->/gs, '')
  const previews = [...text.matchAll(/^[ \t]*::component-preview[ \t]*\n[ \t]*---\n(.*?)\n[ \t]*---/gms)].map(match => match[1]!)
  const names = previews.flatMap(body => /^[ \t]*name:(.*)$/m.exec(body)?.[1]?.trim().replace(/^["']|["']$/g, '') ?? [])
  const sources = [...text.matchAll(/^[ \t]*::component-source\{[^}]*name="([^"]+)"/gm)].map(match => match[1]!)
  return [...new Set([...names, ...sources])]
}

// The files that a demo imports.
function imports(source: string) {
  return [...source.matchAll(/(?:from|import\()\s*['"]([^'"]+)['"]/g)].map(match => match[1]!)
}

const componentsFolder = fileURLToPath(new URL('../../components/', import.meta.url))

// The files that a demo imports, and the files of the components that it uses with no import (the auto-imports of Nuxt)
// and of the helpers that it imports from its own folder.
function modules(source: string, folder: string, seen = new Set<string>()): string[] {
  const script = [...source.matchAll(/<script[^>]*>(.*?)<\/script>/gs)].map(match => match[1]).join('\n')
  const template = source.replace(/<script[^>]*>.*?<\/script>/gs, '')
  const tags = new Set([...template.matchAll(/<([A-Z]\w*)/g)].map(match => match[1]!))
  const autoImported = [...tags]
    .filter(tag => !new RegExp(`\\b${tag}\\b`).test(script))
    .flatMap(tag => [`${componentsFolder}${tag}.vue`, `${componentsFolder}demo/${tag}.vue`])
  const helpers = imports(source).filter(file => file.startsWith('./')).map(file => resolve(folder, file))
  const files = [...autoImported, ...helpers].filter(file => existsSync(file) && !seen.has(file) && seen.add(file))
  return [...imports(source), ...files.flatMap(file => modules(readFileSync(file, 'utf8'), dirname(file), seen))]
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

  it.each(pages)('$page names demos that use no reka module', async ({ path }) => {
    const reka = []
    for (const name of demoNames(readFileSync(path, 'utf8'))) {
      const source = await loadDemoSource(name, 'vase')
      const folder = `${componentsFolder}demo/${hasBaseDemo(name, 'vase') ? 'vase' : ''}`
      reka.push(...modules(source, folder).filter(file => /new-york-v4|reka/.test(file)).map(file => `${name}: ${file}`))
    }
    expect(reka).toEqual([])
  })
})
