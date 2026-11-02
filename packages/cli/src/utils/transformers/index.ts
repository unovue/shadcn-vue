import type { z } from 'zod'
import type { registryBaseColorSchema } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import path from 'pathe'
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

export interface SourceFile {
  path: string
  content?: string
}

export interface TransformOpts {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
  isRemote?: boolean
  // The other files of the registry item `filename` belongs to, so that an SFC
  // can resolve types it imports from its siblings.
  sourceFiles?: SourceFile[]
}

const TRANSFORMABLE_EXTENSIONS = new Set([
  '.vue',
  '.ts',
  '.tsx',
  '.cts',
  '.mts',
  '.js',
  '.jsx',
  '.cjs',
  '.mjs',
  '.css',
])

export async function transform(opts: TransformOpts) {
  // Only run the pipeline on file types it is built for. Anything else
  // (Markdown, SVG, JSON, YAML, .env, ...) is returned untouched, since
  // @babel/parser cannot parse them and the codemods don't apply.
  if (!TRANSFORMABLE_EXTENSIONS.has(path.extname(opts.filename).toLowerCase()))
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
