import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import { ICON_LIBRARIES } from '@/src/utils/icon-libraries'

// Lucide is the default icon library in the registry.
const SOURCE_LIBRARY = 'lucide'

// Precompute the set of known icon library import sources to avoid hardcoding lists.
const ICON_LIBRARY_IMPORTS = new Set(
  Object.values(ICON_LIBRARIES)
    .map(l => l.import)
    .filter(Boolean),
)

export function transformIcons(opts: TransformOpts, registryIcons: Record<string, Record<string, string>>): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'modify import of icon library on user config',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const { config } = opts

      // No transform if we cannot read the icon library.
      if (!config.iconLibrary || !(config.iconLibrary in ICON_LIBRARIES)) {
        return transformCount
      }

      const sourceLibrary = SOURCE_LIBRARY
      const targetLibrary = config.iconLibrary

      if (sourceLibrary === targetLibrary) {
        return transformCount
      }

      // Map<originalIcon, targetedIcon>
      const targetedIconsMap: Map<string, string> = new Map()

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitImportDeclaration(path) {
            const source = String(path.node.source.value)
            if (![...ICON_LIBRARY_IMPORTS].some(prefix => source.startsWith(prefix)))
              return this.traverse(path)

            let hasChanges = false

            for (const specifier of path.node.specifiers ?? []) {
              if (specifier.type === 'ImportSpecifier') {
                const iconName = specifier.imported.name
                const targetedIcon = registryIcons[iconName]?.[targetLibrary]

                if (!targetedIcon || targetedIconsMap.has(iconName)) {
                  continue
                }

                targetedIconsMap.set(iconName, targetedIcon)
                specifier.imported.name = targetedIcon
                hasChanges = true
              }
            }

            if (hasChanges) {
              path.node.source.value = ICON_LIBRARIES[targetLibrary as keyof typeof ICON_LIBRARIES].import
              transformCount++
            }

            return this.traverse(path)
          },
        })
      }

      // Move template traversal outside the loop
      if (sfcAST && targetedIconsMap.size > 0) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            if (node.type === 'VElement' && targetedIconsMap.has(node.rawName)) {
              node.rawName = targetedIconsMap.get(node.rawName) ?? ''
              transformCount++
            }
          },
        })
      }

      return transformCount
    },
  }
}
