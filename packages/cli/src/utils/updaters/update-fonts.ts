import type { z } from 'zod'
import type { registryResolvedItemsTreeSchema } from '@/src/schema'

/**
 * The package a font item ships in. Registry items may pin their own, since
 * not every family is published under the variable scope.
 */
export function getFontDependency(
  font: NonNullable<
    z.infer<typeof registryResolvedItemsTreeSchema>['fonts']
  >[number],
): string {
  if (font.font.dependency) {
    return font.font.dependency
  }

  // `font-inter` and `font-heading-inter` both ship in the same package.
  const name = font.name.replace(/^font-(?:heading-)?/, '')
  return `@fontsource-variable/${name}`
}

/**
 * Folds `registry:font` items into the rest of the tree: a font becomes a
 * package dependency, a CSS `@import` of that package, and the theme variable
 * it defines. Fonts are self-hosted through fontsource, so nothing is fetched
 * from a font CDN at runtime and no font URL is written into the project's CSS.
 *
 * Font items carry no files, so this is the only thing that consumes them.
 */
export function massageTreeForFonts(
  tree: z.infer<typeof registryResolvedItemsTreeSchema>,
) {
  if (!tree.fonts?.length) {
    return tree
  }

  tree.cssVars ??= {}
  tree.cssVars.theme ??= {}
  tree.dependencies ??= []
  tree.css ??= {}

  for (const font of tree.fonts) {
    const dependency = getFontDependency(font)

    if (!tree.dependencies.includes(dependency)) {
      tree.dependencies.push(dependency)
    }

    tree.css[`@import "${dependency}"`] = {}
    tree.cssVars.theme[font.font.variable] = font.font.family
  }

  return tree
}
