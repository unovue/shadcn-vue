import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Regression guard for https://github.com/unovue/shadcn-vue/issues/1902:
// utilities like `shimmer` and `scroll-fade` are documented as "shipping with
// the `shadcn-vue` package" (the CLI imports `shadcn-vue/tailwind.css` into the
// user's global CSS on init). If a utility gets a docs page but is never added
// to the shipped stylesheet, initialized projects silently lack it. This test
// asserts every such documented utility is actually defined in the shipped CSS.

const here = dirname(fileURLToPath(import.meta.url))
const shippedCss = readFileSync(join(here, '../src/tailwind.css'), 'utf8')
const utilitiesDocsDir = join(here, '../../../apps/v4/content/docs/utilities')

const SHIP_CLAIM = 'ships with the `shadcn-vue` package'

const documentedUtilities = readdirSync(utilitiesDocsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => ({ name: file.replace(/\.md$/, ''), body: readFileSync(join(utilitiesDocsDir, file), 'utf8') }))
  .filter(doc => doc.body.includes(SHIP_CLAIM))

describe('shipped tailwind.css (shadcn-vue/tailwind.css)', () => {
  it('finds documented utilities that claim to ship with the package', () => {
    expect(documentedUtilities.length).toBeGreaterThan(0)
  })

  for (const { name } of documentedUtilities) {
    it(`defines the "${name}" utility promised by its docs page`, () => {
      expect(shippedCss).toContain(`@utility ${name}`)
    })
  }
})
