import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import type { Config } from '@/src/utils/get-config'

export function transformImport(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'modify import based on user config',

    // eslint-disable-next-line unused-imports/no-unused-vars
    transform({ scriptASTs, sfcAST, styleASTs, filename, utils: { traverseScriptAST, traverseTemplateAST } }) {
      // codemod plugins self-report the number of transforms it made
      // this is only used to print the stats in CLI output
      const transformCount = 0
      const { config } = opts

      // scriptASTs is an array of Program ASTs
      // in a js/ts file, this array will only have one item
      // in a vue file, this array will have one item for each <script> block
      for (const scriptAST of scriptASTs) {
      // traverseScriptAST is an alias for the ast-types 'visit' function
      // see: https://github.com/benjamn/ast-types#ast-traversal
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
