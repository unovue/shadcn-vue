import type { WritableComputedRef } from 'vue'
import type {
  TypesetParamKey,
  TypesetSearchParams,
} from '@/lib/typeset/params'
import { useRouteQuery } from '@vueuse/router'
import { computed } from 'vue'
import {
  coerceTypesetValue,
  TYPESET_DEFAULTS,
  TYPESET_PARAM_KEYS,
} from '@/lib/typeset/params'

type TypesetParamRefs = {
  [K in TypesetParamKey]: WritableComputedRef<TypesetSearchParams[K]>
}

/**
 * URL-backed state for the typeset designer. One query key per param (so the
 * URL stays shareable and human-readable, unlike /create's encoded preset).
 *
 * Reads are validated against the param model, so a hand-edited URL falls back
 * to the default instead of rendering something broken. Writes drop values
 * equal to the default, keeping the URL free of noise.
 *
 * Always writes with `replace`: every picker interaction would otherwise push a
 * browser history entry, and the designer keeps its own undo stack
 * (see useTypesetHistory).
 */
export function useTypesetSearchParams() {
  const options = { mode: 'replace' as const, route: useRoute(), router: useRouter() }

  // Built through a loose record: writing to a mapped type under a union key
  // narrows the assignable type to `never`.
  const built: Record<string, WritableComputedRef<string>> = {}

  for (const key of TYPESET_PARAM_KEYS) {
    const query = useRouteQuery<string | undefined>(key, undefined, options)

    built[key] = computed({
      get: () => coerceTypesetValue(key, query.value) ?? TYPESET_DEFAULTS[key],
      set: (value) => {
        query.value = value === TYPESET_DEFAULTS[key] ? undefined : value
      },
    })
  }

  const params = built as TypesetParamRefs

  /** Current values as a plain object — the shape posted to the preview iframe. */
  function toValues(): TypesetSearchParams {
    const values = {} as TypesetSearchParams
    for (const key of TYPESET_PARAM_KEYS) {
      values[key] = params[key].value as never
    }
    return values
  }

  /**
   * Applies a partial update. A `null` value clears the param back to its
   * default, which is how history snapshots restore params that were absent
   * from the URL.
   */
  function setParams(
    next: Partial<{ [K in TypesetParamKey]: TypesetSearchParams[K] | null }>,
  ) {
    for (const key of TYPESET_PARAM_KEYS) {
      if (!(key in next)) {
        continue
      }
      const value = next[key]
      params[key].value = (value ?? TYPESET_DEFAULTS[key]) as never
    }
  }

  /** Clears every managed key back to its default. */
  function resetParams() {
    for (const key of TYPESET_PARAM_KEYS) {
      params[key].value = TYPESET_DEFAULTS[key] as never
    }
  }

  return { ...params, toValues, setParams, resetParams }
}
