import { createRequire } from 'node:module'
import type { TransformOpts } from '.'

// required cause Error: Dynamic require of "@babel/core" is not supported
const require = createRequire(import.meta.url)
const { transform } = require('detype')

export async function transformSFC(opts: TransformOpts) {
  if (opts.config?.typescript || opts.filename.includes('.ts'))
    return opts.raw

  return await transformByDetype(opts.raw, opts.filename).then(res => res as string)
}

export async function transformByDetype(content: string, filename: string) {
  return await transform(content, filename, {
    removeTsComments: true,
  })
}
