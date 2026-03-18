import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'

// Style-specific CSS class mappings for different visual styles
const STYLE_CLASS_MAPPINGS: Record<string, Record<string, string>> = {
  nova: {
    // Nova style: Reduced padding and margins for compact layouts
    'p-6': 'p-4',
    'p-8': 'p-6',
    'px-6': 'px-4',
    'px-8': 'px-6',
    'py-6': 'py-4',
    'py-8': 'py-6',
    'm-6': 'm-4',
    'm-8': 'm-6',
    'gap-6': 'gap-4',
    'gap-8': 'gap-6',
    'space-y-6': 'space-y-4',
    'space-y-8': 'space-y-6',
    'space-x-6': 'space-x-4',
    'space-x-8': 'space-x-6',
  },
  maia: {
    // Maia style: Soft and rounded, with generous spacing
    'rounded-md': 'rounded-xl',
    'rounded-lg': 'rounded-2xl',
    'rounded-sm': 'rounded-md',
    'p-4': 'p-6',
    'p-3': 'p-4',
    'px-4': 'px-6',
    'py-4': 'py-6',
    'gap-4': 'gap-6',
    'gap-3': 'gap-4',
  },
  lyra: {
    // Lyra style: Boxy and sharp, pairs well with mono fonts
    'rounded-md': 'rounded-none',
    'rounded-lg': 'rounded-none',
    'rounded-xl': 'rounded-none',
    'rounded-2xl': 'rounded-none',
    'rounded-sm': 'rounded-none',
    'rounded-full': 'rounded-none',
  },
  mira: {
    // Mira style: Compact, made for dense interfaces
    'p-4': 'p-2',
    'p-6': 'p-4',
    'p-8': 'p-5',
    'px-4': 'px-2',
    'px-6': 'px-4',
    'py-4': 'py-2',
    'py-6': 'py-4',
    'm-4': 'm-2',
    'm-6': 'm-4',
    'gap-4': 'gap-2',
    'gap-6': 'gap-4',
    'space-y-4': 'space-y-2',
    'space-y-6': 'space-y-4',
    'space-x-4': 'space-x-2',
    'space-x-6': 'space-x-4',
    'text-base': 'text-sm',
    'text-lg': 'text-base',
    'text-xl': 'text-lg',
    'h-10': 'h-8',
    'h-12': 'h-10',
    'w-10': 'w-8',
    'w-12': 'w-10',
  },
}

/**
 * Transform component classes based on the selected visual style.
 * Vega is the default style, so no transformations are applied.
 */
export function transformStyle(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'transform-style',

    transform({ sfcAST, utils: { traverseTemplateAST } }) {
      let transformCount = 0
      const { config } = opts

      // Get style from config, default to vega (no transformations)
      const style = config.style?.split('-')[0] || 'vega'

      // Vega is the default, no transformations needed
      if (style === 'vega' || style === 'new') {
        return transformCount
      }

      const classMapping = STYLE_CLASS_MAPPINGS[style]
      if (!classMapping) {
        return transformCount
      }

      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            // Handle class attributes on elements
            if (node.type === 'VElement' && node.startTag?.attributes) {
              for (const attr of node.startTag.attributes) {
                // Handle static class attribute
                if (
                  attr.type === 'VAttribute'
                  && attr.key.type === 'VIdentifier'
                  && attr.key.name === 'class'
                  && attr.value
                  && 'value' in attr.value
                  && typeof attr.value.value === 'string'
                ) {
                  const originalValue = attr.value.value
                  let newValue = originalValue

                  for (const [from, to] of Object.entries(classMapping)) {
                    // Use word boundary matching to avoid partial matches
                    const regex = new RegExp(`\\b${from}\\b`, 'g')
                    newValue = newValue.replace(regex, to)
                  }

                  if (newValue !== originalValue) {
                    (attr.value as { value: string }).value = newValue
                    transformCount++
                  }
                }
              }
            }
          },
        })
      }

      return transformCount
    },
  }
}
