import type { TypesetSearchParams } from '@/lib/typeset/params'

export type TypesetPreviewOverride = Partial<TypesetSearchParams> | null

/**
 * How long the pointer must settle before a preview applies. Every mousemove
 * over a picker item re-arms this trailing timer, so nothing applies while the
 * cursor is in motion. Clears are never debounced: reverting on leave/Escape
 * must feel instant.
 */
const PREVIEW_OVERRIDE_DEBOUNCE_MS = 50

// One shared timer so a pending preview from one picker is cancelled the moment
// another picker asks for one. Only ever touched from pointer/focus handlers,
// so it never runs during SSR.
let timeout: ReturnType<typeof setTimeout> | null = null

function isSameOverride(a: TypesetPreviewOverride, b: TypesetPreviewOverride) {
  if (a === b) {
    return true
  }
  if (!a || !b) {
    return false
  }
  const aKeys = Object.keys(a) as (keyof TypesetSearchParams)[]
  const bKeys = Object.keys(b)
  return aKeys.length === bKeys.length && aKeys.every(key => a[key] === b[key])
}

/**
 * Uncommitted params applied to the preview while hovering a picker item.
 *
 * Kept out of the URL on purpose: the URL is what the undo stack snapshots, so
 * committing hovers would record a phantom entry for every hovered item. The
 * preview iframe receives these through the same postMessage channel as
 * committed params and reverts when cleared.
 */
export function useTypesetPreviewOverride() {
  const override = useState<TypesetPreviewOverride>('typeset-preview-override', () => null)

  function cancelPending() {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  function setOverride(next: Partial<TypesetSearchParams>) {
    cancelPending()
    timeout = setTimeout(() => {
      timeout = null
      // Skip identical updates: mouseenter and focus both fire for the hovered
      // item, and hovering the committed value is a no-op.
      if (!isSameOverride(override.value, next)) {
        override.value = next
      }
    }, PREVIEW_OVERRIDE_DEBOUNCE_MS)
  }

  function clearOverride() {
    cancelPending()
    override.value = null
  }

  return { override, setOverride, clearOverride }
}
