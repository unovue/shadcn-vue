// @vitest-environment happy-dom

import assert from 'node:assert/strict'
import { installImplementation as installFullTemporal } from 'temporal-polyfill/full/shim'
import { afterEach, it, vi } from 'vitest'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Calendar } from '@/registry/bases/vase/ui/calendar'
import { RangeCalendar } from '@/registry/bases/vase/ui/range-calendar'
import { flush, mount } from './mount'

const originalTemporal = Object.getOwnPropertyDescriptor(globalThis, 'Temporal')
const originalDateTimeFormat = Object.getOwnPropertyDescriptor(Intl, 'DateTimeFormat')
const originalToTemporalInstant = Object.getOwnPropertyDescriptor(Date.prototype, 'toTemporalInstant')

const cleanups: (() => void)[] = []

function restoreDescriptor(target: object, key: PropertyKey, descriptor?: PropertyDescriptor) {
  if (descriptor)
    Object.defineProperty(target, key, descriptor)
  else
    Reflect.deleteProperty(target, key)
}

function clearTemporal() {
  Reflect.deleteProperty(globalThis, 'Temporal')
  restoreDescriptor(Intl, 'DateTimeFormat', originalDateTimeFormat)
  restoreDescriptor(Date.prototype, 'toTemporalInstant', originalToTemporalInstant)
}

afterEach(() => {
  cleanups.splice(0).forEach(cleanup => cleanup())
  restoreDescriptor(globalThis, 'Temporal', originalTemporal)
  restoreDescriptor(Intl, 'DateTimeFormat', originalDateTimeFormat)
  restoreDescriptor(Date.prototype, 'toTemporalInstant', originalToTemporalInstant)
})

it('does not install Temporal when the module loads, and installs it on demand', async () => {
  clearTemporal()
  vi.resetModules()

  const mod = await import('@/registry/bases/vase/lib/temporal')
  assert.equal('Temporal' in globalThis, false)

  mod.installTemporal()
  assert.equal('Temporal' in globalThis, true)
  assert.equal(new Temporal.PlainDate(2026, 11, 27).toString(), '2026-11-27')
})

it('keeps a Temporal polyfill that the app already installed', () => {
  clearTemporal()
  installFullTemporal()
  const appTemporal = globalThis.Temporal

  installTemporal()

  assert.equal(globalThis.Temporal, appTemporal)
  assert.equal(Temporal.PlainDate.from('2026-11-27').withCalendar('persian').year, 1405)
})

it('installs Temporal when Calendar or RangeCalendar renders without one', async () => {
  for (const [Component, slot] of [[Calendar, 'calendar'], [RangeCalendar, 'range-calendar']] as const) {
    clearTemporal()
    const mounted = mount(Component)
    cleanups.push(mounted.unmount)
    await flush()

    assert.equal('Temporal' in globalThis, true)
    assert.ok(mounted.host.querySelector(`[data-slot=${slot}]`))
  }
})

it('keeps the full polyfill and Persian calendar when Calendar and RangeCalendar render', async () => {
  clearTemporal()
  installFullTemporal()
  const appTemporal = globalThis.Temporal
  const value = Temporal.PlainDate.from('2026-11-27').withCalendar('persian')

  const cal = mount(Calendar, { modelValue: value, calendar: 'persian', locale: 'en-US' })
  const range = mount(RangeCalendar, { modelValue: [value, value.add({ days: 2 })], calendar: 'persian', locale: 'en-US' })
  cleanups.push(cal.unmount, range.unmount)
  await flush()

  assert.equal(globalThis.Temporal, appTemporal)
  assert.match(cal.host.querySelector('[data-slot=calendar-heading]')!.textContent ?? '', /1405/)
  assert.match(range.host.querySelector('[data-slot=range-calendar-heading]')!.textContent ?? '', /1405/)
})
