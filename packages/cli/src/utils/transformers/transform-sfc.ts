import { transform } from 'detypes'
import type { TransformOpts } from '.'

export async function transformSFC(opts: TransformOpts) {
  if (opts.config?.typescript)
    return opts.raw

  return await transformByDetype(opts.raw, opts.filename).then(res => res as string)
}

export async function transformByDetype(content: string, filename: string) {
  return await transform(content, filename, {
    removeTsComments: true,
    prettierOptions: {
      proseWrap: 'never',
    },
  })
}
