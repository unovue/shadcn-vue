import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import { ICON_LIBRARIES } from '@/src/utils/icon-libraries'

// Lucide is the default icon library in the registry.
const SOURCE_LIBRARY = 'lucide'

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

      // Map<orignalIcon, targetedIcon>
      const targetedIconsMap: Map<string, string> = new Map()
      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {

          visitImportDeclaration(path) {
            if (![ICON_LIBRARIES.radix.import, ICON_LIBRARIES.lucide.import].includes(`${path.node.source.value}`))
              return this.traverse(path)

            for (const specifier of path.node.specifiers ?? []) {
              if (specifier.type === 'ImportSpecifier') {
                const iconName = specifier.imported.name

                const targetedIcon = registryIcons[iconName]?.[targetLibrary]

                if (!targetedIcon || targetedIconsMap.has(targetedIcon)) {
                  continue
                }

                targetedIconsMap.set(iconName, targetedIcon)
                specifier.imported.name = targetedIcon
              }
            }

            if (targetedIconsMap.size > 0)
              path.node.source.value = ICON_LIBRARIES[targetLibrary as keyof typeof ICON_LIBRARIES].import

            return this.traverse(path)
          },
        })

        if (sfcAST) {
          traverseTemplateAST(sfcAST, {
            enterNode(node) {
              if (node.type === 'VElement' && targetedIconsMap.has(node.rawName)) {
                node.rawName = targetedIconsMap.get(node.rawName) ?? ''
                transformCount++
              }
            },
          })
        }
      }

      return transformCount
    },
  }
}
