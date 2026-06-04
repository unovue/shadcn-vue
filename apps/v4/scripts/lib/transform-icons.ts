import type { CodemodPlugin } from 'vue-metamorph'

/**
 * Transforms `IconPlaceholder` components into concrete `@lucide/vue`
 * icon components. Mirrors shadcn-ui's `applyIconTransform` step in
 * `build-registry.mts` — the codegen output should ship real icons rather
 * than the runtime-switchable `IconPlaceholder` wrapper used in the showcase.
 *
 * Transform shape:
 *
 *   <IconPlaceholder
 *     lucide="ChevronLeftIcon"
 *     tabler="IconChevronLeft"
 *     hugeicons="ArrowLeft01Icon"
 *     phosphor="CaretLeftIcon"
 *     remixicon="RiArrowLeftSLine"
 *     class="cn-rtl-flip size-4"
 *   />
 *
 * becomes:
 *
 *   <ChevronLeftIcon class="cn-rtl-flip size-4" />
 *
 * plus the matching `import { ChevronLeftIcon } from "@lucide/vue"` added
 * to the <script> block, and the `import IconPlaceholder from ...` line
 * removed. The shadcn-ui pipeline hardcodes `iconLibrary: "lucide"` for
 * generated output — per-style icon preference is handled at runtime in the
 * installed CLI flow, not in the static codegen.
 */

const ICON_LIB_ATTRS = new Set([
  'lucide',
  'tabler',
  'hugeicons',
  'phosphor',
  'remixicon',
])

// Match any import whose source path references the icon-placeholder module
// (we accept both the barrel index and the direct .vue path since both exist
// in the source tree).
const ICON_PLACEHOLDER_SOURCE_RE = /icon-placeholder/i

interface VAttributeLike {
  type: 'VAttribute'
  directive: boolean
  key?: { name?: { name?: string } | string, rawName?: string }
  value?: { type: 'VLiteral', value: string } | null
}

function getAttributeKeyName(attr: VAttributeLike): string | undefined {
  const key = attr.key as any
  if (!key)
    return undefined
  // For static attributes (directive: false), key is a VIdentifier { name: string }
  if (typeof key.name === 'string')
    return key.name
  // Defensive fallback — shouldn't happen for static attrs
  if (key.name && typeof key.name.name === 'string')
    return key.name.name
  return undefined
}

function findStaticAttribute(
  element: any,
  name: string,
): VAttributeLike | undefined {
  const attrs = element?.startTag?.attributes ?? []
  return attrs.find(
    (attr: VAttributeLike) =>
      attr.type === 'VAttribute'
      && attr.directive === false
      && getAttributeKeyName(attr) === name,
  )
}

export function makeTransformIconsPlugin(): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'transform-icon-placeholder',
    transform({ scriptASTs, sfcAST, utils: { astHelpers, traverseScriptAST, traverseTemplateAST } }) {
      let count = 0
      const iconsToImport = new Set<string>()

      // Step 1: walk template, rewrite IconPlaceholder elements in place
      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node: any) {
            if (node.type !== 'VElement')
              return
            if (node.rawName !== 'IconPlaceholder')
              return

            const lucideAttr = findStaticAttribute(node, 'lucide')
            if (!lucideAttr || lucideAttr.value?.type !== 'VLiteral') {
              return
            }
            const iconName = lucideAttr.value.value
            if (!iconName)
              return

            // Rename the element
            node.name = iconName
            node.rawName = iconName
            if (node.endTag) {
              // End tag carries no name of its own in vue-eslint-parser's AST
              // — the printer uses the parent VElement's rawName. Nothing to
              // update here, but we keep the branch in case a future parser
              // version changes this.
            }

            // Filter out the 5 icon-library attributes, keep everything else
            // (class, :class, data-*, event handlers, etc.)
            const attrs = node.startTag?.attributes ?? []
            node.startTag.attributes = attrs.filter((attr: VAttributeLike) => {
              if (attr.type !== 'VAttribute')
                return true
              if (attr.directive)
                return true
              const keyName = getAttributeKeyName(attr)
              return keyName === undefined || !ICON_LIB_ATTRS.has(keyName)
            })

            iconsToImport.add(iconName)
            count++
          },
          leaveNode() {},
        })
      }

      // Step 2: walk script blocks, remove the IconPlaceholder import, then
      // add each collected icon as a named import from @lucide/vue
      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitImportDeclaration(path: any) {
            const source = path.node?.source?.value
            if (typeof source === 'string' && ICON_PLACEHOLDER_SOURCE_RE.test(source)) {
              path.prune()
              return false
            }
            this.traverse(path)
            return undefined
          },
        })

        for (const iconName of iconsToImport) {
          astHelpers.createNamedImport(scriptAST, '@lucide/vue', iconName)
        }
      }

      return count
    },
  }
}
