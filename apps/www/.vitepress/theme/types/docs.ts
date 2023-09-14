export interface TableOfContentsItem {
  title?: string
  url?: string
  items?: TableOfContentsItem[]
}

export interface TableOfContents {
  items: TableOfContentsItem[]
}
