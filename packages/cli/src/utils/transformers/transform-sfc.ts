import { createRequire } from 'node:module'
import { type SourceFile, SyntaxKind } from 'ts-morph'
import { transform as transformByDetype } from 'detype'
import type { Config } from '../get-config'
import { transformImport } from './transform-import'
import type { Transformer } from '@/src/utils/transformers'

export const transformSFC: Transformer<string> = async ({ sourceFile, config }) => {
  const output = sourceFile?.getFullText()
  if (config?.typescript)
    return output

  const clean = await transformByDetype(output, 'app.vue', {
    removeTsComments: true,
  })

  return clean
}
