import type { TsConfigResult } from 'get-tsconfig'
import { createPathsMatcher } from 'get-tsconfig'
import path from 'pathe'

export function resolveImport(importPath: string, config: TsConfigResult) {
  const matcher = createPathsMatcher(config)
  if (matcher === null) {
    return
  }
  const paths = matcher(importPath)
  if (paths[0]) {
    return paths[0]
  }

  // Handle the case where importPath exactly matches an alias prefix without
  // a trailing path segment. e.g., "@components" should resolve when the
  // tsconfig has "@components/*": ["./src/components/*"].
  const tsconfigPaths = config.config.compilerOptions?.paths ?? {}
  const baseUrl = config.config.compilerOptions?.baseUrl ?? '.'
  const configDir = path.dirname(config.path)
  const resolvedBaseUrl = path.resolve(configDir, baseUrl)

  for (const [pattern, mappings] of Object.entries(tsconfigPaths)) {
    const cleanPattern = pattern.replace(/\/\*$/, '')
    if (cleanPattern === importPath && Array.isArray(mappings) && mappings.length > 0) {
      const mapping = String(mappings[0]).replace(/\/\*$/, '')
      return path.resolve(resolvedBaseUrl, mapping)
    }
  }

  return undefined
}
