import { describe, expect, it, vi } from 'vitest'
import { encodePreset } from '@/src/preset/preset'
import {
  getBase,
  getInitCommand,
  resolveApplyInitUrl,
  resolveApplyPreset,
} from './apply'

vi.mock('@/src/utils/handle-error', () => ({
  handleError: vi.fn(),
}))

vi.mock('@/src/utils/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    log: vi.fn(),
    info: vi.fn(),
    break: vi.fn(),
  },
}))

describe('resolveApplyPreset', () => {
  const baseOptions = {
    cwd: '/tmp',
    yes: false,
    silent: false,
  }

  it('returns the positional preset when only a positional is provided', () => {
    expect(
      resolveApplyPreset({ ...baseOptions, positionalPreset: 'nova' }),
    ).toBe('nova')
  })

  it('returns the flag preset when only --preset is provided', () => {
    expect(resolveApplyPreset({ ...baseOptions, preset: 'luma' })).toBe('luma')
  })

  it('returns the value when positional and flag agree', () => {
    expect(
      resolveApplyPreset({
        ...baseOptions,
        positionalPreset: 'vega',
        preset: 'vega',
      }),
    ).toBe('vega')
  })

  it('trims surrounding whitespace from preset values', () => {
    expect(
      resolveApplyPreset({ ...baseOptions, positionalPreset: '  mira  ' }),
    ).toBe('mira')
  })

  it('returns undefined when no preset is provided', () => {
    expect(resolveApplyPreset(baseOptions)).toBeUndefined()
  })

  it('exits when positional and flag presets disagree', () => {
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(((_code?: number) => {
        throw new Error('process.exit called')
      }) as never)

    try {
      expect(() =>
        resolveApplyPreset({
          ...baseOptions,
          positionalPreset: 'vega',
          preset: 'nova',
        }),
      ).toThrow('process.exit called')

      expect(exitSpy).toHaveBeenCalledWith(1)
    }
    finally {
      // Guard with `finally` so a failed assertion above can't leak the
      // spy into neighbouring tests. Vitest is not configured with
      // `restoreMocks: true`, so this cleanup has to be explicit.
      exitSpy.mockRestore()
    }
  })
})

describe('getBase', () => {
  it('extracts the base segment from a composed style id', () => {
    expect(getBase('reka-vega')).toBe('reka')
    expect(getBase('reka-nova')).toBe('reka')
  })

  it('falls back to the default base for unknown / empty styles', () => {
    expect(getBase(undefined)).toBe('reka')
    expect(getBase('')).toBe('reka')
    expect(getBase('mystery-style')).toBe('reka')
  })
})

describe('getInitCommand', () => {
  it('returns the bare init command when no preset is provided', () => {
    expect(getInitCommand()).toBe('shadcn-vue init')
  })

  it('appends a simple preset name without quoting', () => {
    expect(getInitCommand('nova')).toBe('shadcn-vue init --preset nova')
  })

  it('quotes preset values that contain shell-unsafe characters', () => {
    expect(
      getInitCommand('https://example.com/init?style=nova&base=reka'),
    ).toBe(
      'shadcn-vue init --preset "https://example.com/init?style=nova&base=reka"',
    )
  })
})

describe('resolveApplyInitUrl', () => {
  it('builds an init URL for a named preset and forces base + rtl', () => {
    const url = resolveApplyInitUrl('nova', { base: 'reka', rtl: true })
    expect(url).not.toBeNull()

    const parsed = new URL(url!)
    expect(parsed.pathname).toBe('/init')
    expect(parsed.searchParams.get('base')).toBe('reka')
    expect(parsed.searchParams.get('style')).toBe('nova')
    expect(parsed.searchParams.get('iconLibrary')).toBe('lucide')
    expect(parsed.searchParams.get('font')).toBe('geist-sans')
    expect(parsed.searchParams.get('baseColor')).toBe('neutral')
    expect(parsed.searchParams.get('rtl')).toBe('true')
  })

  it('always overrides the preset base with the project current base', () => {
    // Even if a future named preset shipped with a different base, the
    // current project base must win — applying a preset never silently
    // switches the user's component library.
    const url = resolveApplyInitUrl('vega', { base: 'reka', rtl: false })
    expect(url).not.toBeNull()
    const parsed = new URL(url!)
    expect(parsed.searchParams.get('base')).toBe('reka')
    expect(parsed.searchParams.get('rtl')).toBe('false')
  })

  it('builds an init URL for an encoded preset', () => {
    const code = encodePreset({
      style: 'nova',
      baseColor: 'zinc',
      theme: 'zinc',
      font: 'inter',
      iconLibrary: 'lucide',
    })
    const url = resolveApplyInitUrl(code, { base: 'reka', rtl: false })
    expect(url).not.toBeNull()

    const parsed = new URL(url!)
    expect(parsed.searchParams.get('style')).toBe('nova')
    expect(parsed.searchParams.get('baseColor')).toBe('zinc')
    expect(parsed.searchParams.get('theme')).toBe('zinc')
    expect(parsed.searchParams.get('font')).toBe('inter')
    expect(parsed.searchParams.get('iconLibrary')).toBe('lucide')
    // currentBase carried through.
    expect(parsed.searchParams.get('base')).toBe('reka')
    // Original preset code round-tripped for server-side compat fixups.
    expect(parsed.searchParams.get('preset')).toBe(code)
  })

  it('passes a remote URL through with base + rtl overrides applied', () => {
    const remote
      = 'https://shadcn-vue.com/init?base=other&style=mira&font=figtree'
    const url = resolveApplyInitUrl(remote, { base: 'reka', rtl: true })
    expect(url).not.toBeNull()

    const parsed = new URL(url!)
    expect(parsed.searchParams.get('base')).toBe('reka')
    expect(parsed.searchParams.get('rtl')).toBe('true')
    // Non-overridden params come through unchanged.
    expect(parsed.searchParams.get('style')).toBe('mira')
    expect(parsed.searchParams.get('font')).toBe('figtree')
    // First-party /init URLs are tracked.
    expect(parsed.searchParams.get('track')).toBe('1')
  })

  it('always writes rtl=false on a remote URL when the project is LTR', () => {
    const remote = 'https://shadcn-vue.com/init?base=reka&style=nova&rtl=true'
    const url = resolveApplyInitUrl(remote, { base: 'reka', rtl: false })
    const parsed = new URL(url!)
    expect(parsed.searchParams.get('rtl')).toBe('false')
  })

  it('does not add track=1 to third-party URLs', () => {
    const remote = 'https://example.com/init?style=nova'
    const url = resolveApplyInitUrl(remote, { base: 'reka', rtl: false })
    const parsed = new URL(url!)
    expect(parsed.searchParams.has('track')).toBe(false)
  })

  it('returns null for an unknown named preset', () => {
    expect(
      resolveApplyInitUrl('not-a-real-preset', { base: 'reka', rtl: false }),
    ).toBeNull()
  })
})
