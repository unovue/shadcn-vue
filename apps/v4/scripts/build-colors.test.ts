import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEMES } from '../registry/themes'

const BASE_COLORS = THEMES.filter(theme =>
  ['neutral', 'stone', 'zinc', 'mauve', 'olive', 'mist', 'taupe'].includes(
    theme.name,
  ),
)

describe('base color registry artifacts', () => {
  it.each(BASE_COLORS)('$name has a generated artifact', async ({ name }) => {
    const artifact = JSON.parse(
      await readFile(
        path.join(process.cwd(), 'public/r/colors', `${name}.json`),
        'utf8',
      ),
    )

    expect(artifact.cssVarsV4?.light?.background).toBeTypeOf('string')
    expect(artifact.cssVarsV4?.dark?.background).toBeTypeOf('string')
  })
})
