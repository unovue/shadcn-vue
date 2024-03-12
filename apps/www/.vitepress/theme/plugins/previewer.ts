import { dirname, resolve } from 'node:path'
import fs from 'node:fs'
import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'
import { generateDemoComponent, parseProps } from './utils'

export default function (md: MarkdownRenderer) {
  function addRenderRule(type: string) {
    const defaultRender = md.renderer.rules[type]
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      const content = token.content.trim()
      if (!content.match(/^<ComponentPreview\s/) || !content.endsWith('/>'))
        return defaultRender!(tokens, idx, options, env, self)

      const { path } = env as MarkdownEnv
      const props = parseProps(content)

      const { name, attrs } = props
      const pluginPath = dirname(__dirname)
      const srcPath = resolve(pluginPath, '../../src/lib/registry/default/example/', `${name}.vue`).replace(/\\/g, '/')
      const srcPathNewYork = resolve(pluginPath, '../../src/lib/registry/new-york/example/', `${name}.vue`).replace(/\\/g, '/')

      if (!fs.existsSync(srcPath)) {
        console.error(`rendering ${path}: ${srcPath} does not exist`)
        return defaultRender!(tokens, idx, options, env, self)
      }
      if (!fs.existsSync(srcPathNewYork)) {
        console.error(`rendering ${path}: ${srcPathNewYork} does not exist`)
        return defaultRender!(tokens, idx, options, env, self)
      }

      let code = fs.readFileSync(srcPath, 'utf-8')
      code = code.replaceAll(
        '@/lib/registry/default/',
        '@/components/',
      )

      let codeNewYork = fs.readFileSync(srcPathNewYork, 'utf-8')
      codeNewYork = codeNewYork.replaceAll(
        '@/lib/registry/default/',
        '@/components/',
      )

      const demoScripts = generateDemoComponent(md, env, {
        attrs,
        props,
        code,
        codeNewYork,
        path: srcPath,
      })

      return demoScripts
    }
  }
  addRenderRule('html_block')
  addRenderRule('html_inline')
}
