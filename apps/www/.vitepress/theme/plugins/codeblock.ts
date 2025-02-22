import type { MarkdownRenderer } from 'vitepress'

export default function (md: MarkdownRenderer) {
  const fence = md.renderer.rules.fence!
  if (!fence)
    return

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const title = token.info.match(/title="([^"]+)"/)?.[1] ?? null

    if (token && token.info === 'bash') {
      const npmCommand = token.content
      const props = { pnpm: '', npm: '', yarn: '', bun: '' }

      if (npmCommand.includes('npm install')) {
        props.npm = npmCommand
        props.yarn = npmCommand.replace('npm install', 'yarn add')
        props.pnpm = npmCommand.replace('npm install', 'pnpm add')
        props.bun = npmCommand.replace('npm install', 'bun add')
      }
      else if (npmCommand.includes('npx create-')) {
        props.npm = npmCommand
        props.yarn = npmCommand.replace('npx create-', 'yarn create')
        props.pnpm = npmCommand.replace('npx create-', 'pnpm create')
        props.bun = npmCommand.replace('npx', 'bunx --bun')
      }
      else if (npmCommand.includes('npm create')) {
        props.npm = npmCommand
        props.yarn = npmCommand.replace('npm create', 'yarn create')
        props.pnpm = npmCommand.replace('npm create', 'pnpm create')
        props.bun = npmCommand.replace('npm create', 'bun create')
      }
      else if (npmCommand.includes('npx')) {
        props.npm = npmCommand
        props.yarn = npmCommand
        props.pnpm = npmCommand.replace('npx', 'pnpm dlx')
        props.bun = npmCommand.replace('npx', 'bunx --bun')
      }
      else if (npmCommand.includes('npm run')) {
        props.npm = npmCommand
        props.yarn = npmCommand.replace('npm run', 'yarn')
        props.pnpm = npmCommand.replace('npm run', 'pnpm')
        props.bun = npmCommand.replace('npm run', 'bun')
      }

      if (props.npm) {
        return (`<CodeBlockCommand v-bind='${JSON.stringify({ tabs: props })}' />`)
      }
    }

    if (token.tag === 'code' && title) {
      return (
        `<div data-code-block-plugin>
        ${title ? `<div data-code-block-title>${title}</div>` : ''}
        ${fence(...args)}
        </div>`
      )
    }

    // If not a code block, return the default rendering
    return fence(...args)
  }
}
