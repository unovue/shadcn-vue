// Re-export array format ICON_LIBRARIES from constants
import { ICON_LIBRARIES as IconLibrariesArray } from '@/src/registry/constants'

// Export as alias for array access
export { ICON_LIBRARIES as ICON_LIBRARIES_ARRAY } from '@/src/registry/constants'

/**
 * Get an icon library by name.
 */
export function getIconLibrary(name: string) {
  return IconLibrariesArray.find(lib => lib.name === name)
}

/**
 * Get packages for an icon library.
 */
export function getIconLibraryPackages(name: string): string[] {
  const lib = getIconLibrary(name)
  return lib?.packages ? [...lib.packages] : []
}

/**
 * Get the import statement for an icon.
 */
export function getIconImportStatement(libraryName: string, iconName: string): string {
  const lib = getIconLibrary(libraryName)
  if (!lib)
    return ''

  const mainPackage = lib.packages[0]
  return `import { ${iconName} } from "${mainPackage}"`
}

/**
 * Get the usage example for an icon.
 */
export function getIconUsageExample(libraryName: string, iconName: string): string {
  const lib = getIconLibrary(libraryName)
  if (!lib)
    return ''

  return `<${iconName} />`
}

// Object format for use in transformers (keyed by icon library name)
export const ICON_LIBRARIES = {
  lucide: {
    name: 'lucide-vue-next',
    package: 'lucide-vue-next',
    import: 'lucide-vue-next',
  },
  radix: {
    name: '@radix-icons/vue',
    package: '@radix-icons/vue',
    import: '@radix-icons/vue',
  },
  tabler: {
    name: '@tabler/icons-vue',
    package: '@tabler/icons-vue',
    import: '@tabler/icons-vue',
  },
  phosphor: {
    name: '@phosphor-icons/vue',
    package: '@phosphor-icons/vue',
    import: '@phosphor-icons/vue',
  },
  hugeicons: {
    name: '@hugeicons/vue',
    package: '@hugeicons/vue',
    import: '@hugeicons/vue',
  },
  remixicon: {
    name: '@remixicon/vue',
    package: '@remixicon/vue',
    import: '@remixicon/vue',
  },
}
