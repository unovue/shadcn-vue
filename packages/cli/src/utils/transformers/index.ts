import { promises as fs } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'pathe'
import { Project, ScriptKind, type SourceFile } from 'ts-morph'
import type * as z from 'zod'
import type { Config } from '@/src/utils/get-config'
import type { registryBaseColorSchema } from '@/src/utils/registry/schema'
import { transformCssVars } from '@/src/utils/transformers/transform-css-vars'
import { transformImport } from '@/src/utils/transformers/transform-import'
import { transformSFC } from '@/src/utils/transformers/transform-sfc'

export interface TransformOpts {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
}

export type Transformer<Output = SourceFile> = (
  opts: TransformOpts & {
    sourceFile: SourceFile
  }
) => Promise<Output>

const transformers: Transformer[] = [
  transformCssVars,
  transformImport,
  // transformTwPrefixes,
]

const project = new Project({
  compilerOptions: {},
})

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'shadcn-'))
  return path.join(dir, filename)
}

export async function transform(opts: TransformOpts) {
  const tempFile = await createTempSourceFile(opts.filename)
  const sourceFile = project.createSourceFile(tempFile, opts.raw, {
    scriptKind: ScriptKind.Unknown,
  })

  for (const transformer of transformers)
    transformer({ sourceFile, ...opts })

  return await transformSFC({
    sourceFile,
    ...opts,
  })
}
