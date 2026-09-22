import { describe, expect, it } from 'vitest'

import { transformCss } from '../../../src/utils/updaters/update-css'
import {
  getFontDependency,
  massageTreeForFonts,
} from '../../../src/utils/updaters/update-fonts'

const INTER = {
  name: 'font-inter',
  type: 'registry:font' as const,
  font: {
    family: '\'Inter Variable\', sans-serif',
    provider: 'google' as const,
    variable: '--font-sans',
    import: 'Inter',
    dependency: '@fontsource-variable/inter',
    subsets: ['latin'],
  },
}

const HEADING_LORA = {
  name: 'font-heading-lora',
  type: 'registry:font' as const,
  font: {
    family: '\'Lora Variable\', serif',
    provider: 'google' as const,
    variable: '--font-heading',
    import: 'Lora',
    dependency: '@fontsource-variable/lora',
    subsets: ['latin'],
  },
}

describe('getFontDependency', () => {
  it('should use the package the item pins', () => {
    expect(getFontDependency(INTER)).toBe('@fontsource-variable/inter')
  })

  it('should derive the package from the item name', () => {
    expect(
      getFontDependency({
        ...INTER,
        font: { ...INTER.font, dependency: undefined },
      }),
    ).toBe('@fontsource-variable/inter')
  })

  it('should derive the same package for a heading item', () => {
    expect(
      getFontDependency({
        ...HEADING_LORA,
        font: { ...HEADING_LORA.font, dependency: undefined },
      }),
    ).toBe('@fontsource-variable/lora')
  })
})

describe('massageTreeForFonts', () => {
  it('should turn a font into a dependency, an import and a theme var', () => {
    const tree = massageTreeForFonts({ fonts: [INTER] })

    expect(tree.dependencies).toEqual(['@fontsource-variable/inter'])
    expect(tree.css).toEqual({ '@import "@fontsource-variable/inter"': {} })
    expect(tree.cssVars?.theme).toEqual({
      '--font-sans': '\'Inter Variable\', sans-serif',
    })
  })

  it('should never write a font url into the css', () => {
    const tree = massageTreeForFonts({ fonts: [INTER, HEADING_LORA] })

    expect(JSON.stringify(tree)).not.toContain('fonts.googleapis.com')
  })

  it('should add the heading font alongside the body font', () => {
    const tree = massageTreeForFonts({ fonts: [INTER, HEADING_LORA] })

    expect(tree.dependencies).toEqual([
      '@fontsource-variable/inter',
      '@fontsource-variable/lora',
    ])
    expect(tree.cssVars?.theme).toEqual({
      '--font-sans': '\'Inter Variable\', sans-serif',
      '--font-heading': '\'Lora Variable\', serif',
    })
  })

  it('should not duplicate a dependency shared by two items', () => {
    const headingInter = {
      ...INTER,
      name: 'font-heading-inter',
      font: { ...INTER.font, variable: '--font-heading' },
    }
    const tree = massageTreeForFonts({ fonts: [INTER, headingInter] })

    expect(tree.dependencies).toEqual(['@fontsource-variable/inter'])
  })

  it('should preserve what the rest of the tree already carries', () => {
    const tree = massageTreeForFonts({
      fonts: [INTER],
      dependencies: ['reka-ui'],
      css: { '@import "tw-animate-css"': {} },
      cssVars: { theme: { '--radius': '0.625rem' } },
    })

    expect(tree.dependencies).toEqual(['reka-ui', '@fontsource-variable/inter'])
    expect(tree.css).toEqual({
      '@import "tw-animate-css"': {},
      '@import "@fontsource-variable/inter"': {},
    })
    expect(tree.cssVars?.theme).toEqual({
      '--radius': '0.625rem',
      '--font-sans': '\'Inter Variable\', sans-serif',
    })
  })

  it('should leave a tree without fonts alone', () => {
    const tree = massageTreeForFonts({ dependencies: ['reka-ui'] })

    expect(tree).toEqual({ dependencies: ['reka-ui'] })
  })

  it('should write the font import into the css file', async () => {
    const tree = massageTreeForFonts({
      fonts: [INTER],
      css: { '@import "tw-animate-css"': {} },
    })

    const output = await transformCss(
      `@import "tailwindcss";\n`,
      tree.css as any,
    )

    expect(output).toContain('@import "@fontsource-variable/inter";')
    expect(output).toContain('@import "tailwindcss";')
  })
})
