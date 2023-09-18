import { createRequire } from 'node:module'
import type { Config } from '../get-config'
import { transformImport } from './transform-import'

const require = createRequire(import.meta.url)
const { transform } = require('detype')

export async function transformByDetype(content: string, filename: string) {
  return await transform(content, filename, {
    removeTsComments: true,
  })
}

interface File {
  name: string
  content: string
}

export async function transformSFC(file: File, config: Config) {
  let content = transformImport(file.content, config)
  if (config.typescript)
    content = await transformByDetype(content, file.name)

  return content
}
