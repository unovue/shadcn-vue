import { fileURLToPath } from 'node:url'
import path from 'pathe'
import fs from 'fs-extra'
import { type PackageJson } from 'type-fest'

export function getPackageInfo() {
  const packageJsonPath = getPackageFilePath('../package.json')

  return fs.readJSONSync(packageJsonPath) as PackageJson
}

function getPackageFilePath(filePath: string) {
  const distPath = fileURLToPath(new URL('.', import.meta.url))

  return path.resolve(distPath, filePath)
}
