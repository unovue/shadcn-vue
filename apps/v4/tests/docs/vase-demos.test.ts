import { existsSync, readdirSync, readFileSync } from 'node:fs'
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

  it.each(pages)('$page names demos that import no reka module', async ({ path }) => {
    const reka = []
    for (const name of demoNames(readFileSync(path, 'utf8'))) {
      const source = await loadDemoSource(name, 'vase')
      reka.push(...imports(source).filter(file => /new-york-v4|reka/.test(file)).map(file => `${name}: ${file}`))
    }
    expect(reka).toEqual([])
  })
})
