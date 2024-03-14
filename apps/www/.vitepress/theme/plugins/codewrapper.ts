import type { MarkdownRenderer } from 'vitepress'

export default function (md: MarkdownRenderer) {
  const defaultFenceRenderer = md.renderer.rules.fence
  if (!defaultFenceRenderer)
    return

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    // Check if this is a code block
    const token = tokens[idx]
    const isAllowedExtension = (token.info.includes('vue') || token.info.includes('astro') || token.info.includes('ts'))
    if (token && token.tag === 'code' && isAllowedExtension) {
      // Wrap the code block in CodeWrapper
      return `<CodeWrapper>${defaultFenceRenderer(tokens, idx, options, env, self)}</CodeWrapper>`
    }

    // If not a code block, return the default rendering
    return defaultFenceRenderer(tokens, idx, options, env, self)
  }
}
