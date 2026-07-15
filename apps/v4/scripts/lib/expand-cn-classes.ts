import type { CodemodPlugin } from 'vue-metamorph'
import type { StyleMap } from './create-style-map'
import { twMerge } from 'tailwind-merge'

/**
 * Classes that should never be expanded or removed during transformation.
 * These are typically used as CSS selectors at runtime (e.g. for menu/translucent
 * variants) and need the original class name to remain in the source.
 *
 * Mirrors shadcn-ui's `ALLOWLIST` in transform-style-map.ts.
 */
const ALLOWLIST = new Set([
  'cn-menu-target',
  'cn-menu-translucent',
  'cn-logical-sides',
  'cn-rtl-flip',
  'cn-font-heading',
])

const CN_TOKEN_RE = /\bcn-[\w-]+\b/g

/**
 * Given a string literal value (e.g. the contents of `cva('...')` or
 * `cn('...')`), expand any `cn-*` placeholder tokens against the styleMap and
 * return the new string. Allowlisted tokens are preserved in place.
 *
 * Logic mirrors shadcn-ui's `applyStyleToCvaString` / `applyClassesToElement`:
 *   - Extract all cn-* tokens
 *   - Look up their expansions in the styleMap
 *   - Remove the non-allowlisted cn-* tokens from the original string
 *   - twMerge(<expansions>, <cleaned original>)
 *
 * Returns the original string unchanged if no cn-* tokens were found.
 */
export function expandCnInString(value: string, styleMap: StyleMap): string {
  const tokens = value.match(CN_TOKEN_RE)
  if (!tokens || tokens.length === 0)
    return value

  const expansions: string[] = []
  for (const token of tokens) {
    if (ALLOWLIST.has(token))
      continue
    const expansion = styleMap[token]
    if (expansion)
      expansions.push(expansion)
  }

  // Strip non-allowlisted cn-* tokens from the original value, collapse whitespace.
  const cleaned = value
    .replace(CN_TOKEN_RE, m => (ALLOWLIST.has(m) ? m : ''))
    .replace(/\s+/g, ' ')
    .trim()

  if (expansions.length === 0)
    return cleaned

  return twMerge([...expansions, cleaned].join(' '))
}

/**
 * Build a vue-metamorph CodemodPlugin that walks all string literals in
 * <script> blocks and <template> blocks and expands cn-* tokens against the
 * given styleMap. The plugin is closure-bound to the styleMap so we create one
 * per style.
 */
export function makeExpandCnPlugin(styleMap: StyleMap): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'expand-cn-classes',
    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let count = 0

      const visit = (raw: string): string => {
        const expanded = expandCnInString(raw, styleMap)
        if (expanded !== raw)
          count++
        return expanded
      }

      // Script blocks (.ts, .vue <script>): visit StringLiteral and TemplateLiteral nodes.
      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            if (typeof path.node.value === 'string') {
              path.node.value = visit(path.node.value)
            }
            return this.traverse(path)
          },
          visitTemplateLiteral(path) {
            for (const quasi of path.node.quasis) {
              if (quasi.value && typeof quasi.value.raw === 'string') {
                const next = visit(quasi.value.raw)
                if (next !== quasi.value.raw) {
                  quasi.value.raw = next
                  quasi.value.cooked = next
                }
              }
            }
            return this.traverse(path)
          },
        })
      }

      // Template block (Vue SFC):
      //  - `Literal` nodes appear inside :class="cn('...')" JS expressions
      //  - `VLiteral` nodes are the quoted value of static class="..." attributes
      // We only touch VLiterals attached to `class` attributes to avoid mutating
      // unrelated attribute values that happen to contain `cn-` substrings.
      if (sfcAST) {
        traverseTemplateAST(sfcAST, {
          enterNode(node) {
            if (node.type === 'Literal' && typeof node.value === 'string') {
              node.value = visit(node.value)
              return
            }
            if (
              node.type === 'VAttribute'
              && (node as any).directive === false
              && (node as any).key?.name === 'class'
              && (node as any).value?.type === 'VLiteral'
              && typeof (node as any).value.value === 'string'
            ) {
              const vLiteral = (node as any).value
              vLiteral.value = visit(vLiteral.value)
            }
          },
          leaveNode() {},
        })
      }

      return count
    },
  }
}
