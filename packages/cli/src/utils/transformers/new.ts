import { transform as metaTransform } from 'vue-metamorph'
import type { AST, CodemodPlugin } from 'vue-metamorph'
import type * as z from 'zod'
import { splitClassName } from './transform-css-vars'
import type { Config } from '@/src/utils/get-config'
import type { registryBaseColorSchema } from '@/src/utils/registry/schema'

export interface TransformOpts {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
}

function transformTwPrefix(config: Config): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'change string literals to hello, world',

    // eslint-disable-next-line unused-imports/no-unused-vars
    transform({ scriptASTs, sfcAST, styleASTs, filename, utils: { traverseScriptAST, traverseTemplateAST } }) {
    // codemod plugins self-report the number of transforms it made
    // this is only used to print the stats in CLI output
      let transformCount = 0

      // scriptASTs is an array of Program ASTs
      // in a js/ts file, this array will only have one item
      // in a vue file, this array will have one item for each <script> block
      for (const scriptAST of scriptASTs) {
      // traverseScriptAST is an alias for the ast-types 'visit' function
      // see: https://github.com/benjamn/ast-types#ast-traversal
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
      // traverseTemplateAST is an alias for the vue-eslint-parser 'AST.traverseNodes' function
      // see: https://github.com/vuejs/vue-eslint-parser/blob/master/src/ast/traverse.ts#L118
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

export function transform(opt: TransformOpts) {
  return metaTransform(opt.raw, opt.filename, [transformTwPrefix(opt.config)]).code
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
