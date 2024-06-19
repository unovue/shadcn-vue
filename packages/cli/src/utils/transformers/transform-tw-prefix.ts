import type { CodemodPlugin } from 'vue-metamorph'
import { splitClassName } from './transform-css-vars'
import type { TransformOpts } from '.'

export function transformTwPrefix(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'add prefix to tailwind classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST, astHelpers } }) {
      let transformCount = 0
      const { config } = opts

      if (!config.tailwind?.prefix)
        return transformCount

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitCallExpression(path) {
            if (path.node.callee.type === 'Identifier' && path.node.callee.name === 'cva') {
              const nodes = path.node.arguments
              nodes.forEach((node) => {
                // cva(base, ...)
                if (node.type === 'Literal' && typeof node.value === 'string') {
                  node.value = applyPrefix(node.value, config.tailwind.prefix)
                  transformCount++
                }

                else if (node.type === 'ObjectExpression') {
                  node.properties.forEach((node) => {
                    // cva(..., { variants: { ... } })
                    if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.name === 'variants') {
                      const nodes = astHelpers.findAll(node, { type: 'Literal' })
                      nodes.forEach((node) => {
                        if (typeof node.value === 'string') {
                          node.value = applyPrefix(node.value, config.tailwind.prefix)
                          transformCount++
                        }
                      })
                    }
                  })
                }
              })
            }
            return this.traverse(path)
          },
        })
      }

      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            if (node.type === 'VAttribute' && node.key.type === 'VDirectiveKey') {
              if (node.key.argument?.type === 'VIdentifier') {
                if (node.key.argument.name === 'class') {
                  const nodes = astHelpers.findAll(node, { type: 'Literal' })
                  nodes.forEach((node) => {
                    if (!['BinaryExpression', 'Property'].includes(node.parent?.type ?? '') && typeof node.value === 'string') {
                      node.value = applyPrefix(node.value, config.tailwind.prefix)
                      transformCount++
                    }
                  })
                }
              }
            }
            // handle class attribute without binding
            else if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent.key.name === 'class') {
                node.value = `"${applyPrefix(node.value.replace(/"/g, ''), config.tailwind.prefix)}"`
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
