// Re-export array format ICON_LIBRARIES from constants
import { ICON_LIBRARIES as IconLibrariesArray } from '@/src/registry/constants'

// Export as alias for array access
export { ICON_LIBRARIES as ICON_LIBRARIES_ARRAY } from '@/src/registry/constants'

// Package names previously shipped by icon libraries that have since been
// renamed. Listed here so we can scrub them out of registry-supplied
// dependency lists alongside their current package counterparts.
const LEGACY_ICON_LIBRARY_PACKAGES = ['lucide-vue-next']

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
 * Set of every package name owned by any supported icon library (including
 * legacy/renamed ones). Used to scrub icon-library deps from registry-supplied
 * dependency lists so we can replace them with the user's chosen library.
 */
function getAllIconLibraryPackages(): Set<string> {
  const all = new Set<string>(LEGACY_ICON_LIBRARY_PACKAGES)
  for (const lib of IconLibrariesArray) {
    for (const pkg of lib.packages) {
      all.add(pkg)
    }
  }
  return all
}

/**
 * Registry style items (e.g. `styles/<style>/index.json`) hardcode `@lucide/vue`
 * in their `dependencies` array regardless of which icon library the user
 * picked. This swaps any known icon-library package in `dependencies` for the
 * packages of `iconLibrary`, so a user who picked Phosphor doesn't end up with
 * Lucide installed.
 *
 * Returns a new array; the input is not mutated. Falls back to the input
 * unchanged when `iconLibrary` is unknown so we never silently strip deps.
 */
export function replaceIconLibraryInDependencies(
  dependencies: string[] | undefined,
  iconLibrary: string | undefined,
): string[] {
  if (!dependencies?.length) {
    return dependencies ? [...dependencies] : []
  }

  if (!iconLibrary) {
    return [...dependencies]
  }

  const chosenPackages = getIconLibraryPackages(iconLibrary)
  if (chosenPackages.length === 0) {
    return [...dependencies]
  }

  const knownIconPackages = getAllIconLibraryPackages()
  const filtered = dependencies.filter(dep => !knownIconPackages.has(dep))

  for (const pkg of chosenPackages) {
    if (!filtered.includes(pkg)) {
      filtered.push(pkg)
    }
  }

  return filtered
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
    name: '@lucide/vue',
    package: '@lucide/vue',
    import: '@lucide/vue',
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
