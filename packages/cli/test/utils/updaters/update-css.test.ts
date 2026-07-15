import { describe, expect, it } from 'vitest'
import { transformCss } from '../../../src/utils/updaters/update-css'

describe('transformCss @import dedup', () => {
  it('does not duplicate an import that already exists with matching quotes', async () => {
    const input = `@import "tw-animate-css";
@import "shadcn-vue/tailwind.css";

@custom-variant dark (&:is(.dark *));
`
    const css = {
      '@import "tw-animate-css"': {},
      '@import "shadcn-vue/tailwind.css"': {},
    }

    const result = await transformCss(input, css)

    expect((result.match(/@import ["']tw-animate-css["']/g) ?? []).length).toBe(1)
    expect(
      (result.match(/@import ["']shadcn-vue\/tailwind\.css["']/g) ?? []).length,
    ).toBe(1)
  })

  it('does not duplicate an import when the existing file uses single quotes', async () => {
    // Mirrors the original report: an `apply` run was duplicating
    // `tw-animate-css` / `shadcn-vue/tailwind.css` when the project's
    // `index.css` had been re-formatted with single quotes (e.g. by
    // Prettier) while the registry emits the same imports with double
    // quotes.
    const input = `@import 'tw-animate-css';
@import 'shadcn-vue/tailwind.css';
`
    const css = {
      '@import "tw-animate-css"': {},
      '@import "shadcn-vue/tailwind.css"': {},
    }

    const result = await transformCss(input, css)

    expect((result.match(/@import ["']tw-animate-css["']/g) ?? []).length).toBe(1)
    expect(
      (result.match(/@import ["']shadcn-vue\/tailwind\.css["']/g) ?? []).length,
    ).toBe(1)
  })

  it('adds a new import when not already present', async () => {
    const input = `@import "shadcn-vue/tailwind.css";
`
    const css = {
      '@import "tw-animate-css"': {},
    }

    const result = await transformCss(input, css)

    expect((result.match(/@import ["']tw-animate-css["']/g) ?? []).length).toBe(1)
    expect(
      (result.match(/@import ["']shadcn-vue\/tailwind\.css["']/g) ?? []).length,
    ).toBe(1)
  })
})
