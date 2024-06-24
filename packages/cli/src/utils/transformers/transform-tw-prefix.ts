import { SyntaxKind } from 'ts-morph'
import { MagicString, parse } from '@vue/compiler-sfc'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { splitClassName } from './transform-css-vars'
import type { Transformer } from '@/src/utils/transformers'

export const transformTwPrefixes: Transformer = async ({
  sourceFile,
  config,
}) => {
  const isVueFile = sourceFile.getFilePath().endsWith('vue')
  if (!config.tailwind?.prefix)
    return sourceFile

  let template: SFCTemplateBlock | null = null

  if (isVueFile) {
    const parsed = parse(sourceFile.getText())
    template = parsed.descriptor.template

    if (!template)
      return sourceFile
  }

  sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((node) => {
    if (template && template.loc.start.offset >= node.getPos())
      return sourceFile

    const attrName = sourceFile.getDescendantAtPos(node.getPos() - 2)?.getText()
    if (isVueFile && attrName !== 'class')
      return sourceFile

    const value = node.getText()
    const hasClosingDoubleQuote = value.match(/"/g)?.length === 2
    if (value.search('\'') === -1 && hasClosingDoubleQuote) {
      const mapped = applyPrefix(value.replace(/"/g, ''), config.tailwind.prefix)
      node.replaceWithText(`"${mapped}"`)
    }
    else {
      const s = new MagicString(value)
      s.replace(/'(.*?)'/g, (substring) => {
        return `'${applyPrefix(substring.replace(/'/g, ''), config.tailwind.prefix)}'`
      })
      node.replaceWithText(s.toString())
    }
  })

  return sourceFile
}

export function applyPrefix(input: string, prefix: string = '') {
  const classNames = input.split(' ')
  const prefixed: string[] = []
  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className)
    if (variant) {
      modifier
        ? prefixed.push(`${variant}:${prefix}${value}/${modifier}`)
        : prefixed.push(`${variant}:${prefix}${value}`)
    }
    else {
      modifier
        ? prefixed.push(`${prefix}${value}/${modifier}`)
        : prefixed.push(`${prefix}${value}`)
    }
  }
  return prefixed.join(' ')
}

export function applyPrefixesCss(css: string, prefix: string) {
  const lines = css.split('\n')
  for (const line of lines) {
    if (line.includes('@apply')) {
      const originalTWCls = line.replace('@apply', '').trim()
      const prefixedTwCls = applyPrefix(originalTWCls, prefix)
      css = css.replace(originalTWCls, prefixedTwCls)
    }
  }
  return css
}
