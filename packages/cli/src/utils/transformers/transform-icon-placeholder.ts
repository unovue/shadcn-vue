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

/** An import specifier as the script has it. */
interface ExistingImport {
  source: string
  /** The exported name, or 'default' / '*'. */
  imported: string
  local: string
  /** `import type { … }` or `import { type X }`: no runtime binding. */
  typeOnly: boolean
}

/**
 * Every name the scripts already bind at the top level (imports of any
 * kind, variables, functions, classes, TS types), and every import. Both
 * <script> blocks of an SFC share the template's scope, so all are read.
 */
function scriptBindings(programs: { body: any[] }[]) {
  const occupied = new Set<string>()
  const imports: ExistingImport[] = []
  for (const program of programs) {
    for (const statement of program.body) {
      if (statement.type === 'ImportDeclaration') {
        for (const specifier of statement.specifiers ?? []) {
          const local = specifier.local?.name
          if (!local)
            continue
          occupied.add(local)
          imports.push({
            source: String(statement.source.value),
            imported: specifier.type === 'ImportSpecifier'
              ? (specifier.imported.name ?? specifier.imported.value)
              : specifier.type === 'ImportDefaultSpecifier' ? 'default' : '*',
            local,
            typeOnly: statement.importKind === 'type' || specifier.importKind === 'type',
          })
        }
      }
      const declared = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
      if (declared?.type === 'VariableDeclaration') {
        for (const declarator of declared.declarations ?? []) {
          if (declarator.id?.type === 'Identifier')
            occupied.add(declarator.id.name)
        }
      }
      else if (declared?.id?.type === 'Identifier') {
        // functions, classes, TS type aliases, interfaces and enums
        occupied.add(declared.id.name)
      }
    }
  }
  return { occupied, imports }
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
      // An export already imported as a value is used under its local name
      // (an alias included). Otherwise it is imported under its own name, or,
      // when that name is taken (a type import, an alias of something else,
      // a variable), under the first free `<name>1`, `<name>2`, ….
      const { occupied, imports } = scriptBindings(scriptASTs as never)
      const additions: { from: string, imported: string, local: string }[] = []
      const localFor = new Map<string, string>()
      const resolve = (from: string, imported: string): string => {
        const key = `${from}\u0000${imported}`
        const known = localFor.get(key)
        if (known)
          return known
        const existing = imports.find(entry => !entry.typeOnly && entry.source === from && entry.imported === imported)
        let local = existing?.local
        if (!local) {
          local = imported
          for (let n = 1; occupied.has(local); n++)
            local = `${imported}${n}`
          occupied.add(local)
          additions.push({ from, imported, local })
        }
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
          // A value declaration of named imports from a package we need:
          // the new names join it.
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
