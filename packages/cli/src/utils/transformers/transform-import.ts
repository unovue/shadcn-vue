import MagicString from 'magic-string'
import type { z } from 'zod'
import type { Config } from '../get-config'
import type { registryBaseColorSchema } from '../registry/schema'

export interface TransformOpts {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
}

export function transformImport(content: string, config: Config) {
  const s = new MagicString(content)
  s.replaceAll(/@\/registry\/[^/]+/g, config.aliases.components)
  s.replaceAll(/\$lib\/utils/g, config.aliases.utils)
  return s.toString()
}

// export const transformImport: Transformer = async ({ sourceFile, config }) => {
//   const importDeclarations = sourceFile.getImportDeclarations()

//   for (const importDeclaration of importDeclarations) {
//     const moduleSpecifier = importDeclaration.getModuleSpecifierValue()

//     // Replace @/registry/[style] with the components alias.
//     if (moduleSpecifier.startsWith('@/registry/')) {
//       importDeclaration.setModuleSpecifier(
//         moduleSpecifier.replace(
//           /^@\/registry\/[^/]+/,
//           config.aliases.components,
//         ),
//       )
//     }

//     // Replace `import { cn } from "@/lib/utils"`
//     if (moduleSpecifier === '@/lib/utils') {
//       const namedImports = importDeclaration.getNamedImports()
//       const cnImport = namedImports.find(i => i.getName() === 'cn')
//       if (cnImport) {
//         importDeclaration.setModuleSpecifier(
//           moduleSpecifier.replace(/^@\/lib\/utils/, config.aliases.utils),
//         )
//       }
//     }
//   }

//   return sourceFile
// }
