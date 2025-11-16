import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'

export function transformImport(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'modify import based on user config',

    transform({ scriptASTs, utils: { traverseScriptAST } }) {
      let transformCount = 0
      const { config, isRemote } = opts

      const utilsAlias = config.aliases?.utils
      const workspaceAlias
        = typeof utilsAlias === 'string' && utilsAlias.includes('/')
          ? utilsAlias.split('/')[0]
          : '@'
      const utilsImport = `${workspaceAlias}/lib/utils`

      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            if (typeof path.node.value === 'string') {
              const parent = path.parent.value

              // Handle both static imports and dynamic imports
              if (parent.type === 'ImportDeclaration'
                || (parent.type === 'CallExpression' && parent.callee?.name === 'import')) {
                const sourcePath = path.node.value
                const updatedImport = updateImportAliases(sourcePath, config, isRemote)

                if (updatedImport !== sourcePath) {
                  path.node.value = updatedImport
                  transformCount++
                }

                // Replace `import { cn } from "@/lib/utils"` or `await import("@/lib/utils")`
                if (utilsImport === updatedImport || updatedImport === '@/lib/utils') {
                  // For static imports, check named imports
                  if (parent.type === 'ImportDeclaration') {
                    const namedImports = parent.specifiers?.map(node => node.local?.name ?? '') ?? []
                    const isCnImport = namedImports.find(i => i === 'cn')

                    if (isCnImport && config.aliases.utils) {
                      path.node.value = utilsImport === updatedImport
                        ? updatedImport.replace(utilsImport, config.aliases.utils)
                        : config.aliases.utils
                      transformCount++
                    }
                  }
                  // For dynamic imports, we need to check the context differently
                  // This is a simplified approach - you might need more sophisticated checking
                  else if (parent.type === 'CallExpression') {
                    // Check if this dynamic import is destructuring cn
                    // This would require more complex AST traversal to determine usage
                    const grandParent = path.parent.parent?.value
                    if (grandParent?.type === 'VariableDeclarator'
                      && grandParent.id?.type === 'ObjectPattern') {
                      const hasCnProperty = grandParent.id.properties?.some(
                        prop => prop.key?.name === 'cn',
                      )

                      if (hasCnProperty && config.aliases.utils) {
                        path.node.value = utilsImport === updatedImport
                          ? updatedImport.replace(utilsImport, config.aliases.utils)
                          : config.aliases.utils
                        transformCount++
                      }
                    }
                  }
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

function updateImportAliases(
  moduleSpecifier: string,
  config: TransformOpts['config'],
  isRemote: boolean = false,
) {
  // Not a local import.
  if (!moduleSpecifier.startsWith('@/') && !isRemote) {
    return moduleSpecifier
  }

  // This treats the remote as coming from a faux registry.
  if (isRemote && moduleSpecifier.startsWith('@/')) {
    moduleSpecifier = moduleSpecifier.replace(/^@\//, `@/registry/new-york/`)
  }

  // Not a registry import.
  if (!moduleSpecifier.startsWith('@/registry/')) {
    // We fix the alias and return.
    const alias = config.aliases.components.split('/')[0]
    return moduleSpecifier.replace(/^@\//, `${alias}/`)
  }

  if (moduleSpecifier.match(/^@\/registry\/(.+)\/ui/)) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/ui/,
      config.aliases.ui ?? `${config.aliases.components}/ui`,
    )
  }

  if (
    config.aliases.components
    && moduleSpecifier.match(/^@\/registry\/(.+)\/components/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/components/,
      config.aliases.components,
    )
  }

  if (config.aliases.lib && moduleSpecifier.match(/^@\/registry\/(.+)\/lib/)) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/lib/,
      config.aliases.lib,
    )
  }

  if (
    config.aliases.composables
    && moduleSpecifier.match(/^@\/registry\/(.+)\/composables/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/composables/,
      config.aliases.composables,
    )
  }

  return moduleSpecifier.replace(
    /^@\/registry\/[^/]+/,
    config.aliases.components,
  )
}
