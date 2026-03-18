import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'

// Transforms cn-menu-target class based on config.menuColor.
// If menuColor is "inverted", replaces cn-menu-target with "dark".
// Otherwise, removes cn-menu-target entirely.
export function transformMenu(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'transform menu color classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const { config } = opts
      const menuColor = config.menuColor

      // If menuColor is not set or is "default", we remove the placeholder.
      const replacement = menuColor === 'inverted' ? 'dark' : ''

      const processClassString = (classString: string): string => {
        if (!classString.includes('cn-menu-target')) {
          return classString
        }

        // Replace cn-menu-target with the replacement value.
        let newText = classString.replace(/cn-menu-target/g, replacement)

        // Clean up extra spaces if we removed the class.
        if (!replacement) {
          // Remove double spaces.
          newText = newText.replace(/\s{2,}/g, ' ')
          // Clean up leading/trailing spaces.
          newText = newText.trim()
        }

        return newText
      }

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            // Skip import declarations
            if (path.parent.value.type === 'ImportDeclaration') {
              return this.traverse(path)
            }

            if (typeof path.node.value === 'string' && path.node.value.includes('cn-menu-target')) {
              const original = path.node.value
              const processed = processClassString(original)

              if (processed !== original) {
                path.node.value = processed
                transformCount++
              }
            }

            return this.traverse(path)
          },

          visitJSXAttribute(path) {
            const attrName = path.node.name?.name
            if (attrName !== 'className') {
              return this.traverse(path)
            }

            const value = path.node.value
            if (!value) {
              return this.traverse(path)
            }

            // Handle string literal
            if (value.type === 'Literal' && typeof value.value === 'string') {
              if (value.value.includes('cn-menu-target')) {
                const original = value.value
                const processed = processClassString(original)

                if (processed !== original) {
                  value.value = processed
                  transformCount++
                }
              }
            }

            return this.traverse(path)
          },
        })
      }

      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            // Handle static class attributes
            if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent?.type === 'VAttribute'
                && node.parent.key?.type === 'VIdentifier'
                && ['class', 'className'].includes(node.parent.key.name)) {
                if (node.value.includes('cn-menu-target')) {
                  const cleanValue = node.value.replace(/"/g, '')
                  const processed = processClassString(cleanValue)

                  if (processed !== cleanValue) {
                    node.value = `"${processed}"`
                    transformCount++
                  }
                }
              }
            }
            // Handle bound class attributes
            else if (node.type === 'Literal' && typeof node.value === 'string') {
              if (node.value.includes('cn-menu-target')) {
                const original = node.value
                const processed = processClassString(original)

                if (processed !== original) {
                  node.value = processed
                  transformCount++
                }
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
