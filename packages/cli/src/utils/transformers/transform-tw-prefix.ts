import type { CodemodPlugin } from 'vue-metamorph'
import { splitClassName } from './transform-css-vars'
import type { TransformOpts } from '.'
import type { Config } from '@/src/utils/get-config'

export function transformTwPrefix(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'add prefix to tailwind classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const { config } = opts

      if (!config.tailwind?.prefix)
        return transformCount

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            if (path.parent.value.type !== 'ImportDeclaration' && typeof path.node.value === 'string') {
            // mutate the node
              path.node.value = applyPrefix(path.node.value, config.tailwind.prefix)
              transformCount++
            }

            return this.traverse(path)
          },
        })
      }

      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            if (node.type === 'Literal' && typeof node.value === 'string') {
              if (!['BinaryExpression', 'Property'].includes(node.parent?.type ?? '')) {
                node.value = applyPrefix(node.value, config.tailwind.prefix)
                transformCount++
              }
            }
            // handle class attribute without binding
            else if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent.key.name === 'class') {
                node.value = `"${applyPrefix(node.value, config.tailwind.prefix)}"`
                transformCount++
              }
            }
          },
          leaveNode() {

          },
        })
      }

      return transformCount
    },
  }
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
