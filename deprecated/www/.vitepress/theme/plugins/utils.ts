// Credit to @hairyf https://github.com/hairyf/markdown-it-vitepress-demo

import type { AttributeNode, ElementNode } from '@vue/compiler-core'
import { baseParse } from '@vue/compiler-core'

export interface GenerateOptions {
  attrs?: string
  props: Record<string, any>
  path: string
  code: string
}

export function isUndefined(v: any): v is undefined {
  return v === undefined || v === null
}

function getPropsMap(attrs: any[]) {
  const map: Record<string, any> = {}
  for (const { name, value, exp, arg } of attrs) {
    if (name === 'bind') {
      if (!isUndefined(arg?.content))
        map[arg.content] = JSON.parse(exp.content)
      continue
    }
    if (isUndefined(value?.content) || value?.content === '')
      map[name] = true
    else if (['true', 'false'].includes(value?.content || ''))
      map[name] = value?.content === 'true'
    else
      map[name] = value?.content
  }
  return map
}

export function parseProps(content: string) {
  const ast = baseParse(content)
  const demoElement = ast.children[0] as ElementNode

  return getPropsMap(demoElement.props as AttributeNode[])
}
