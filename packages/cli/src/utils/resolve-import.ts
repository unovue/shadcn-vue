import { createPathsMatcher, type TsConfigResult } from 'get-tsconfig'

export function resolveImport(importPath: string, config: TsConfigResult) {
  const matcher = createPathsMatcher(config)
  if (matcher === null) {
    return
  }
  const paths = matcher(importPath)
  return paths[0]
}
