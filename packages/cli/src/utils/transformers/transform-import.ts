import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'

export function transformImport(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'modify import based on user config',

    transform({ scriptASTs, utils: { traverseScriptAST } }) {
      const transformCount = 0
      const { config } = opts

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitImportDeclaration(path) {
            if (typeof path.node.source.value === 'string') {
              const sourcePath = path.node.source.value

              // Replace @/lib/registry/[style] with the components alias.
              if (sourcePath.startsWith('@/lib/registry/')) {
                if (config.aliases.ui) {
                  path.node.source.value = sourcePath.replace(/^@\/lib\/registry\/[^/]+\/ui/, config.aliases.ui)
                }
                else {
                  path.node.source.value = sourcePath.replace(/^@\/lib\/registry\/[^/]+/, config.aliases.components)
                }
              }

              // Replace `import { cn } from "@/lib/utils"`
              if (sourcePath === '@/lib/utils') {
                const namedImports = path.node.specifiers?.map(node => node.local?.name ?? '') ?? []
                // const namedImports = importDeclaration.getNamedImports()
                const cnImport = namedImports.find(i => i === 'cn')
                if (cnImport) {
                  path.node.source.value = sourcePath.replace(/^@\/lib\/utils/, config.aliases.utils)
                }
              }
            }
            return this.traverse(path)
          },
        })
      }

      return transformCount
    },
  }
}
