import { iconLibraries } from 'shadcn-vue/icons'
import { FONT_HEADING_OPTIONS, FONTS } from '@/lib/fonts'
/**
 * Deterministic, DB-free preset encoding.
 *
 * Each config field is stored as a 1-byte index into its known value array.
 * 9 bytes → ~13 base62 characters.
 *
 * IMPORTANT: Never reorder or remove items from the arrays imported below.
 * Only append new values to keep existing preset IDs valid.
 */
import { BASE_COLORS, MENU_ACCENTS, MENU_COLORS, RADII, STYLES, THEMES } from '@/registry/config'

const ICON_LIBRARY_NAMES = Object.keys(iconLibraries) as string[]

const FIELDS = [
  { key: 'style', values: STYLES.map(s => s.name) },
  { key: 'baseColor', values: BASE_COLORS.map(c => c.name) },
  { key: 'theme', values: THEMES.map(t => t.name) },
  { key: 'font', values: FONTS.map(f => f.value) },
  { key: 'fontHeading', values: FONT_HEADING_OPTIONS.map(f => f.value) },
  { key: 'radius', values: RADII.map(r => r.name) },
  { key: 'iconLibrary', values: ICON_LIBRARY_NAMES },
  { key: 'menuColor', values: MENU_COLORS.map(m => m.value) },
  { key: 'menuAccent', values: MENU_ACCENTS.map(a => a.value) },
] as const

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function bytesToBase62(bytes: number[]): string {
  let num = 0n
  for (const byte of bytes)
    num = num * 256n + BigInt(byte)
  if (num === 0n)
    return BASE62[0]!
  let result = ''
  while (num > 0n) {
    result = BASE62[Number(num % 62n)]! + result
    num = num / 62n
  }
  return result
}

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

export function encodePreset(config: Record<string, string>): string {
  const bytes = FIELDS.map(({ key, values }) => {
    const idx = (values as readonly string[]).indexOf(config[key] ?? '')
    return idx === -1 ? 0 : idx
  })
  return bytesToBase62(bytes)
}

export function decodePreset(encoded: string): Record<string, string> {
  const bytes = base62ToBytes(encoded, FIELDS.length)
  return Object.fromEntries(
    FIELDS.map(({ key, values }, i) => [key, (values as readonly string[])[bytes[i]!] ?? values[0]]),
  ) as Record<string, string>
}
