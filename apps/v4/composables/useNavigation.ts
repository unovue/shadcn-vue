// Current version of Nuxt Content has limitation to render grouped content, thus required manual mapping
// https://github.com/nuxt/content/issues/3119

import type { ContentNavigationItem } from '@nuxt/content'

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

const EXCLUDED_PARENT_TITLE = ['Components', 'Registry', 'Forms', 'MCP Server']

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
  const { data } = useAsyncData('navigation', () => {
    return queryCollectionNavigation('content', ['new'])
  }, {
    default: () => ([]),
    transform: (data) => {
      const doc = data.find(i => i.stem === 'docs')!
      const rootDocs = doc.children?.filter(i => !EXCLUDED_PARENT_TITLE.includes(i.title ?? '')).map(i => mapWithType(i, doc)) ?? []
      const nonRootDocs = doc.children?.filter(i => i.children).map(i => mapWithType(i, doc)) ?? []

      return [{ ...doc, children: [{
        path: '/docs',
        stem: 'docs',
        title: 'Get Started',
        type: navigationItemType(doc, null),
        children: rootDocs,
      }, ...nonRootDocs] }]
    },
  })

  return {
    data,
  }
}
