// Current version of Nuxt Content has limitation to render grouped content, thus required manual mapping
// https://github.com/nuxt/content/issues/3119

import type { ContentNavigationItem } from '@nuxt/content'
import { flattenPages, forBase } from '@/lib/docs-base'

export type NavigationItemType = 'page' | 'component' | 'block' | 'group'

// @see ContentNavigationItem
export interface NavigationItem {
  title: string
  path: string
  stem?: string
  children?: NavigationItem[]
  page?: false
  type?: NavigationItemType
  [key: string]: unknown
}

const EXCLUDED_PARENT_TITLE = ['Components', 'Registry', 'Forms', 'MCP Server', 'Directory']

// TODO: Find a better heuristic to determine item type
function navigationItemType(item: ContentNavigationItem, parent: ContentNavigationItem | null): 'component' | 'block' | 'group' | 'page' {
  if (parent) {
    if (parent.title === 'Components') {
      return 'component'
    }
    if (parent.title === 'Blocks') {
      return 'block'
    }
  }
  if (item.children && item.children.length > 0) {
    return 'group'
  }
  return 'page'
}

function mapWithType(item: ContentNavigationItem, parent: ContentNavigationItem | null): NavigationItem {
  return {
    ...item,
    type: navigationItemType(item, parent),
    children: item.children?.map(child => mapWithType(child, item)),
  }
}

export async function useNavigation() {
  const base = useDocsBase()
  const nav = useAsyncData('navigation', () => {
    return queryCollectionNavigation('content', ['new'])
  }, {
    default: () => ([]),
  })
  const content = computed(() => forBase(nav.data.value, base.value))

  const data = computed(() => {
    const doc = content.value.find(i => i.stem === 'docs')
    if (!doc) {
      return []
    }
    const rootDocs = doc.children?.filter(i => !EXCLUDED_PARENT_TITLE.includes(i.title ?? '')).map(i => mapWithType(i, doc)) ?? []
    const nonRootDocs = doc.children?.filter(i => i.children).map(i => mapWithType(i, doc)) ?? []

    return [{ ...doc, children: [
      ...nonRootDocs,
      {
        path: '/docs',
        stem: 'docs',
        title: 'Get Started',
        type: navigationItemType(doc, null),
        children: rootDocs,
      },
    ] }]
  })

  const pages = computed(() => flattenPages(content.value))
  const paths = computed(() => new Set(flattenPages(nav.data.value).map(page => page.path)))

  await nav

  return {
    data,
    pages,
    paths,
  }
}
