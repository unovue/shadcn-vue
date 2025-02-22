export interface TableOfContentsItem {
  title?: string
  url?: string
  items?: TableOfContentsItem[]
  heading?: HTMLHeadingElement
}

export interface TableOfContents {
  items: TableOfContentsItem[]
}
