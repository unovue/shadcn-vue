import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import type { TailwindVersion } from '../get-project-info'
import { getProjectTailwindVersionFromConfig } from '../get-project-info'
import { splitClassName } from './transform-css-vars'

export async function transformTwPrefix(opts: TransformOpts): Promise<CodemodPlugin> {
  const tailwindVersion = await getProjectTailwindVersionFromConfig(opts.config)

  return {
    type: 'codemod',
    name: 'add prefix to tailwind classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST, astHelpers } }) {
      let transformCount = 0
      const { config } = opts

      if (!config.tailwind?.prefix)
        return transformCount

      // Helper function to check if a node is a variant property
      function isVariantProperty(node: any): boolean {
        if (node.type === 'Property') {
          // Check if property key is "variant", "size", etc.
          if (node.key?.type === 'Identifier') {
            const keyName = node.key.name
            return ['variant', 'size', 'color', 'type', 'state'].includes(keyName)
          }
          if (node.key?.type === 'Literal' && typeof node.key.value === 'string') {
            const keyName = node.key.value
            return ['variant', 'size', 'color', 'type', 'state'].includes(keyName)
          }
        }
        return false
      }

      function traverseExpression(expression: any): void {
        // Handle cn() function calls
        if (expression.type === 'CallExpression'
          && expression.callee?.type === 'Identifier'
          && expression.callee.name === 'cn') {
          expression.arguments.forEach((arg: any) => {
            if (arg.type === 'Literal' && typeof arg.value === 'string') {
              arg.value = applyPrefix(arg.value, config.tailwind.prefix, tailwindVersion)
              transformCount++
            }
            else if (arg.type === 'ConditionalExpression') {
              // Only transform consequent and alternate, not the test condition
              if (arg.consequent?.type === 'Literal' && typeof arg.consequent.value === 'string') {
                arg.consequent.value = applyPrefix(arg.consequent.value, config.tailwind.prefix, tailwindVersion)
                transformCount++
              }
              if (arg.alternate?.type === 'Literal' && typeof arg.alternate.value === 'string') {
                arg.alternate.value = applyPrefix(arg.alternate.value, config.tailwind.prefix, tailwindVersion)
                transformCount++
              }
            }
            else if (arg.type === 'BinaryExpression') {
              // Only transform the right side if it's a string literal
              if (arg.right?.type === 'Literal' && typeof arg.right.value === 'string') {
                arg.right.value = applyPrefix(arg.right.value, config.tailwind.prefix, tailwindVersion)
                transformCount++
              }
            }
            else if (arg.type === 'ObjectExpression') {
              // Handle object expressions like { variant: 'ghost', class: 'flex' }
              arg.properties.forEach((prop: any) => {
                if (prop.type === 'Property' && prop.value?.type === 'Literal' && typeof prop.value.value === 'string') {
                  // Only transform if it's NOT a variant property
                  if (!isVariantProperty(prop)) {
                    prop.value.value = applyPrefix(prop.value.value, config.tailwind.prefix, tailwindVersion)
                    transformCount++
                  }
                }
              })
            }
            else {
              // For other expression types, use astHelpers to find all literals
              const literals = astHelpers.findAll(arg, { type: 'Literal' })
              literals.forEach((literal: any) => {
                if (typeof literal.value === 'string') {
                  // Check if this literal is part of a variant property
                  let shouldTransform = true
                  let parent = literal.parent
                  while (parent) {
                    if (isVariantProperty(parent)) {
                      shouldTransform = false
                      break
                    }
                    parent = parent.parent
                  }

                  if (shouldTransform) {
                    literal.value = applyPrefix(literal.value, config.tailwind.prefix, tailwindVersion)
                    transformCount++
                  }
                }
              })
            }
          })
        }
        // Handle other expression types recursively if needed
        else if (expression.type === 'ConditionalExpression') {
          // Only transform consequent and alternate, not the test condition
          if (expression.consequent)
            traverseExpression(expression.consequent)
          if (expression.alternate)
            traverseExpression(expression.alternate)
        }
        else if (expression.type === 'BinaryExpression') {
          if (expression.left)
            traverseExpression(expression.left)
          if (expression.right)
            traverseExpression(expression.right)
        }
      }

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitCallExpression(path) {
            // Handle cva function calls
            if (path.node.callee.type === 'Identifier' && path.node.callee.name === 'cva') {
              const args = path.node.arguments

              // cva(base, ...)
              if (args[0]?.type === 'Literal' && typeof args[0].value === 'string') {
                args[0].value = applyPrefix(args[0].value, config.tailwind.prefix, tailwindVersion)
                transformCount++
              }

              // cva(..., { variants: { ... } })
              if (args[1]?.type === 'ObjectExpression') {
                const variantsProperty = args[1].properties.find(
                  prop => prop.type === 'Property'
                    && prop.key.type === 'Identifier'
                    && prop.key.name === 'variants',
                )

                if (variantsProperty && variantsProperty.type === 'Property' && variantsProperty.value.type === 'ObjectExpression') {
                  // Only transform class strings in variants, not the variant names themselves
                  const allProperties = astHelpers.findAll(variantsProperty.value, { type: 'Property' })
                  allProperties.forEach((prop: any) => {
                    if (prop.value?.type === 'Literal' && typeof prop.value.value === 'string') {
                      prop.value.value = applyPrefix(prop.value.value, config.tailwind.prefix, tailwindVersion)
                      transformCount++
                    }
                  })
                }
              }
            }

            // Handle cn function calls
            if (path.node.callee.type === 'Identifier' && path.node.callee.name === 'cn') {
              path.node.arguments.forEach((arg) => {
                if (arg.type === 'Literal' && typeof arg.value === 'string') {
                  arg.value = applyPrefix(arg.value, config.tailwind.prefix, tailwindVersion)
                  transformCount++
                }
                else if (arg.type === 'ConditionalExpression') {
                  // Only transform consequent and alternate, not the test condition
                  if (arg.consequent?.type === 'Literal' && typeof arg.consequent.value === 'string') {
                    arg.consequent.value = applyPrefix(arg.consequent.value, config.tailwind.prefix, tailwindVersion)
                    transformCount++
                  }
                  if (arg.alternate?.type === 'Literal' && typeof arg.alternate.value === 'string') {
                    arg.alternate.value = applyPrefix(arg.alternate.value, config.tailwind.prefix, tailwindVersion)
                    transformCount++
                  }
                }
                else if (arg.type === 'BinaryExpression') {
                  // Only transform the right side if it's a string literal
                  if (arg.right?.type === 'Literal' && typeof arg.right.value === 'string') {
                    arg.right.value = applyPrefix(arg.right.value, config.tailwind.prefix, tailwindVersion)
                    transformCount++
                  }
                }
                else if (arg.type === 'ObjectExpression') {
                  // Handle object expressions like { variant: 'ghost', class: 'flex' }
                  arg.properties.forEach((prop: any) => {
                    if (prop.type === 'Property' && prop.value?.type === 'Literal' && typeof prop.value.value === 'string') {
                      // Only transform if it's NOT a variant property
                      if (!isVariantProperty(prop)) {
                        prop.value.value = applyPrefix(prop.value.value, config.tailwind.prefix, tailwindVersion)
                        transformCount++
                      }
                    }
                  })
                }
                else {
                  // For other complex expressions, find all string literals but exclude variant properties
                  const literals = astHelpers.findAll(arg, { type: 'Literal' })
                  literals.forEach((literal) => {
                    if (typeof literal.value === 'string') {
                      // Check if this literal is part of a variant property
                      let shouldTransform = true
                      let parent = literal.parent
                      while (parent) {
                        if (isVariantProperty(parent)) {
                          shouldTransform = false
                          break
                        }
                        parent = parent.parent
                      }

                      if (shouldTransform) {
                        literal.value = applyPrefix(literal.value, config.tailwind.prefix, tailwindVersion)
                        transformCount++
                      }
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
            // Handle v-bind:class, :class, v-bind:className, :className
            if (node.type === 'VAttribute' && node.key.type === 'VDirectiveKey') {
              if (node.key.argument?.type === 'VIdentifier') {
                const argName = node.key.argument.name
                if (['class', 'className', 'classes', 'classNames'].includes(argName)) {
                  // Find literals but exclude condition values
                  if (node.value?.type === 'VExpressionContainer' && node.value.expression) {
                    traverseExpression(node.value.expression)
                  }
                }
              }
            }
            // Handle static class attributes
            else if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent?.type === 'VAttribute'
                && node.parent.key?.type === 'VIdentifier'
                && ['class', 'className', 'classes', 'classNames'].includes(node.parent.key.name)) {
                const cleanValue = node.value.replace(/"/g, '')
                const prefixedValue = applyPrefix(cleanValue, config.tailwind.prefix, tailwindVersion)
                node.value = `"${prefixedValue}"`
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

export function applyPrefix(input: string, prefix: string = '', tailwindVersion: TailwindVersion) {
  if (tailwindVersion === 'v3') {
    return input
      .split(' ')
      .map((className) => {
        const [variant, value, modifier] = splitClassName(className)
        if (variant) {
          return modifier
            ? `${variant}:${prefix}${value}/${modifier}`
            : `${variant}:${prefix}${value}`
        }
        else {
          return modifier
            ? `${prefix}${value}/${modifier}`
            : `${prefix}${value}`
        }
      })
      .join(' ')
  }

  return input
    .split(' ')
    .map(className =>
      className.indexOf(`${prefix}:`) === 0
        ? className
        : `${prefix}:${className.trim()}`,
    )
    .join(' ')
}

export function applyPrefixesCss(css: string, prefix: string, tailwindVersion: TailwindVersion) {
  const lines = css.split('\n')
  for (const line of lines) {
    if (line.includes('@apply')) {
      const originalTWCls = line.replace('@apply', '').trim()
      const prefixedTwCls = applyPrefix(originalTWCls, prefix, tailwindVersion)
      css = css.replace(originalTWCls, prefixedTwCls)
    }
  }
  return css
}
