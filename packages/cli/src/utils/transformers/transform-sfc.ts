import type { SFCBlock } from '@vue/compiler-sfc'
import type { TransformOpts } from '.'
import { parse } from '@vue/compiler-sfc'
import { transform } from 'esbuild'
import MagicString from 'magic-string'
import { format } from 'prettier'
import { preTranspileScriptSetup, transpileVueTemplate } from 'vue-sfc-transformer'

export async function transformSFC(opts: TransformOpts) {
  if (opts.config?.typescript)
    return opts.raw

  return opts.filename.endsWith('.vue')
    ? await transformVueSFC(opts.raw, opts.filename)
    : await transformScript(opts.raw, opts.filename)
}

export async function transformVueSFC(content: string, filename: string) {
  const { descriptor, errors } = parse(content, {
    filename,
    ignoreEmpty: true,
  })

  if (errors.length) {
    throw new Error(errors.map(error => typeof error === 'string' ? error : error.message).join('\n'))
  }

  const output = new MagicString(content)
  const isTypeScriptSFC = [descriptor.script, descriptor.scriptSetup]
    .some(block => block?.lang === 'ts' || block?.lang === 'tsx')

  if (isTypeScriptSFC && descriptor.template?.ast) {
    const template = await transpileVueTemplate(
      descriptor.template.content,
      descriptor.template.ast as Parameters<typeof transpileVueTemplate>[1],
      descriptor.template.loc.start.offset,
      async code => await stripTypeScript(code, 'ts'),
    )
    replaceBlockContent(output, content, descriptor.template, template)
  }

  if (
    !descriptor.script?.src
    && (descriptor.script?.lang === 'ts' || descriptor.script?.lang === 'tsx')
  ) {
    const script = await stripTypeScript(descriptor.script.content, descriptor.script.lang)
    replaceBlockContent(output, content, descriptor.script, script, true)
  }

  if (descriptor.scriptSetup?.lang === 'ts' || descriptor.scriptSetup?.lang === 'tsx') {
    const preTranspiled = await preTranspileScriptSetup(
      descriptor as Parameters<typeof preTranspileScriptSetup>[0],
      filename,
    )
    const scriptSetup = await stripTypeScript(preTranspiled.content, descriptor.scriptSetup.lang)
    replaceBlockContent(output, content, descriptor.scriptSetup, scriptSetup, true)
  }

  return await format(output.toString(), {
    parser: 'vue',
    proseWrap: 'never',
  })
}

async function transformScript(content: string, filename: string) {
  const loader = getScriptLoader(filename)

  if (!loader)
    return content

  const output = await stripTypeScript(content, loader)

  return await format(output, {
    parser: loader === 'ts' || loader === 'tsx' ? 'typescript' : 'babel',
    proseWrap: 'never',
  })
}

function getScriptLoader(filename: string) {
  if (filename.endsWith('.tsx'))
    return 'tsx' as const
  if (filename.endsWith('.jsx'))
    return 'jsx' as const
  if (['.js', '.cjs', '.mjs'].some(extension => filename.endsWith(extension)))
    return 'js' as const
  if (['.ts', '.cts', '.mts'].some(extension => filename.endsWith(extension)))
    return 'ts' as const
}

async function stripTypeScript(content: string, loader: 'js' | 'jsx' | 'ts' | 'tsx') {
  const result = await transform(content, {
    loader,
    target: 'esnext',
    legalComments: 'none',
  })

  return result.code.trimEnd()
}

function replaceBlockContent(
  output: MagicString,
  source: string,
  block: SFCBlock,
  content: string,
  removeTypeScriptLang = false,
) {
  output.overwrite(block.loc.start.offset, block.loc.end.offset, content)

  if (!removeTypeScriptLang)
    return

  const blockStart = source.lastIndexOf(`<${block.type}`, block.loc.start.offset)
  const openTag = source.slice(blockStart, block.loc.start.offset)
  const transformedOpenTag = openTag.replace(/\s+lang\s*=\s*(?:"tsx?"|'tsx?'|tsx?)(?=\s|\/?>)/, '')

  output.overwrite(blockStart, block.loc.start.offset, transformedOpenTag)
}
