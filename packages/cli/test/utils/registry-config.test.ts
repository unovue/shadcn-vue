import { describe, expect, it } from 'vitest'
import { resolveRegistryStyle } from '../../src/registry/config'

describe('resolveRegistryStyle', () => {
  it('returns fallback style for undefined', () => {
    expect(resolveRegistryStyle(undefined)).toBe('new-york-v4')
  })

  it('returns fallback style for vega', () => {
    expect(resolveRegistryStyle('vega')).toBe('new-york-v4')
  })

  it('returns fallback style for nova', () => {
    expect(resolveRegistryStyle('nova')).toBe('new-york-v4')
  })

  it('returns fallback style for maia', () => {
    expect(resolveRegistryStyle('maia')).toBe('new-york-v4')
  })

  it('returns fallback style for lyra', () => {
    expect(resolveRegistryStyle('lyra')).toBe('new-york-v4')
  })

  it('returns fallback style for mira', () => {
    expect(resolveRegistryStyle('mira')).toBe('new-york-v4')
  })

  it('returns new-york-v4 as-is', () => {
    expect(resolveRegistryStyle('new-york-v4')).toBe('new-york-v4')
  })

  it('returns new-york as-is', () => {
    expect(resolveRegistryStyle('new-york')).toBe('new-york')
  })

  it('returns default as-is', () => {
    expect(resolveRegistryStyle('default')).toBe('default')
  })

  it('handles versioned visual styles', () => {
    // vega-v4 should still map to new-york-v4
    expect(resolveRegistryStyle('vega-v4')).toBe('new-york-v4')
    expect(resolveRegistryStyle('nova-v4')).toBe('new-york-v4')
  })
})
