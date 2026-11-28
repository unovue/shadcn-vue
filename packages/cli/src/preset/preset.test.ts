import { describe, expect, it } from 'vitest'
import { decodePreset, encodePreset, fromBase62, toBase62 } from './preset'

describe('preset codes', () => {
  // Preset codes are shared in links and commands, so a code keeps its meaning
  // when a base joins `PRESET_BASES`. A new base is appended after `reka`.
  it.each([
    ['a0', { style: 'vega' }],
    ['aaKeiO', { style: 'nova', font: 'geist-sans' }],
    ['a1AhVxI', { style: 'maia', font: 'figtree', iconLibrary: 'hugeicons' }],
    ['a3y6dTk', { style: 'sera', baseColor: 'taupe', theme: 'taupe', font: 'noto-sans', fontHeading: 'playfair-display' }],
  ] as const)('keeps the meaning of %s', (code, config) => {
    expect(decodePreset(code)).toMatchObject({ ...config, base: 'reka' })
    expect(encodePreset({ base: 'reka', ...config })).toBe(code)
  })

  it('decodes a base that this version does not know as the first base', () => {
    const nova = encodePreset({ style: 'nova' })
    // The two bits of `base` start at bit 32.
    const unknownBase = `a${toBase62(fromBase62(nova.slice(1)) + 3 * 2 ** 32)}`

    expect(decodePreset(unknownBase)).toEqual(decodePreset(nova))
  })
})
