/**
 * Deterministic, DB-free preset decoding — mirrors apps/v4/lib/preset-encoding.ts.
 *
 * Each config field is stored as a 1-byte index into a known value array.
 * 9 bytes → ~13 base62 characters.
 *
 * IMPORTANT: Never reorder or remove items from these arrays.
 * Only append new values to keep existing preset IDs valid.
 * These arrays MUST stay in sync with apps/v4/lib/preset-encoding.ts.
 */

const FONT_VALUES = [
  'geist',
  'inter',
  'noto-sans',
  'nunito-sans',
  'figtree',
  'roboto',
  'raleway',
  'dm-sans',
  'public-sans',
  'outfit',
  'oxanium',
  'manrope',
  'space-grotesk',
  'montserrat',
  'ibm-plex-sans',
  'source-sans-3',
  'instrument-sans',
  'jetbrains-mono',
  'geist-mono',
  'noto-serif',
  'roboto-slab',
  'merriweather',
  'lora',
  'playfair-display',
]

const FIELDS = [
  { key: 'style', values: ['vega', 'nova', 'maia', 'lyra', 'mira', 'luma'] },
  { key: 'baseColor', values: ['neutral', 'stone', 'zinc', 'gray'] },
  {
    key: 'theme',
    values: [
      'neutral',
      'stone',
      'zinc',
      'gray',
      'amber',
      'blue',
      'cyan',
      'emerald',
      'fuchsia',
      'green',
      'indigo',
      'lime',
      'orange',
      'pink',
      'purple',
      'red',
      'rose',
      'sky',
      'teal',
      'violet',
      'yellow',
    ],
  },
  { key: 'font', values: FONT_VALUES },
  { key: 'fontHeading', values: ['inherit', ...FONT_VALUES] },
  { key: 'radius', values: ['default', 'none', 'small', 'medium', 'large'] },
  { key: 'iconLibrary', values: ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon'] },
  { key: 'menuColor', values: ['default', 'default-translucent', 'inverted', 'inverted-translucent'] },
  { key: 'menuAccent', values: ['subtle', 'bold'] },
] as const

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function base62ToBytes(str: string, byteCount: number): number[] {
  let num = 0n
  for (const ch of str) {
    const idx = BASE62.indexOf(ch)
    if (idx === -1)
      throw new Error(`Invalid preset character: ${ch}`)
    num = num * 62n + BigInt(idx)
  }
  const bytes: number[] = new Array(byteCount).fill(0)
  for (let i = byteCount - 1; i >= 0; i--) {
    bytes[i] = Number(num % 256n)
    num = num / 256n
  }
  return bytes
}

export interface DecodedPreset {
  style: string
  baseColor: string
  theme: string
  font: string
  fontHeading: string
  radius: string
  iconLibrary: string
  menuColor: string
  menuAccent: string
}

/**
 * Decode a base62-encoded preset hash produced by the shadcn-vue web UI.
 * Returns null if the string is not a valid encoded preset.
 */
export function decodePreset(encoded: string): DecodedPreset | null {
  try {
    const bytes = base62ToBytes(encoded, FIELDS.length)
    return Object.fromEntries(
      FIELDS.map(({ key, values }, i) => [key, values[bytes[i]!] ?? values[0]]),
    ) as DecodedPreset
  }
  catch {
    return null
  }
}

/** Returns true if the string looks like a base62 encoded preset (all base62 chars, reasonable length). */
export function isEncodedPreset(value: string): boolean {
  return value.length >= 8 && value.length <= 16 && [...value].every(ch => BASE62.includes(ch))
}
