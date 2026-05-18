import { describe, expect, it } from 'vitest'
import {
  getIconImportStatement,
  getIconLibrary,
  getIconLibraryPackages,
  getIconUsageExample,
  ICON_LIBRARIES_ARRAY,
} from '../../src/utils/icon-libraries'

describe('getIconLibrary', () => {
  it('returns lucide library', () => {
    const lib = getIconLibrary('lucide')
    expect(lib).toBeDefined()
    expect(lib?.name).toBe('lucide')
    expect(lib?.label).toBe('Lucide')
  })

  it('returns tabler library', () => {
    const lib = getIconLibrary('tabler')
    expect(lib).toBeDefined()
    expect(lib?.name).toBe('tabler')
    expect(lib?.label).toBe('Tabler Icons')
  })

  it('returns hugeicons library', () => {
    const lib = getIconLibrary('hugeicons')
    expect(lib).toBeDefined()
    expect(lib?.name).toBe('hugeicons')
    expect(lib?.label).toBe('HugeIcons')
  })

  it('returns phosphor library', () => {
    const lib = getIconLibrary('phosphor')
    expect(lib).toBeDefined()
    expect(lib?.name).toBe('phosphor')
    expect(lib?.label).toBe('Phosphor Icons')
  })

  it('returns remixicon library', () => {
    const lib = getIconLibrary('remixicon')
    expect(lib).toBeDefined()
    expect(lib?.name).toBe('remixicon')
    expect(lib?.label).toBe('Remix Icon')
  })

  it('returns undefined for unknown library', () => {
    const lib = getIconLibrary('unknown')
    expect(lib).toBeUndefined()
  })
})

describe('getIconLibraryPackages', () => {
  it('returns packages for lucide', () => {
    const packages = getIconLibraryPackages('lucide')
    expect(packages).toContain('@lucide/vue')
  })

  it('returns packages for tabler', () => {
    const packages = getIconLibraryPackages('tabler')
    expect(packages).toContain('@tabler/icons-vue')
  })

  it('returns packages for hugeicons', () => {
    const packages = getIconLibraryPackages('hugeicons')
    expect(packages.length).toBeGreaterThan(1)
    expect(packages).toContain('@hugeicons/vue')
  })

  it('returns packages for phosphor', () => {
    const packages = getIconLibraryPackages('phosphor')
    expect(packages).toContain('@phosphor-icons/vue')
  })

  it('returns packages for remixicon', () => {
    const packages = getIconLibraryPackages('remixicon')
    expect(packages).toContain('@remixicon/vue')
  })

  it('returns empty array for unknown library', () => {
    const packages = getIconLibraryPackages('unknown')
    expect(packages).toEqual([])
  })
})

describe('getIconImportStatement', () => {
  it('returns import for lucide icons', () => {
    const importStatement = getIconImportStatement('lucide', 'CheckIcon')
    expect(importStatement).toContain('@lucide/vue')
    expect(importStatement).toContain('CheckIcon')
    expect(importStatement).toContain('import')
  })

  it('returns import for tabler icons', () => {
    const importStatement = getIconImportStatement('tabler', 'IconCheck')
    expect(importStatement).toContain('@tabler/icons-vue')
    expect(importStatement).toContain('IconCheck')
  })

  it('returns import for hugeicons', () => {
    const importStatement = getIconImportStatement('hugeicons', 'CheckIcon')
    expect(importStatement).toContain('@hugeicons/vue')
    expect(importStatement).toContain('CheckIcon')
  })

  it('returns import for phosphor', () => {
    const importStatement = getIconImportStatement('phosphor', 'Check')
    expect(importStatement).toContain('@phosphor-icons/vue')
    expect(importStatement).toContain('Check')
  })

  it('returns import for remixicon', () => {
    const importStatement = getIconImportStatement('remixicon', 'CheckIcon')
    expect(importStatement).toContain('@remixicon/vue')
    expect(importStatement).toContain('CheckIcon')
  })

  it('returns empty string for unknown library', () => {
    const importStatement = getIconImportStatement('unknown', 'Icon')
    expect(importStatement).toBe('')
  })
})

describe('getIconUsageExample', () => {
  it('returns usage example for lucide', () => {
    const example = getIconUsageExample('lucide', 'CheckIcon')
    expect(example).toContain('<CheckIcon')
    expect(example).toContain('/>')
  })

  it('returns usage example for tabler', () => {
    const example = getIconUsageExample('tabler', 'IconCheck')
    expect(example).toContain('<IconCheck')
    expect(example).toContain('/>')
  })

  it('returns usage example for hugeicons', () => {
    const example = getIconUsageExample('hugeicons', 'CheckIcon')
    expect(example).toContain('<CheckIcon')
    expect(example).toContain('/>')
  })

  it('returns empty string for unknown library', () => {
    const example = getIconUsageExample('unknown', 'Icon')
    expect(example).toBe('')
  })
})

describe('iCON_LIBRARIES_ARRAY constant', () => {
  it('contains all supported libraries', () => {
    const libraryNames = ICON_LIBRARIES_ARRAY.map(l => l.name)
    expect(libraryNames).toContain('lucide')
    expect(libraryNames).toContain('tabler')
    expect(libraryNames).toContain('hugeicons')
    expect(libraryNames).toContain('phosphor')
    expect(libraryNames).toContain('remixicon')
  })

  it('all libraries have packages defined', () => {
    for (const lib of ICON_LIBRARIES_ARRAY) {
      expect(lib.packages).toBeDefined()
      expect(lib.packages.length).toBeGreaterThan(0)
    }
  })

  it('all libraries have label defined', () => {
    for (const lib of ICON_LIBRARIES_ARRAY) {
      expect(lib.label).toBeDefined()
      expect(lib.label.length).toBeGreaterThan(0)
    }
  })
})
