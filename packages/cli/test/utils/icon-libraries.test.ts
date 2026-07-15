import { describe, expect, it } from 'vitest'
import {
  getIconImportStatement,
  getIconLibrary,
  getIconLibraryPackages,
  getIconUsageExample,
  ICON_LIBRARIES_ARRAY,
  replaceIconLibraryInDependencies,
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

describe('replaceIconLibraryInDependencies', () => {
  it('swaps @lucide/vue for the chosen library packages', () => {
    expect(
      replaceIconLibraryInDependencies(
        ['class-variance-authority', '@lucide/vue'],
        'phosphor',
      ),
    ).toEqual(['class-variance-authority', '@phosphor-icons/vue'])
  })

  it('swaps the legacy lucide-vue-next package for the chosen library', () => {
    expect(
      replaceIconLibraryInDependencies(
        ['tailwindcss-animate', 'class-variance-authority', 'lucide-vue-next'],
        'phosphor',
      ),
    ).toEqual([
      'tailwindcss-animate',
      'class-variance-authority',
      '@phosphor-icons/vue',
    ])
  })

  it('keeps the lucide package when the user picked lucide', () => {
    expect(
      replaceIconLibraryInDependencies(['@lucide/vue'], 'lucide'),
    ).toEqual(['@lucide/vue'])
  })

  it('rewrites legacy lucide-vue-next to the current @lucide/vue when lucide is picked', () => {
    expect(
      replaceIconLibraryInDependencies(['lucide-vue-next'], 'lucide'),
    ).toEqual(['@lucide/vue'])
  })

  it('adds the chosen library packages even when no icon package is present', () => {
    expect(
      replaceIconLibraryInDependencies(['class-variance-authority'], 'phosphor'),
    ).toEqual(['class-variance-authority', '@phosphor-icons/vue'])
  })

  it('adds all packages for libraries that ship multiple', () => {
    expect(
      replaceIconLibraryInDependencies(['@lucide/vue'], 'hugeicons'),
    ).toEqual(['@hugeicons/vue', '@hugeicons/core-free-icons'])
  })

  it('returns the original deps unchanged when iconLibrary is missing', () => {
    expect(
      replaceIconLibraryInDependencies(['@lucide/vue'], undefined),
    ).toEqual(['@lucide/vue'])
  })

  it('returns the original deps unchanged when iconLibrary is unknown', () => {
    expect(
      replaceIconLibraryInDependencies(['@lucide/vue'], 'mystery'),
    ).toEqual(['@lucide/vue'])
  })

  it('handles empty/undefined dependency lists', () => {
    expect(replaceIconLibraryInDependencies(undefined, 'phosphor')).toEqual([])
    expect(replaceIconLibraryInDependencies([], 'phosphor')).toEqual([])
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
