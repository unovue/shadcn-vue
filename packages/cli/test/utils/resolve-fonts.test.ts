import type { Config } from '../../src/utils/get-config'
import { describe, expect, it } from 'vitest'

import {
  resolveFontHeadingVar,
  resolveFontImports,
} from '../../src/utils/add-components'

function config(font?: string, fontHeading?: string) {
  return { font, fontHeading } as Config
}

describe('resolveFontImports', () => {
  it('should import the configured font', () => {
    expect(resolveFontImports(config('inter'))).toEqual([
      expect.stringContaining('family=Inter'),
    ])
  })

  it('should import the heading font alongside the body font', () => {
    const imports = resolveFontImports(config('inter', 'playfair-display'))

    expect(imports).toHaveLength(2)
    expect(imports[1]).toContain('family=Playfair+Display')
  })

  it('should import nothing when fonts are disabled', () => {
    expect(resolveFontImports(config('none'))).toEqual([])
    expect(resolveFontImports(config(undefined))).toEqual([])
  })

  it('should import nothing when a heading font outlives a disabled body font', () => {
    expect(resolveFontImports(config('none', 'geist-sans'))).toEqual([])
  })
})

describe('resolveFontHeadingVar', () => {
  it('should alias the body font when no heading font is set', () => {
    expect(resolveFontHeadingVar(config('inter'))).toBe('var(--font-sans)')
    expect(resolveFontHeadingVar(config('inter', 'inherit'))).toBe(
      'var(--font-sans)',
    )
  })

  it('should use the heading font when set', () => {
    expect(resolveFontHeadingVar(config('inter', 'playfair-display'))).toBe(
      '\'Playfair Display Variable\', sans-serif',
    )
  })

  it('should be undefined when fonts are disabled', () => {
    expect(resolveFontHeadingVar(config('none'))).toBeUndefined()
    expect(resolveFontHeadingVar(config(undefined))).toBeUndefined()
    expect(resolveFontHeadingVar(config('none', 'geist-sans'))).toBeUndefined()
    expect(resolveFontHeadingVar(config('inter', 'none'))).toBeUndefined()
  })
})
