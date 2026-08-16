import { describe, expect, it } from 'vitest'

import { transformCssVars } from '../../../src/utils/updaters/update-css-vars'

const INTER_IMPORT
  = '@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\');'
const GEIST_IMPORT
  = '@import url(\'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap\');'
// Not part of the CLI font registry i.e. only a user could have written it.
const FIRA_CODE_IMPORT
  = '@import url(\'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap\');'

const CSS_VARS = {
  light: { background: '0 0% 100%' },
  dark: { background: '240 10% 3.9%' },
}

const CONFIG = { tailwind: { cssVariables: true } }

async function transform(
  input: string,
  options: { fontImports?: string[], pruneFontImports?: boolean },
) {
  return transformCssVars(input, CSS_VARS, CONFIG as any, {
    tailwindVersion: 'v4',
    ...options,
  })
}

describe('transformCssVars: font imports', () => {
  it('should add the configured font import', async () => {
    const output = await transform('@import "tailwindcss";\n', {
      fontImports: [INTER_IMPORT],
    })

    expect(output).toContain('family=Inter')
  })

  it('should replace a stale font import when the font changes', async () => {
    const output = await transform(
      `${INTER_IMPORT}\n@import "tailwindcss";\n`,
      { fontImports: [GEIST_IMPORT] },
    )

    expect(output).toContain('family=Geist')
    expect(output).not.toContain('family=Inter')
  })

  it('should keep font imports the cli does not manage', async () => {
    const output = await transform(
      `${FIRA_CODE_IMPORT}\n${INTER_IMPORT}\n@import "tailwindcss";\n`,
      { fontImports: [GEIST_IMPORT] },
    )

    expect(output).toContain('family=Fira+Code')
    expect(output).toContain('family=Geist')
    expect(output).not.toContain('family=Inter')
  })

  it('should remove managed font imports when fonts are disabled', async () => {
    const output = await transform(
      `${INTER_IMPORT}\n@import "tailwindcss";\n`,
      { fontImports: [], pruneFontImports: true },
    )

    expect(output).not.toContain('fonts.googleapis.com')
  })

  it('should not touch user font imports when fonts are disabled', async () => {
    const output = await transform(
      `${FIRA_CODE_IMPORT}\n@import "tailwindcss";\n`,
      { fontImports: [], pruneFontImports: true },
    )

    expect(output).toContain('family=Fira+Code')
  })

  it('should not add or remove font imports when not managing fonts', async () => {
    const output = await transform(
      `${INTER_IMPORT}\n@import "tailwindcss";\n`,
      {},
    )

    expect(output).toContain('family=Inter')
  })
})
