import { createRequire } from 'node:module'
import type { Config } from '../get-config'

const require = createRequire(import.meta.url)
const { transform } = require('detype')

interface File {
  name: string
  content: string
}

export async function transformSFC(file: File, config: Config) {
  if (config.typescript)
    return file.content

  return await transform(file.content, file.name, {
    removeTsComments: true,
  })
}
