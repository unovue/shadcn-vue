import type * as z from 'zod'
import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import type { registryBaseColorSchema } from '@/src/utils/registry/schema'

export function transformCssVars(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'add prefix to tailwind classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const { baseColor, config } = opts

      if (config.tailwind?.cssVariables || !baseColor?.inlineColors)
        return transformCount

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            if (path.parent.value.type !== 'ImportDeclaration' && typeof path.node.value === 'string') {
            // mutate the node
              path.node.value = applyColorMapping(path.node.value.replace(/"/g, ''), baseColor.inlineColors)
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
                node.value = applyColorMapping(node.value.replace(/"/g, ''), baseColor.inlineColors)
                transformCount++
              }
            }
            // handle class attribute without binding
            else if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent.key.name === 'class') {
                node.value = applyColorMapping(node.value.replace(/"/g, ''), baseColor.inlineColors)
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

// Splits a className into variant-name-alpha.
// eg. hover:bg-primary-100 -> [hover, bg-primary, 100]
export function splitClassName(className: string): (string | null)[] {
  if (!className.includes('/') && !className.includes(':'))
    return [null, className, null]

  const parts: (string | null)[] = []
  // First we split to find the alpha.
  const [rest, alpha] = className.split('/')

  // Check if rest has a colon.
  if (!rest.includes(':'))
    return [null, rest, alpha]

  // Next we split the rest by the colon.
  const split = rest.split(':')

  // We take the last item from the split as the name.
  const name = split.pop()

  // We glue back the rest of the split.
  const variant = split.join(':')

  // Finally we push the variant, name and alpha.
  parts.push(variant ?? null, name ?? null, alpha ?? null)

  return parts
}

const PREFIXES = ['bg-', 'text-', 'border-', 'ring-offset-', 'ring-']

export function applyColorMapping(
  input: string,
  mapping: z.infer<typeof registryBaseColorSchema>['inlineColors'],
) {
  // Handle border classes.
  if (input.includes(' border '))
    input = input.replace(' border ', ' border border-border ')

  const classNames = input.split(' ')
  const lightMode = new Set<string>()
  const darkMode = new Set<string>()
  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className)
    const prefix = PREFIXES.find(prefix => value?.startsWith(prefix))
    if (!prefix) {
      if (!lightMode.has(className))
        lightMode.add(className)

      continue
    }

    const needle = value?.replace(prefix, '')
    if (needle && needle in mapping.light) {
      lightMode.add(
        [variant, `${prefix}${mapping.light[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      )

      darkMode.add(
        ['dark', variant, `${prefix}${mapping.dark[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      )
      continue
    }

    if (!lightMode.has(className))
      lightMode.add(className)
  }

  return [...Array.from(lightMode), ...Array.from(darkMode)].join(' ').trim()
}
