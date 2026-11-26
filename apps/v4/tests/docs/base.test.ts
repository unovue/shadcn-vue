import type { ContentNavigationItem } from '@nuxt/content'
import { describe, expect, it } from 'vitest'
import { DEFAULT_BASE, flattenPages, forBase, legacyDocsPages, legacyDocsRedirect, parseDocsPage, resolveBase } from '@/lib/docs-base'

function page(path: string, children?: ContentNavigationItem[]): ContentNavigationItem {
  return { title: path.split('/').pop()!, path, children }
}

function folder(path: string, children: ContentNavigationItem[]): ContentNavigationItem {
  return { ...page(path, children), page: false }
}

const tree = [
  folder('/docs', [
    page('/docs/introduction'),
    page('/docs/components', [
      folder('/docs/components/reka', [page('/docs/components/reka/accordion'), page('/docs/components/reka/toast')]),
      page('/docs/components/typography'),
      folder('/docs/components/vase', [page('/docs/components/vase/accordion')]),
    ]),
    page('/docs/ai-elements', [
      folder('/docs/ai-elements/reka', [page('/docs/ai-elements/reka/chat')]),
    ]),
    page('/docs/installation', [page('/docs/installation/vite')]),
  ]),
]

function paths(items: ContentNavigationItem[] | undefined) {
  return items?.map(item => item.path)
}

describe('resolveBase', () => {
  it('takes the first value that names a base', () => {
    expect(resolveBase('vase', 'reka')).toBe('vase')
    expect(resolveBase('other', 'vase')).toBe('vase')
    expect(resolveBase(undefined, 'vase')).toBe('vase')
  })

  it('falls back to the default base', () => {
    expect(DEFAULT_BASE).toBe('reka')
    expect(resolveBase()).toBe('reka')
    expect(resolveBase('other', undefined, ['vase'])).toBe('reka')
  })
})

describe('parseDocsPage', () => {
  it('reads the section, the base and the name of a per-base page', () => {
    expect(parseDocsPage('/docs/components/vase/button')).toEqual({ section: 'components', base: 'vase', name: 'button' })
    expect(parseDocsPage('/docs/ai-elements/reka/chat')).toEqual({ section: 'ai-elements', base: 'reka', name: 'chat' })
    expect(parseDocsPage('/docs/components/reka/button/')).toEqual({ section: 'components', base: 'reka', name: 'button' })
  })

  it.each([
    '/docs/components/button',
    '/docs/components/reka',
    '/docs/components',
    '/docs/components/unknown/button',
    '/docs/components/vase/button/extra',
    '/docs/installation/vase/button',
    '/raw/docs/components/vase/button.md',
  ])('does not read %s', (path) => {
    expect(parseDocsPage(path)).toBeNull()
  })
})

describe('forBase', () => {
  const sections = (base: string) => forBase(tree, base)[0]!.children!

  it('lists the pages of the base, then the pages that no base owns', () => {
    expect(paths(sections('reka').find(item => item.path === '/docs/components')?.children)).toEqual([
      '/docs/components/reka/accordion',
      '/docs/components/reka/toast',
      '/docs/components/typography',
    ])
    expect(paths(sections('vase').find(item => item.path === '/docs/components')?.children)).toEqual([
      '/docs/components/vase/accordion',
      '/docs/components/typography',
    ])
  })

  it('leaves a section with no page for the base without children', () => {
    expect(sections('vase').find(item => item.path === '/docs/ai-elements')?.children).toBeUndefined()
    expect(paths(sections('reka').find(item => item.path === '/docs/ai-elements')?.children)).toEqual(['/docs/ai-elements/reka/chat'])
  })

  it('keeps the other pages', () => {
    expect(sections('vase').find(item => item.path === '/docs/installation')).toEqual(tree[0]!.children![3])
  })

  it('does not change the tree', () => {
    forBase(tree, 'vase')
    expect(paths(tree[0]!.children!.find(item => item.path === '/docs/components')?.children)).toEqual([
      '/docs/components/reka',
      '/docs/components/typography',
      '/docs/components/vase',
    ])
  })
})

describe('flattenPages', () => {
  it('lists the pages in reading order and skips folders with no page', () => {
    expect(paths(flattenPages(forBase(tree, 'vase')))).toEqual([
      '/docs/introduction',
      '/docs/components',
      '/docs/components/vase/accordion',
      '/docs/components/typography',
      '/docs/ai-elements',
      '/docs/installation',
      '/docs/installation/vite',
    ])
  })

  it('lists a page once when its folder has an index page', () => {
    const index = page('/docs/guides', [page('/docs/guides'), page('/docs/guides/start')])
    expect(paths(flattenPages([index]))).toEqual(['/docs/guides', '/docs/guides/start'])
  })
})

describe('legacyDocsRedirect', () => {
  it.each([
    ['/docs/components/button', 'reka', '/docs/components/reka/button'],
    ['/docs/components/button', 'vase', '/docs/components/vase/button'],
    ['/docs/components/button/', 'vase', '/docs/components/vase/button'],
    ['/docs/ai-elements/chat', 'vase', '/docs/ai-elements/vase/chat'],
    ['/raw/docs/components/button.md', 'vase', '/raw/docs/components/vase/button.md'],
    ['/raw/docs/ai-elements/chat.md', 'reka', '/raw/docs/ai-elements/reka/chat.md'],
  ])('sends %s to the %s base', (path, base, target) => {
    expect(legacyDocsRedirect(path, base)).toBe(target)
  })

  it.each([
    ['/docs/components/button', ['/docs/components/reka/button', '/docs/components/vase/button']],
    ['/docs/ai-elements/chat/', ['/docs/ai-elements/reka/chat', '/docs/ai-elements/vase/chat']],
    ['/raw/docs/components/button.md', ['/docs/components/reka/button', '/docs/components/vase/button']],
  ])('lists the pages that %s can name', (path, pages) => {
    expect(legacyDocsPages(path)).toEqual(pages)
  })

  describe('with the pages that exist', () => {
    const pages = ['/docs/components/reka/toast', '/docs/components/reka/button', '/docs/components/vase/button', '/docs/ai-elements/reka/chat']

    it.each([
      ['/docs/components/button', 'vase', '/docs/components/vase/button'],
      ['/docs/components/button', 'reka', '/docs/components/reka/button'],
      ['/docs/components/toast', 'reka', '/docs/components/reka/toast'],
      ['/docs/ai-elements/chat', 'reka', '/docs/ai-elements/reka/chat'],
    ])('sends %s to the page of the %s base', (path, base, target) => {
      expect(legacyDocsRedirect(path, base, pages)).toBe(target)
    })

    it.each([
      ['/docs/components/toast', '/docs/components/reka/toast'],
      ['/docs/ai-elements/chat', '/docs/ai-elements/reka/chat'],
      ['/raw/docs/components/toast.md', '/raw/docs/components/reka/toast.md'],
    ])('sends %s to the first base that has the page when the chosen base has none', (path, target) => {
      expect(legacyDocsRedirect(path, 'vase', pages)).toBe(target)
    })

    it('keeps the chosen base when no base has the page', () => {
      expect(legacyDocsRedirect('/docs/components/nope', 'vase', pages)).toBe('/docs/components/vase/nope')
    })
  })

  it.each([
    '/docs/components',
    '/docs/ai-elements',
    '/docs/components/reka',
    '/docs/components/vase',
    '/docs/ai-elements/reka',
    '/docs/components/typography',
    '/raw/docs/components/typography.md',
    '/raw/docs/components/reka.md',
    '/docs/components/reka/button',
    '/raw/docs/components/reka/button.md',
    '/docs/components/button.md',
    '/docs/components-json',
    '/docs/installation/vite',
  ])('leaves %s alone', (path) => {
    expect(legacyDocsRedirect(path, 'vase')).toBeNull()
    expect(legacyDocsPages(path)).toEqual([])
  })
})
