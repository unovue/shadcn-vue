import type { z } from 'zod'
import type { registryBaseColorSchema } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import { transform as metaTransform } from 'vue-metamorph'
import { getRegistryIcons } from '@/src/registry/api'
import { transformCssVars } from '@/src/utils/transformers/transform-css-vars'
import { transformImport } from '@/src/utils/transformers/transform-import'
import { transformRtl } from '@/src/utils/transformers/transform-rtl'
import { transformSFC } from '@/src/utils/transformers/transform-sfc'
import { transformStyle } from '@/src/utils/transformers/transform-style'
import { transformTwPrefix } from '@/src/utils/transformers/transform-tw-prefix'
import { transformIcons } from './transform-icons'
import { transformMenu } from './transform-menu'

export interface TransformOpts {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
  isRemote?: boolean
}

export async function transform(opts: TransformOpts) {
  // Skip the transform pipeline for non-code files.
  // @babel/parser cannot parse formats like Markdown, and none of the
  // codemods (import rewriting, CSS vars, Tailwind prefix, icons) are
  // applicable to these files anyway.
  const nonCodeExtensions = ['.md', '.mdx', '.txt']
  if (nonCodeExtensions.some(ext => opts.filename.endsWith(ext)))
    return opts.raw

  const source = await transformSFC(opts)

  const registryIcons = await getRegistryIcons()

  return metaTransform(source, opts.filename, [
    transformImport(opts),
    transformCssVars(opts),
    transformRtl(opts),
    await transformTwPrefix(opts),
    transformIcons(opts, registryIcons),
    transformMenu(opts),
    transformStyle(opts),
  ]).code
}
