import { AVAILABLE_CONTENT_OPTIONS } from '@/lib/typeset/fixtures'
import { TYPESET_FONTS } from '@/lib/typeset/fonts'

export const TYPESET_PARAMS_MESSAGE = 'typeset-params'
export const TYPESET_COMMAND_MESSAGE = 'typeset-command'
/**
 * Sent by the preview once its listener is live. The iframe's `load` event
 * fires before Vue hydrates it, so a params message posted on `load` alone can
 * arrive before anything is listening and be dropped — which leaves the first
 * paint showing defaults. The preview asks instead of the designer guessing.
 */
export const TYPESET_READY_MESSAGE = 'typeset-ready'

export type TypesetCommand = 'shuffle' | 'reset' | 'undo' | 'redo' | 'toggle-theme'

export const TYPESET_SIZES = [
  { value: '14', label: '14px' },
  { value: '15', label: '15px' },
  { value: '16', label: '16px' },
  { value: '18', label: '18px' },
] as const

export const TYPESET_LEADINGS = [
  { value: '1.6', label: 'Tight (1.6)' },
  { value: '1.75', label: 'Regular (1.75)' },
  { value: '1.9', label: 'Loose (1.9)' },
] as const

export const TYPESET_FLOWS = [
  { value: '1em', label: 'Compact (1em)' },
  { value: '1.25em', label: 'Regular (1.25em)' },
  { value: '2em', label: 'Airy (2em)' },
] as const

export const TYPESET_MEASURES = [
  { value: '60', label: '60ch', width: '28em' },
  { value: '70', label: '70ch', width: '33em' },
  { value: '80', label: '80ch', width: '37em' },
  { value: '90', label: '90ch', width: '42em' },
] as const

// The one source of truth for what each param accepts. The validators, the
// history restorer, and the picker coercion all read from here.
export const TYPESET_PARAM_VALUES = {
  body: TYPESET_FONTS.map(font => font.id),
  heading: ['inherit', ...TYPESET_FONTS.map(font => font.id)],
  mono: TYPESET_FONTS.map(font => font.id),
  scale: TYPESET_SIZES.map(option => option.value),
  measure: TYPESET_MEASURES.map(option => option.value),
  flow: TYPESET_FLOWS.map(option => option.value),
  leading: TYPESET_LEADINGS.map(option => option.value),
  item: AVAILABLE_CONTENT_OPTIONS.map(option => option.value),
} as const satisfies Record<string, readonly string[]>

export const TYPESET_DEFAULTS = {
  body: 'geist-sans',
  heading: 'inherit',
  mono: 'geist-mono',
  scale: '15',
  measure: '80',
  flow: '1.25em',
  leading: '1.75',
  item: 'docs',
} as const

export type TypesetParamKey = keyof typeof TYPESET_DEFAULTS

export type TypesetSearchParams = {
  [K in TypesetParamKey]: (typeof TYPESET_PARAM_VALUES)[K][number]
}

export const TYPESET_PARAM_KEYS = Object.keys(TYPESET_DEFAULTS) as TypesetParamKey[]

// Everything but the specimen switcher; derived so locks cannot drift from
// the param model.
export type TypesetLockableParam = Exclude<TypesetParamKey, 'item'>

/** Narrows a raw string to the param's allowed values, or null if invalid. */
export function coerceTypesetValue<K extends TypesetParamKey>(
  key: K,
  value: string | null | undefined,
): TypesetSearchParams[K] | null {
  if (typeof value !== 'string') {
    return null
  }
  return (TYPESET_PARAM_VALUES[key] as readonly string[]).includes(value)
    ? (value as TypesetSearchParams[K])
    : null
}

/**
 * History snapshots restore through here: values are validated against the
 * param model, unknown keys are dropped, and absent keys become null so
 * defaults clear.
 */
export function parseTypesetSnapshot(raw: string) {
  let parsed: Record<string, unknown> = {}
  try {
    const json: unknown = JSON.parse(raw)
    if (json && typeof json === 'object' && !Array.isArray(json)) {
      parsed = json as Record<string, unknown>
    }
  }
  catch {
    // Malformed entries restore as all-null, clearing back to defaults.
  }

  const snapshot: Record<string, string | null> = {}
  for (const key of TYPESET_PARAM_KEYS) {
    const value = parsed[key]
    snapshot[key] = typeof value === 'string' ? coerceTypesetValue(key, value) : null
  }
  return snapshot as { [K in TypesetParamKey]: TypesetSearchParams[K] | null }
}

/** Builds a preview URL carrying only the params that differ from defaults. */
export function serializeTypesetSearchParams(
  base: string,
  params: TypesetSearchParams,
) {
  const search = new URLSearchParams()
  for (const key of TYPESET_PARAM_KEYS) {
    // `item` is part of the path, not the query.
    if (key === 'item') {
      continue
    }
    const value = params[key]
    if (value && value !== TYPESET_DEFAULTS[key]) {
      search.set(key, value)
    }
  }
  const query = search.toString()
  return query ? `${base}?${query}` : base
}
