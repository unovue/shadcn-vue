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

/** A static attribute's name (`class`), or a bound one's argument (`:class` → `class`). */
function attributeName(attribute: AST.VAttribute | AST.VDirective): string | undefined {
  if (!attribute.directive)
    return attribute.key.name
  if (attribute.key.name.name !== 'bind' || attribute.key.argument?.type !== 'VIdentifier')
    return undefined
  return attribute.key.argument.name
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

      // ——— the template ———
      const icons: string[] = []
      let unresolved = 0
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          if (node.type !== 'VElement' || !PLACEHOLDER_TAGS.has(node.rawName))
            return
          const attributes = node.startTag.attributes
          const own = attributes.find(attribute => !attribute.directive && attribute.key.name === library) as AST.VAttribute | undefined
          const icon = own?.value?.value.trim()
          if (!icon) {
            unresolved++
            return
          }
          if (!icons.includes(icon))
            icons.push(icon)

          // Every library attribute goes; everything else stays as written.
          const kept = attributes.filter(attribute => attribute.directive || !LIBRARY_NAMES.has(attribute.key.name))
          const added = config.props
            .filter(prop => !kept.some(attribute => sameProp(attributeName(attribute) ?? '', prop.name)))
            .map(prop => bound(prop.name, prop.value.replace('ICON', icon)))
          // Structural directives (v-if, v-else-if, v-else, v-for, v-show)
          // stay first, where Vue code puts them; then the library's props;
          // then the placeholder's own attributes, as written.
          const structural = kept.filter(attribute => attribute.directive && STRUCTURAL.has(attribute.key.name.name))
          const rest = kept.filter(attribute => !structural.includes(attribute))
          node.startTag.attributes = [...structural, ...added, ...rest]
          for (const attribute of node.startTag.attributes)
            attribute.parent = node.startTag

          const component = config.component === 'ICON' ? icon : config.component
          node.rawName = component
          node.name = component.toLowerCase()
          transformCount++
        },
      })

      if (unresolved > 0) {
        logger.warn(
          `${filename}: ${unresolved} <IconPlaceholder> name${unresolved === 1 ? 's' : ''} no icon for "${library}" `
          + `(the iconLibrary in components.json), so ${unresolved === 1 ? 'it was' : 'they were'} left as `
          + `${unresolved === 1 ? 'it is' : 'they are'}. Add a ${library}="…" attribute to the placeholder, or replace it by hand.`,
        )
      }
      if (icons.length === 0)
        return transformCount

      // ——— the script ———
      // The imports go in the script that imports IconPlaceholder, else the
      // last script (<script setup> follows a plain <script> by convention).
      const needed = config.imports.map(({ from, names }) => ({
        from,
        names: names.flatMap(name => (name === 'ICON' ? icons : [name])),
      }))
      const holder = scriptASTs.find(ast => ast.body.some(statement =>
        statement.type === 'ImportDeclaration'
        && statement.specifiers?.some(specifier => specifier.local?.name === PLACEHOLDER_NAME))) ?? scriptASTs[scriptASTs.length - 1]
      if (!holder) {
        logger.warn(`${filename}: <IconPlaceholder> was replaced, but the file has no <script> to import the icons into.`)
        return transformCount
      }

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
          // An existing value import from a package we need: add the missing names to it.
          const wanted = needed.find(({ from }) => from === declaration.source.value)
          if (wanted && declaration.importKind !== 'type' && !declaration.specifiers?.some(specifier => specifier.type !== 'ImportSpecifier')) {
            const have = new Set(declaration.specifiers?.map(specifier => specifier.local?.name))
            for (const name of wanted.names) {
              if (!have.has(name))
                declaration.specifiers!.push(builders.importSpecifier(builders.identifier(name)))
            }
            wanted.names = []
            transformCount++
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
      const declarations = needed
        .filter(({ names }) => names.length > 0)
        .map(({ from, names }) => builders.importDeclaration(
          names.map(name => builders.importSpecifier(builders.identifier(name))),
          builders.literal(from),
        ))
      body.splice(lastImport + 1, 0, ...(declarations as never[]))
      return transformCount + declarations.length
    },
  }
}
