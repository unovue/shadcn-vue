import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'

const require = createRequire(import.meta.url)
const viteRequire = createRequire(require.resolve('@tailwindcss/vite'))
const { Scanner } = viteRequire('@tailwindcss/oxide')

const commandItemPath = fileURLToPath(
  new URL('../../registry/new-york-v4/ui/command/CommandItem.vue', import.meta.url),
)
const source = await readFile(commandItemPath, 'utf8')
const candidates: string[] = new Scanner({ sources: [] }).scanFiles([
  { content: source, extension: 'vue' },
])

const expectedCandidates = [
  '[&_svg:not([class*=\'text-\'])]:text-muted-foreground',
  '[&_svg:not([class*=\'size-\'])]:size-4',
]

for (const candidate of expectedCandidates)
  assert.ok(candidates.includes(candidate), `Tailwind did not extract ${candidate}`)

const compiler = await compile(`
  @theme {
    --color-muted-foreground: #656565;
    --spacing: 0.25rem;
  }
  @tailwind utilities;
`)
const css = compiler.build(expectedCandidates)

assert.match(css, /svg:not\(\[class\*='text-'\]\)/)
assert.match(css, /svg:not\(\[class\*='size-'\]\)/)
