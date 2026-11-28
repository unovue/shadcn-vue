// @vitest-environment happy-dom

import type { CommandSelectEvent } from '@/registry/bases/vase/ui/command'
import assert from 'node:assert/strict'
import { afterEach, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/registry/bases/vase/ui/command'
import { flush, mount, press, type } from './mount'

const cleanups: (() => void)[] = []

afterEach(() => cleanups.splice(0).forEach(cleanup => cleanup()))

async function render(props: Record<string, unknown> = {}, itemProps: { onSelect?: (event: CommandSelectEvent) => void } = {}) {
  const model = ref<unknown>(props.multiple ? [] : '')
  const Host = defineComponent({
    setup: () => () => h(Command, {
      'modelValue': model.value,
      'onUpdate:modelValue': (value: unknown) => {
        model.value = value
      },
      ...props,
    }, () => [
      h(CommandInput, { placeholder: 'Search' }),
      h(CommandList, null, () => [
        h(CommandEmpty, null, () => 'No results'),
        h(CommandGroup, { heading: 'Suggestions' }, () => [
          h(CommandItem, { value: 'calendar', ...itemProps }, () => 'Calendar'),
          h(CommandItem, { value: 'calculator', disabled: true }, () => 'Calculator'),
          h(CommandItem, { value: 'emoji' }, () => 'Search Émoji'),
        ]),
        h(CommandSeparator),
        h(CommandGroup, { heading: 'Settings' }, () => [
          h(CommandItem, { value: 'profile' }, () => 'Profile'),
        ]),
      ]),
    ]),
  })
  const mounted = mount(Host)
  cleanups.push(mounted.unmount)
  await flush()

  const input = mounted.host.querySelector<HTMLInputElement>('[data-slot=command-input]')!
  const options = () => [...mounted.host.querySelectorAll<HTMLElement>('[role=option]')]

  return {
    host: mounted.host,
    model,
    input,
    options,
    shown: () => options().map(option => option.textContent!.trim()),
    highlighted: () => options().filter(option => option.hasAttribute('data-highlighted')).map(option => option.textContent!.trim()),
    groups: () => [...mounted.host.querySelectorAll<HTMLElement>('[data-slot=command-group]')].map(group => !group.hidden),
    empty: () => mounted.host.querySelector('[data-slot=command-empty]')?.textContent,
  }
}

it('shows each item and highlights the first one that the user can pick', async () => {
  const { shown, highlighted, input, host } = await render()

  assert.deepEqual(shown(), ['Calendar', 'Calculator', 'Search Émoji', 'Profile'])
  assert.deepEqual(highlighted(), ['Calendar'])
  assert.equal(input.getAttribute('role'), 'combobox')
  assert.equal(input.getAttribute('aria-controls'), host.querySelector('[role=listbox]')!.id)
  assert.equal(input.getAttribute('aria-activedescendant'), host.querySelector('[data-highlighted]')!.id)
})

it('filters the items by the typed text, with no regard to case and accents', async () => {
  const { shown, groups, input, highlighted } = await render()

  type(input, 'CAL')
  await flush()
  assert.deepEqual(shown(), ['Calendar', 'Calculator'])
  assert.deepEqual(groups(), [true, false])
  assert.deepEqual(highlighted(), ['Calendar'])

  type(input, 'emoji')
  await flush()
  assert.deepEqual(shown(), ['Search Émoji'])
  assert.deepEqual(highlighted(), ['Search Émoji'])

  type(input, '')
  await flush()
  assert.equal(shown().length, 4)
  assert.deepEqual(groups(), [true, true])
})

it('shows the empty message only when the text has no match', async () => {
  const { input, empty, shown, groups } = await render()

  assert.equal(empty(), undefined)

  type(input, 'zzz')
  await flush()
  assert.equal(empty(), 'No results')
  assert.deepEqual(shown(), [])
  assert.deepEqual(groups(), [false, false])

  type(input, '')
  await flush()
  assert.equal(empty(), undefined)
})

it('moves the highlight with the arrow keys and skips a disabled item', async () => {
  const { input, highlighted } = await render()

  assert.equal(press(input, 'ArrowDown').defaultPrevented, true)
  await flush()
  assert.deepEqual(highlighted(), ['Search Émoji'])

  press(input, 'ArrowDown')
  await flush()
  assert.deepEqual(highlighted(), ['Profile'])

  press(input, 'ArrowDown')
  await flush()
  assert.deepEqual(highlighted(), ['Profile'])

  press(input, 'ArrowUp')
  press(input, 'ArrowUp')
  press(input, 'ArrowUp')
  await flush()
  assert.deepEqual(highlighted(), ['Calendar'])
})

it('picks the highlighted item at Enter, and clears the text', async () => {
  const picks: unknown[] = []
  const { input, model, options } = await render({}, { onSelect: event => picks.push(event.detail.value) })

  type(input, 'cal')
  await flush()
  press(input, 'Enter')
  await flush()

  assert.deepEqual(picks, ['calendar'])
  assert.equal(model.value, 'calendar')
  assert.equal(input.value, '')
  assert.equal(options().length, 4)
  assert.equal(options()[0]!.getAttribute('data-checked'), 'true')
  assert.equal(options()[1]!.hasAttribute('data-checked'), false)
})

it('picks the item that the user clicks, but not a disabled one', async () => {
  const { options, model } = await render()

  options()[1]!.click()
  await flush()
  assert.equal(model.value, '')

  options()[2]!.click()
  await flush()
  assert.equal(model.value, 'emoji')
})

it('keeps the value when a listener prevents the select event', async () => {
  const { options, model } = await render({}, { onSelect: event => event.preventDefault() })

  options()[0]!.click()
  await flush()

  assert.equal(model.value, '')
})

it('picks more than one value when it is multiple', async () => {
  const { options, model } = await render({ multiple: true })

  options()[0]!.click()
  options()[2]!.click()
  await flush()
  assert.deepEqual(model.value, ['calendar', 'emoji'])

  options()[0]!.click()
  await flush()
  assert.deepEqual(model.value, ['emoji'])
})

it('highlights the item under the pointer, unless that is turned off', async () => {
  const hover = await render()

  hover.options()[3]!.dispatchEvent(new Event('pointermove', { bubbles: true }))
  await flush()
  assert.deepEqual(hover.highlighted(), ['Profile'])

  const still = await render({ highlightOnHover: false })

  still.options()[3]!.dispatchEvent(new Event('pointermove', { bubbles: true }))
  await flush()
  assert.deepEqual(still.highlighted(), ['Calendar'])
})

it('does not highlight a disabled item on pointermove', async () => {
  const { options, highlighted } = await render()

  options()[1]!.dispatchEvent(new Event('pointermove', { bubbles: true }))
  await flush()
  assert.deepEqual(highlighted(), ['Calendar'])
})

it('disables input and selection when the command is disabled', async () => {
  const picks: unknown[] = []
  const { input, options, model, highlighted } = await render(
    { disabled: true },
    { onSelect: event => picks.push(event.detail.value) },
  )

  assert.equal(input.disabled, true)
  assert.deepEqual(highlighted(), [])
  options()[0]!.click()
  await flush()
  assert.deepEqual(picks, [])
  assert.equal(model.value, '')
})

it('moves the highlight when the highlighted item unmounts', async () => {
  const showFirst = ref(true)
  const Host = defineComponent({
    setup: () => () => h(Command, null, () => [
      h(CommandInput, { placeholder: 'Search' }),
      h(CommandList, null, () => [
        showFirst.value ? h(CommandItem, { key: 'a', value: 'a' }, () => 'Alpha') : null,
        h(CommandItem, { key: 'b', value: 'b' }, () => 'Beta'),
      ]),
    ]),
  })
  const mounted = mount(Host)
  cleanups.push(mounted.unmount)
  await flush()

  const input = mounted.host.querySelector<HTMLInputElement>('[data-slot=command-input]')!
  const first = mounted.host.querySelector<HTMLElement>('[role=option]')!
  assert.equal(input.getAttribute('aria-activedescendant'), first.id)

  showFirst.value = false
  await flush()

  const remaining = mounted.host.querySelector<HTMLElement>('[role=option]')!
  assert.equal(remaining.textContent!.trim(), 'Beta')
  assert.equal(input.getAttribute('aria-activedescendant'), remaining.id)
})
