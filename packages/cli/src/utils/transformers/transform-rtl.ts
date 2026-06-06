import type { CodemodPlugin } from 'vue-metamorph'
import type { TransformOpts } from '.'
import { splitClassName } from './transform-css-vars'

// Physical → logical Tailwind class mappings (direct replacement).
// Order matters to avoid partial matches:
// - Negative prefixes before positive (e.g., -ml- before ml-).
// - Specific corners before general ones e.g. rounded-tl- before rounded-l-.
// - With-value variants before without-value (e.g., border-l- before border-l).
const RTL_MAPPINGS: [string, string][] = [
  ['-ml-', '-ms-'],
  ['-mr-', '-me-'],
  ['ml-', 'ms-'],
  ['mr-', 'me-'],
  ['pl-', 'ps-'],
  ['pr-', 'pe-'],
  ['-left-', '-start-'],
  ['-right-', '-end-'],
  ['left-', 'start-'],
  ['right-', 'end-'],
  ['inset-l-', 'inset-inline-start-'],
  ['inset-r-', 'inset-inline-end-'],
  ['rounded-tl-', 'rounded-ss-'],
  ['rounded-tr-', 'rounded-se-'],
  ['rounded-bl-', 'rounded-es-'],
  ['rounded-br-', 'rounded-ee-'],
  ['rounded-l-', 'rounded-s-'],
  ['rounded-r-', 'rounded-e-'],
  ['border-l-', 'border-s-'],
  ['border-r-', 'border-e-'],
  ['border-l', 'border-s'],
  ['border-r', 'border-e'],
  ['text-left', 'text-start'],
  ['text-right', 'text-end'],
  ['scroll-ml-', 'scroll-ms-'],
  ['scroll-mr-', 'scroll-me-'],
  ['scroll-pl-', 'scroll-ps-'],
  ['scroll-pr-', 'scroll-pe-'],
  ['float-left', 'float-start'],
  ['float-right', 'float-end'],
  ['clear-left', 'clear-start'],
  ['clear-right', 'clear-end'],
  ['origin-top-left', 'origin-top-start'],
  ['origin-top-right', 'origin-top-end'],
  ['origin-bottom-left', 'origin-bottom-start'],
  ['origin-bottom-right', 'origin-bottom-end'],
  ['origin-left', 'origin-start'],
  ['origin-right', 'origin-end'],
]

// Translate-x: adds rtl: variant (negative ↔ positive).
const RTL_TRANSLATE_X_MAPPINGS: [string, string][] = [
  ['-translate-x-', 'translate-x-'],
  ['translate-x-', '-translate-x-'],
]

// Classes that need rtl:*-reverse (no logical equivalents).
const RTL_REVERSE_MAPPINGS: [string, string][] = [
  ['space-x-', 'space-x-reverse'],
  ['divide-x-', 'divide-x-reverse'],
]

// Classes that need rtl: variant with swapped value.
const RTL_SWAP_MAPPINGS: [string, string][] = [
  ['cursor-w-resize', 'cursor-e-resize'],
  ['cursor-e-resize', 'cursor-w-resize'],
]

// Slide animations inside logical side variants: [variant, physical, logical].
const RTL_LOGICAL_SIDE_SLIDE_MAPPINGS: [string, string, string][] = [
  ['data-[side=inline-start]', 'slide-in-from-right', 'slide-in-from-end'],
  ['data-[side=inline-start]', 'slide-out-to-right', 'slide-out-to-end'],
  ['data-[side=inline-end]', 'slide-in-from-left', 'slide-in-from-start'],
  ['data-[side=inline-end]', 'slide-out-to-left', 'slide-out-to-start'],
]

// Marker class for icons that should get rtl:rotate-180.
const RTL_FLIP_MARKER = 'cn-rtl-flip'

// Positioning prefixes to skip for physical side variants.
const POSITIONING_PREFIXES = ['-left-', '-right-', 'left-', 'right-']

export function applyRtlMapping(input: string) {
  return input
    .split(' ')
    .flatMap((className) => {
      // Skip classes that already have rtl: or ltr: prefix.
      if (className.startsWith('rtl:') || className.startsWith('ltr:')) {
        return [className]
      }

      // Replace the cn-rtl-flip marker with rtl:rotate-180.
      if (className === RTL_FLIP_MARKER) {
        return ['rtl:rotate-180']
      }
      const [variant, value, modifier] = splitClassName(className)

      if (!value) {
        return [className]
      }

      // Check for translate-x patterns first (add rtl: variant, don't replace).
      for (const [physical, rtlPhysical] of RTL_TRANSLATE_X_MAPPINGS) {
        if (value.startsWith(physical)) {
          const rtlValue = value.replace(physical, rtlPhysical)
          const rtlClass = variant
            ? `rtl:${variant}:${rtlValue}${modifier ? `/${modifier}` : ''}`
            : `rtl:${rtlValue}${modifier ? `/${modifier}` : ''}`
          return [className, rtlClass]
        }
      }

      // Check for space-x/divide-x patterns (add rtl:*-reverse variant).
      for (const [prefix, reverseClass] of RTL_REVERSE_MAPPINGS) {
        if (value.startsWith(prefix)) {
          const rtlClass = variant
            ? `rtl:${variant}:${reverseClass}`
            : `rtl:${reverseClass}`
          return [className, rtlClass]
        }
      }

      // Check for cursor and other swap patterns.
      for (const [physical, swapped] of RTL_SWAP_MAPPINGS) {
        if (value === physical) {
          const rtlClass = variant
            ? `rtl:${variant}:${swapped}`
            : `rtl:${swapped}`
          return [className, rtlClass]
        }
      }

      // Check for slide animations inside logical side variants.
      for (const [
        variantPattern,
        physical,
        logical,
      ] of RTL_LOGICAL_SIDE_SLIDE_MAPPINGS) {
        if (variant?.includes(variantPattern) && value.startsWith(physical)) {
          const mappedValue = value.replace(physical, logical)
          const result = modifier
            ? `${variant}:${mappedValue}/${modifier}`
            : `${variant}:${mappedValue}`
          return [result]
        }
      }

      // Skip positioning transformations for physical side variants.
      const isPhysicalSideVariant
        = variant?.includes('data-[side=left]')
          || variant?.includes('data-[side=right]')

      // Find matching RTL mapping for direct replacement.
      let mappedValue = value
      for (const [physical, logical] of RTL_MAPPINGS) {
        if (
          isPhysicalSideVariant
          && POSITIONING_PREFIXES.some(p => physical.startsWith(p))
        ) {
          continue
        }

        if (value.startsWith(physical)) {
          // For patterns without trailing '-', require exact match to avoid
          // partial matches like border-ring matching border-r.
          if (!physical.endsWith('-') && value !== physical) {
            continue
          }
          mappedValue = value.replace(physical, logical)
          break
        }
      }

      // Reassemble with variant and modifier.
      let result: string
      if (variant) {
        result = modifier
          ? `${variant}:${mappedValue}/${modifier}`
          : `${variant}:${mappedValue}`
      }
      else {
        result = modifier ? `${mappedValue}/${modifier}` : mappedValue
      }

      return [result]
    })
    .join(' ')
}

// Class-binding attribute names that should be treated as class strings in
// the <template>. Matches both static `class="..."` and dynamic
// `:class="..."` / `v-bind:class="..."` forms.
const CLASS_ATTR_NAMES = new Set(['class', 'className'])

export function transformRtl(opts: TransformOpts): CodemodPlugin {
  return {
    type: 'codemod',
    name: 'transform physical tailwind classes to logical rtl classes',

    transform({ scriptASTs, sfcAST, utils: { traverseScriptAST, traverseTemplateAST } }) {
      let transformCount = 0
      const { config } = opts

      // No-op unless rtl is explicitly enabled.
      if (!config.rtl) {
        return transformCount
      }

      // Rewrite every string literal in script blocks (outside imports).
      // This uniformly covers cva(), cn(), clsx(), plain string assignments,
      // object properties, array elements, etc. without special-casing names.
      for (const scriptAST of scriptASTs) {
        traverseScriptAST(scriptAST, {
          visitLiteral(path) {
            if (path.parent.value.type !== 'ImportDeclaration' && typeof path.node.value === 'string') {
              const raw = path.node.value
              const mapped = applyRtlMapping(raw)
              if (mapped !== raw) {
                path.node.value = mapped
                transformCount++
              }
            }

            return this.traverse(path)
          },
        })
      }

      if (sfcAST) {
        // Walk up the parent chain looking for a VAttribute bound to class
        // (static or via v-bind / :). Returns true if this literal lives
        // inside any class binding expression.
        const isInsideClassAttribute = (node: any): boolean => {
          let current: any = node?.parent
          while (current) {
            if (current.type === 'VAttribute') {
              // Static attribute: key is a VIdentifier like `class`.
              if (current.key?.type === 'VIdentifier'
                && typeof current.key.name === 'string'
                && CLASS_ATTR_NAMES.has(current.key.name)) {
                return true
              }
              // Directive: v-bind:class / :class — key is a VDirectiveKey
              // whose `argument` identifier names the bound attribute.
              if (current.key?.type === 'VDirectiveKey'
                && current.key.argument?.type === 'VIdentifier'
                && CLASS_ATTR_NAMES.has(current.key.argument.name)) {
                return true
              }
              // Found an unrelated VAttribute — stop climbing so we don't
              // accidentally match a grandparent class binding.
              return false
            }
            current = current.parent
          }
          return false
        }

        traverseTemplateAST(sfcAST, {
          enterNode(node: any) {
            // Static `class="..."` in template: VLiteral whose parent is a
            // VAttribute with key.name === 'class' (mirrors transform-css-vars).
            if (node.type === 'VLiteral' && typeof node.value === 'string') {
              if (node.parent?.type === 'VAttribute'
                && node.parent.key?.type === 'VIdentifier'
                && CLASS_ATTR_NAMES.has(node.parent.key.name)) {
                const cleanValue = node.value.replace(/"/g, '')
                const mapped = applyRtlMapping(cleanValue)
                if (mapped !== cleanValue) {
                  node.value = mapped
                  transformCount++
                }
              }
            }
            // Any string Literal inside a `:class` / `v-bind:class` JS
            // expression: covers `:class="'foo'"`, array elements inside
            // `:class="['foo', cond && 'bar']"`, and Property keys/values
            // inside `:class="{ 'foo bar': cond }"`.
            else if (node.type === 'Literal' && typeof node.value === 'string') {
              if (isInsideClassAttribute(node)) {
                const raw = node.value
                const mapped = applyRtlMapping(raw)
                if (mapped !== raw) {
                  node.value = mapped
                  transformCount++
                }
              }
            }
          },
          leaveNode() {
          },
        })
      }

      return transformCount
    },
  }
}
