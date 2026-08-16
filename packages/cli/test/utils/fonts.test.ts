import { describe, expect, it } from 'vitest'

import { isFontDisabled, isManagedFontImport } from '../../src/utils/fonts'

describe('isFontDisabled', () => {
  it('should be disabled when unset or none', () => {
    expect(isFontDisabled(undefined)).toBe(true)
    expect(isFontDisabled('')).toBe(true)
    expect(isFontDisabled('none')).toBe(true)
  })

  it('should not be disabled for a font name', () => {
    expect(isFontDisabled('inter')).toBe(false)
    expect(isFontDisabled('geist-sans')).toBe(false)
  })
})

describe('isManagedFontImport', () => {
  it('should match imports for fonts the cli knows', () => {
    expect(
      isManagedFontImport(
        '@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\');',
      ),
    ).toBe(true)
  })

  it('should match regardless of the requested weights', () => {
    expect(
      isManagedFontImport(
        'url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap")',
      ),
    ).toBe(true)
  })

  it('should match multi-word families', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400&display=swap\')',
      ),
    ).toBe(true)
  })

  it('should not match a font outside the cli registry', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap\')',
      ),
    ).toBe(false)
  })

  it('should not match when a single import mixes known and unknown families', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Fira+Code:wght@400&display=swap\')',
      ),
    ).toBe(false)
  })

  it('should not match an import without a family', () => {
    expect(isManagedFontImport('url(\'https://example.com/styles.css\')')).toBe(
      false,
    )
  })
})
