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
  luma: {
    // Luma style: Fluid, luminous, and glassy
    'rounded-sm': 'rounded-xl',
    'rounded-md': 'rounded-2xl',
    'rounded-lg': 'rounded-3xl',
    'rounded-xl': 'rounded-3xl',
  },
}

/**
 * Apply class mappings to a string of CSS classes.
 * Uses word boundary matching to avoid partial replacements.
 */
function applyClassMappings(value: string, classMapping: Record<string, string>): string {
  let result = value
  for (const [from, to] of Object.entries(classMapping)) {
    const regex = new RegExp(`\\b${from}\\b`, 'g')
    result = result.replace(regex, to)
  }
  return result
}

/**
 * Transform component classes based on the selected visual style.
 * Handles:
 * - Static class attributes in templates (class="...")
 * - Dynamic class bindings in templates (:class="cn(...)")
 * - String literals in script (CVA variants, inline classes)
 *
 * Vega is the default style, so no transformations are applied.
 */
export function transformStyle(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'transform-style',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
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

      // --- Transform script blocks (handles CVA variants, inline strings) ---
      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            // Skip import declarations
            if (path.parent.value.type === 'ImportDeclaration') {
              return this.traverse(path)
            }

            if (typeof path.node.value === 'string') {
              const originalValue = path.node.value
              const newValue = applyClassMappings(originalValue, classMapping)
              if (newValue !== originalValue) {
                path.node.value = newValue
                transformCount++
              }
            }
            return this.traverse(path)
          },
          visitTemplateLiteral(path) {
            for (const quasi of path.node.quasis) {
              if (quasi.value.raw) {
                const originalValue = quasi.value.raw
                const newValue = applyClassMappings(originalValue, classMapping)
                if (newValue !== originalValue) {
                  quasi.value.raw = newValue
                  quasi.value.cooked = newValue
                  transformCount++
                }
              }
            }
            return this.traverse(path)
          },
        })
      }

      // --- Transform template blocks ---
      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            if (node.type !== 'VElement' || !node.startTag?.attributes) {
              return
            }

            for (const attr of node.startTag.attributes) {
              // Handle static class attribute: class="..."
              if (
                attr.type === 'VAttribute'
                && attr.key.type === 'VIdentifier'
                && attr.key.name === 'class'
                && attr.value
                && 'value' in attr.value
                && typeof attr.value.value === 'string'
              ) {
                const originalValue = attr.value.value
                const newValue = applyClassMappings(originalValue, classMapping)
                if (newValue !== originalValue) {
                  (attr.value as { value: string }).value = newValue
                  transformCount++
                }
              }

              // Handle dynamic class binding: :class="..." or v-bind:class="..."
              if (
                attr.type === 'VAttribute'
                && attr.key.type === 'VDirectiveKey'
                && attr.key.argument?.type === 'VIdentifier'
                && attr.key.argument.name === 'class'
                && attr.value?.type === 'VExpressionContainer'
                && attr.value.expression
              ) {
                transformExpression(attr.value.expression, classMapping, (count) => {
                  transformCount += count
                })
              }
            }
          },
        })
      }

      return transformCount
    },
  }
}

/**
 * Recursively traverse a Vue expression AST node to find and transform
 * string literals that contain CSS classes.
 */
function transformExpression(
  node: any,
  classMapping: Record<string, string>,
  onTransform: (count: number) => void,
) {
  if (!node)
    return

  // String literal: 'rounded-md bg-primary ...'
  if (node.type === 'Literal' && typeof node.value === 'string') {
    const originalValue = node.value
    const newValue = applyClassMappings(originalValue, classMapping)
    if (newValue !== originalValue) {
      node.value = newValue
      if (node.raw) {
        // Preserve quote style
        const quote = node.raw[0]
        node.raw = `${quote}${newValue}${quote}`
      }
      onTransform(1)
    }
    return
  }

  // Template literal: `rounded-md ${var}`
  if (node.type === 'TemplateLiteral' && node.quasis) {
    for (const quasi of node.quasis) {
      if (quasi.value?.raw) {
        const originalValue = quasi.value.raw
        const newValue = applyClassMappings(originalValue, classMapping)
        if (newValue !== originalValue) {
          quasi.value.raw = newValue
          quasi.value.cooked = newValue
          onTransform(1)
        }
      }
    }
    // Also traverse expressions inside template literals
    if (node.expressions) {
      for (const expr of node.expressions) {
        transformExpression(expr, classMapping, onTransform)
      }
    }
    return
  }

  // Function call: cn('...', '...')
  if (node.type === 'CallExpression' && node.arguments) {
    for (const arg of node.arguments) {
      transformExpression(arg, classMapping, onTransform)
    }
    return
  }

  // Array expression: ['...', '...']
  if (node.type === 'ArrayExpression' && node.elements) {
    for (const element of node.elements) {
      if (element) {
        transformExpression(element, classMapping, onTransform)
      }
    }
    return
  }

  // Conditional expression: condition ? '...' : '...'
  if (node.type === 'ConditionalExpression') {
    transformExpression(node.consequent, classMapping, onTransform)
    transformExpression(node.alternate, classMapping, onTransform)
    return
  }

  // Logical expression: condition && '...'
  if (node.type === 'LogicalExpression') {
    transformExpression(node.left, classMapping, onTransform)
    transformExpression(node.right, classMapping, onTransform)
    return
  }

  // Object expression (for class binding objects)
  if (node.type === 'ObjectExpression' && node.properties) {
    for (const prop of node.properties) {
      if (prop.key) {
        transformExpression(prop.key, classMapping, onTransform)
      }
    }
  }
}
