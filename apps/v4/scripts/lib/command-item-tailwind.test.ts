import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'

const require = createRequire(import.meta.url)
const viteRequire = createRequire(require.resolve('@tailwindcss/vite'))
const { Scanner } = viteRequire('@tailwindcss/oxide')

const appRoot = fileURLToPath(new URL('../../', import.meta.url))
const generatedStyles = (await readdir(join(appRoot, 'styles'), { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => `styles/${entry.name}/ui`)

// Hand-written registry sources plus the per-style output of `registry:build`,
// which is what the CLI installs into user projects.
const uiDirectories = [
  'registry/new-york-v4/ui',
  'registry/bases/reka/ui',
  ...generatedStyles,
]

const invalidCandidates: string[] = []
const extractedCandidates = new Set<string>()

for (const uiDirectory of uiDirectories) {
  const uiPath = join(appRoot, uiDirectory)
  const files = (await readdir(uiPath, { recursive: true }))
    .filter(relativePath => /\.(?:vue|ts)$/.test(relativePath))
    .sort()

  for (const relativePath of files) {
    const source = await readFile(join(uiPath, relativePath), 'utf8')
    const candidates: string[] = new Scanner({ sources: [] }).scanFiles([
      { content: source, extension: relativePath.endsWith('.vue') ? 'vue' : 'ts' },
    ])

    for (const candidate of candidates) {
      extractedCandidates.add(candidate)

      if (/class\*=\\'/.test(candidate))
        invalidCandidates.push(`${uiDirectory}/${relativePath}: ${candidate}`)
    }
  }
}

assert.deepEqual(
  invalidCandidates,
  [],
  `Tailwind extracted escaped selectors:\n${invalidCandidates.join('\n')}`,
)

const expectedCandidates = [
  '[&_svg:not([class*=\'text-\'])]:text-muted-foreground',
  '[&_svg:not([class*=\'size-\'])]:size-4',
]

for (const candidate of expectedCandidates)
  assert.ok(extractedCandidates.has(candidate), `Tailwind did not extract ${candidate}`)

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
assert.match(css, /color: var\(--color-muted-foreground\)/)
assert.match(css, /width: calc\(var\(--spacing\) \* 4\)/)
assert.match(css, /height: calc\(var\(--spacing\) \* 4\)/)
