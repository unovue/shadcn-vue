import { describe, expect, it } from 'vitest'

import { FONTS } from '../../src/registry/constants'
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
  it('should match the imports the cli writes', () => {
    for (const font of FONTS) {
      expect(isManagedFontImport(font.import)).toBe(true)
    }
  })

  it('should match a bare url', () => {
    expect(
      isManagedFontImport(
        'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap")',
      ),
    ).toBe(true)
  })

  it('should not match a user import of the same family', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap\')',
      ),
    ).toBe(false)
  })

  it('should not match a font outside the cli registry', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap\')',
      ),
    ).toBe(false)
  })

  it('should not match an import for several families', () => {
    expect(
      isManagedFontImport(
        'url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400&display=swap\')',
      ),
    ).toBe(false)
  })

  it('should not match a stylesheet from elsewhere', () => {
    expect(isManagedFontImport('url(\'https://example.com/styles.css\')')).toBe(
      false,
    )
  })
})
