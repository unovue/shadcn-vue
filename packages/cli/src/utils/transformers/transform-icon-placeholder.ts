import type { AST, CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import { builders } from 'vue-metamorph'
import { ICON_PLACEHOLDER_LIBRARIES } from '@/src/utils/icon-libraries'
import { logger } from '@/src/utils/logger'

/**
 * `<IconPlaceholder>`: a registry file names its icon once per icon library,
 *
 *   <IconPlaceholder lucide="CheckIcon" hugeicons="Tick02Icon" tabler="IconCheck" class="size-4" />
 *
 * and the CLI writes the app's library's own icon (`iconLibrary` in
 * components.json) into the copied file:
 *
 *   <CheckIcon class="size-4" />                        (lucide)
 *   <HugeiconsIcon :icon="Tick02Icon" :stroke-width="2" class="size-4" />  (hugeicons)
 *
 * with the right imports, and the placeholder import removed. A Vue port of
 * shadcn's React transform (packages/registry/src/transformers/
 * transform-icons.ts). It works for files from any registry, since every
 * icon is named on the placeholder itself; the map-based transformIcons,
 * which only knows the icons in shadcn-vue's own map, is unchanged.
 *
 * When a placeholder names no icon for the app's library, it is left as it
 * is, the placeholder import is kept, and the CLI warns with the file and
 * the library. That differs from React, which leaves the element but removes
 * its import, so the file no longer compiles.
 */

const PLACEHOLDER_TAGS = new Set(['IconPlaceholder', 'icon-placeholder'])
const PLACEHOLDER_NAME = 'IconPlaceholder'
const LIBRARY_NAMES = new Set(Object.keys(ICON_PLACEHOLDER_LIBRARIES))
const STRUCTURAL = new Set(['if', 'else-if', 'else', 'for', 'show'])

/**
 * The name an attribute is written with: `class` for `class`, `strokeWidth`
 * for `:strokeWidth`. Read from rawName: the parser lowercases `name`
 * (`:strokeWidth` → `strokewidth`).
 */
function attributeName(attribute: AST.VAttribute | AST.VDirective): string | undefined {
  if (!attribute.directive)
    return attribute.key.rawName
  if (attribute.key.name.name !== 'bind' || attribute.key.argument?.type !== 'VIdentifier')
    return undefined
  return attribute.key.argument.rawName
}

/** `stroke-width` and `strokeWidth` are the same prop to Vue. */
function sameProp(a: string, b: string) {
  const camel = (name: string) => name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
  return camel(a) === camel(b)
}

/** `:name="expression"`. */
function bound(name: string, expression: string): AST.VDirective {
  const value = /^\d+(?:\.\d+)?$/.test(expression)
    ? builders.literal(Number(expression))
    : builders.identifier(expression)
  return builders.vDirective(
    builders.vDirectiveKey(builders.vIdentifier('bind', ':'), builders.vIdentifier(name)),
    builders.vExpressionContainer(value as never),
  )
}

/**
 * A name for `imported` that appears NOWHERE in the file: `<imported>_`,
 * else `<imported>_2`, `<imported>_3`, …. `taken` is checked as whole
 * words in the file's text, plus the names already handed out.
 *
 * Why always a fresh name, never the bare one and never an existing
 * import (review): a name the file already has can be captured by
 * something in scope at the placeholder: a type-only import, an alias of
 * another icon, a destructured variable, a binding in the other <script>,
 * a v-for or slot variable. Tracking every scope is fragile; a name the
 * file never mentions cannot be captured by any of them.
 *
 * The underscore goes at the END: a template tag must start with a
 * letter (`<__X>` is not read as an element).
 */
function freshName(imported: string, taken: (name: string) => boolean): string {
  let name = `${imported}_`
  for (let n = 2; taken(name); n++)
    name = `${imported}_${n}`
  return name
}

export function transformIconPlaceholder(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'replace IconPlaceholder with the configured icon library',

    transform({ scriptASTs, sfcAST, filename, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const library = opts.config.iconLibrary
      if (!sfcAST || !library || !(library in ICON_PLACEHOLDER_LIBRARIES))
        return transformCount
      const config = ICON_PLACEHOLDER_LIBRARIES[library]!

      // ——— find the placeholders (nothing changes yet) ———
      const found: { node: AST.VElement, icon: string }[] = []
      let unresolved = 0
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          if (node.type !== 'VElement' || !PLACEHOLDER_TAGS.has(node.rawName))
            return
          const own = node.startTag.attributes.find(attribute => !attribute.directive && attribute.key.name === library) as AST.VAttribute | undefined
          const icon = own?.value?.value.trim()
          if (icon)
            found.push({ node, icon })
          else
            unresolved++
        },
      })

      if (unresolved > 0) {
        logger.warn(
          `${filename}: ${unresolved} <IconPlaceholder> name${unresolved === 1 ? 's' : ''} no icon for "${library}" `
          + `(the iconLibrary in components.json), so ${unresolved === 1 ? 'it was' : 'they were'} left as `
          + `${unresolved === 1 ? 'it is' : 'they are'}. Add a ${library}="…" attribute to the placeholder, or replace it by hand.`,
        )
      }
      if (found.length === 0)
        return transformCount

      // The imports go in the script that imports IconPlaceholder, else the
      // last script (<script setup> follows a plain <script> by convention).
      const holder = scriptASTs.find(ast => ast.body.some(statement =>
        statement.type === 'ImportDeclaration'
        && statement.specifiers?.some(specifier => specifier.local?.name === PLACEHOLDER_NAME))) ?? scriptASTs[scriptASTs.length - 1]
      if (!holder) {
        logger.warn(`${filename}: <IconPlaceholder> left as it is: the file has no <script> to import the icons into.`)
        return transformCount
      }

      // ——— the local name of every export the icons need ———
      // Always a fresh name (see freshName), one per export per file.
      const text = opts.raw
      const handedOut = new Set<string>()
      const taken = (name: string) => handedOut.has(name) || new RegExp(`(?<![\\w$])${name.replace(/\$/g, '\\$')}(?![\\w$])`).test(text)
      const additions: { from: string, imported: string, local: string }[] = []
      const localFor = new Map<string, string>()
      const resolve = (from: string, imported: string): string => {
        const key = `${from}\u0000${imported}`
        const known = localFor.get(key)
        if (known)
          return known
        const local = freshName(imported, taken)
        handedOut.add(local)
        additions.push({ from, imported, local })
        localFor.set(key, local)
        return local
      }

      // ——— the template ———
      for (const { node, icon } of found) {
        const names = new Map<string, string>()
        for (const { from, names: imported } of config.imports) {
          for (const name of imported) {
            const real = name === 'ICON' ? icon : name
            names.set(name, resolve(from, real))
          }
        }
        // Every library attribute goes; everything else stays as written.
        const kept = node.startTag.attributes.filter(attribute => attribute.directive || !LIBRARY_NAMES.has(attribute.key.name))
        const added = config.props
          .filter(prop => !kept.some(attribute => sameProp(attributeName(attribute) ?? '', prop.name)))
          .map(prop => bound(prop.name, prop.value === 'ICON' ? names.get('ICON')! : prop.value))
        // Structural directives (v-if, v-else-if, v-else, v-for, v-show)
        // stay first, where Vue code puts them; then the library's props;
        // then the placeholder's own attributes, as written.
        const structural = kept.filter(attribute => attribute.directive && STRUCTURAL.has(attribute.key.name.name))
        const rest = kept.filter(attribute => !structural.includes(attribute))
        node.startTag.attributes = [...structural, ...added, ...rest]
        for (const attribute of node.startTag.attributes)
          attribute.parent = node.startTag

        const component = names.get(config.component)!
        node.rawName = component
        node.name = component.toLowerCase()
        transformCount++
      }

      // ——— the script ———
      traverseScriptAST(holder, {
        visitImportDeclaration(path) {
          const declaration = path.node
          // The placeholder's import: only when every placeholder was replaced.
          if (unresolved === 0) {
            const before = declaration.specifiers?.length ?? 0
            declaration.specifiers = declaration.specifiers?.filter(specifier => specifier.local?.name !== PLACEHOLDER_NAME)
            if (before > 0 && declaration.specifiers?.length === 0) {
              path.prune()
              transformCount++
              return false
            }
          }
          // Cosmetic only: the new (aliased) names join an existing value
          // declaration of named imports from the same package.
          const source = String(declaration.source.value)
          if (declaration.importKind !== 'type' && declaration.specifiers?.every(specifier => specifier.type === 'ImportSpecifier')) {
            for (const addition of additions.filter(entry => entry.from === source)) {
              declaration.specifiers!.push(addition.local === addition.imported
                ? builders.importSpecifier(builders.identifier(addition.imported))
                : builders.importSpecifier(builders.identifier(addition.imported), builders.identifier(addition.local)))
              additions.splice(additions.indexOf(addition), 1)
              transformCount++
            }
          }
          return false
        },
      })

      const body = holder.body
      let lastImport = -1
      body.forEach((statement: { type: string }, index: number) => {
        if (statement.type === 'ImportDeclaration')
          lastImport = index
      })
      const sources = additions.map(entry => entry.from).filter((from, index, all) => all.indexOf(from) === index)
      const declarations = sources.map(from => builders.importDeclaration(
        additions.filter(entry => entry.from === from).map(entry => entry.local === entry.imported
          ? builders.importSpecifier(builders.identifier(entry.imported))
          : builders.importSpecifier(builders.identifier(entry.imported), builders.identifier(entry.local))),
        builders.literal(from),
      ))
      body.splice(lastImport + 1, 0, ...(declarations as never[]))
      return transformCount + declarations.length
    },
  }
}
