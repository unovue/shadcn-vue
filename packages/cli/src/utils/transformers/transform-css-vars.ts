import { SyntaxKind } from 'ts-morph'
import type * as z from 'zod'
import type { registryBaseColorSchema } from '@/src/utils/registry/schema'
import type { Transformer } from '@/src/utils/transformers'

export const transformCssVars: Transformer = async ({
  sourceFile,
  config,
  baseColor,
}) => {
  // No transform if using css variables.
  if (config.tailwind?.cssVariables || !baseColor?.inlineColors)
    return sourceFile

  sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((node) => {
    const value = node.getText()

    if (value.includes('cn(')) {
      const splitted = value.split('\'').map(i => applyColorMapping(i, baseColor.inlineColors))
      node.replaceWithText(`${splitted.join('\'')}`)
    }
    else if (value) {
      const valueWithColorMapping = applyColorMapping(
        value.replace(/"/g, ''),
        baseColor.inlineColors,
      )
      node.replaceWithText(`"${valueWithColorMapping.trim()}"`)
    }
  })

  return sourceFile
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

  // Build color mappings.
  const classNames = input.split(' ')
  const lightMode: string[] = []
  const darkMode: string[] = []
  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className)
    const prefix = PREFIXES.find(prefix => value?.startsWith(prefix))
    if (!prefix) {
      if (!lightMode.includes(className))
        lightMode.push(className)

      continue
    }

    const needle = value?.replace(prefix, '')
    if (needle && needle in mapping.light) {
      lightMode.push(
        [variant, `${prefix}${mapping.light[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      )

      darkMode.push(
        ['dark', variant, `${prefix}${mapping.dark[needle]}`]
          .filter(Boolean)
          .join(':') + (modifier ? `/${modifier}` : ''),
      )
      continue
    }

    if (!lightMode.includes(className))
      lightMode.push(className)
  }

  return `${lightMode.join(' ')} ${darkMode.join(' ').trim()}`
}
