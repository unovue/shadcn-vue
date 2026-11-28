import type { ContentNavigationItem } from '@nuxt/content'
import { BASES } from '@/registry/bases'

// The component and AI Elements docs live in one folder for each base:
// /docs/components/<base>/<name> and /docs/ai-elements/<base>/<name>.
export const DOCS_SECTIONS = ['components', 'ai-elements'] as const
export type DocsSection = typeof DOCS_SECTIONS[number]

export const DOCS_BASES = BASES.map(base => base.name)
export const DEFAULT_BASE = DOCS_BASES[0]!

export const USER_CONFIG_COOKIE = 'user_config'

const SHARED_PAGES = ['typography']

export interface DocsPage {
  section: DocsSection
  base: string
  name: string
}

const DOCS_PAGE_PATH = new RegExp(`^/docs/(${DOCS_SECTIONS.join('|')})/([^/]+)/([^/]+)/?$`)
const LEGACY_PAGE_PATH = new RegExp(`^/docs/(${DOCS_SECTIONS.join('|')})/([^/.]+)/?$`)
const LEGACY_RAW_PATH = new RegExp(`^/raw/docs/(${DOCS_SECTIONS.join('|')})/([^/.]+)\\.md$`)

export function isBase(value: unknown): value is string {
  return typeof value === 'string' && DOCS_BASES.includes(value)
}

export function resolveBase(...values: unknown[]) {
  return values.find(isBase) ?? DEFAULT_BASE
}

export function parseDocsPage(path: string): DocsPage | null {
  const match = DOCS_PAGE_PATH.exec(path)
  if (!match || !isBase(match[2])) {
    return null
  }
  return { section: match[1] as DocsSection, base: match[2], name: match[3]! }
}

interface LegacyDocsPage {
  section: string
  name: string
  raw: boolean
}

function parseLegacyDocsPage(path: string): LegacyDocsPage | null {
  const raw = LEGACY_RAW_PATH.exec(path)
  const match = raw ?? LEGACY_PAGE_PATH.exec(path)
  if (!match || isBase(match[2]) || SHARED_PAGES.includes(match[2]!)) {
    return null
  }
  return { section: match[1]!, name: match[2]!, raw: raw !== null }
}

export function legacyDocsPages(path: string) {
  const page = parseLegacyDocsPage(path)
  return page ? DOCS_BASES.map(base => `/docs/${page.section}/${base}/${page.name}`) : []
}

// When `pages` is given and `base` has no page of that name, fall back to the first base that does.
export function legacyDocsRedirect(path: string, base: string, pages?: Iterable<string>) {
  const page = parseLegacyDocsPage(path)
  if (!page) {
    return null
  }

  const existing = pages && new Set(pages)
  const target = existing
    ? [base, ...DOCS_BASES].find(item => existing.has(`/docs/${page.section}/${item}/${page.name}`)) ?? base
    : base
  return page.raw ? `/raw/docs/${page.section}/${target}/${page.name}.md` : `/docs/${page.section}/${target}/${page.name}`
}

// A section lists the pages of one base. Its base folders collapse into the section,
// and the pages that no base owns (typography) come after the pages of the base.
export function forBase(items: ContentNavigationItem[], base: string): ContentNavigationItem[] {
  return items.map((item) => {
    if (!item.children) {
      return item
    }
    if (!DOCS_SECTIONS.some(section => item.path === `/docs/${section}`)) {
      return { ...item, children: forBase(item.children, base) }
    }

    const folders = DOCS_BASES.map(name => `${item.path}/${name}`)
    const children = [
      ...item.children.find(child => child.path === `${item.path}/${base}`)?.children ?? [],
      ...item.children.filter(child => !folders.includes(child.path)),
    ]
    return { ...item, children: children.length > 0 ? children : undefined }
  })
}

// The pages of a navigation tree in reading order. A folder with no page of its own is not a page.
export function flattenPages(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.flatMap((item) => {
    const children = item.children ? flattenPages(item.children) : []
    if (item.page === false || children.some(child => child.path === item.path)) {
      return children
    }
    return [{ ...item, children: undefined }, ...children]
  })
}
