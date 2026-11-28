// @vitest-environment happy-dom
import assert from 'node:assert/strict'
import { afterEach, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/registry/bases/vase/ui/tags-input'
import { flush, mount, press, type } from './mount'

const cleanups: (() => void)[] = []

afterEach(() => cleanups.splice(0).forEach(cleanup => cleanup()))

async function render(props: Record<string, unknown> = {}, initial = ['a', 'b']) {
  const tags = ref<string[]>(initial)
  const events: string[] = []
  const Host = defineComponent({
    setup: () => () => h(TagsInput, {
      'modelValue': tags.value,
      'onUpdate:modelValue': (value: string[]) => {
        tags.value = value
      },
      'onAddTag': (tag: string) => events.push(`add:${tag}`),
      'onRemoveTag': (tag: string) => events.push(`remove:${tag}`),
      'onInvalid': (tag: string) => events.push(`invalid:${tag}`),
      ...props,
    }, {
      default: ({ modelValue }: { modelValue: string[] }) => [
        ...modelValue.map(tag => h(TagsInputItem, { key: tag, value: tag }, () => [h(TagsInputItemText), h(TagsInputItemDelete)])),
        h(TagsInputInput),
      ],
    }),
  })
  const mounted = mount(Host)
  cleanups.push(mounted.unmount)
  await flush()

  const input = mounted.host.querySelector<HTMLInputElement>('[data-slot=tags-input-input]')!
  const items = () => [...mounted.host.querySelectorAll<HTMLElement>('[data-slot=tags-input-item]')]

  return {
    host: mounted.host,
    tags,
    events,
    input,
    items,
    texts: () => items().map(item => item.querySelector('[data-slot=tags-input-item-text]')!.textContent),
    selected: () => items().map(item => item.dataset.state === 'active'),
  }
}

it('adds the typed text as a tag at Enter, and keeps the form from submitting', async () => {
  const { input, tags, events, texts } = await render()

  type(input, 'c')
  const event = press(input, 'Enter')
  await flush()

  assert.equal(event.defaultPrevented, true)
  assert.deepEqual(tags.value, ['a', 'b', 'c'])
  assert.deepEqual(texts(), ['a', 'b', 'c'])
  assert.equal(input.value, '')
  assert.deepEqual(events, ['add:c'])
})

it('adds a tag when the user types the delimiter', async () => {
  const { input, tags } = await render()

  type(input, 'c,', ',')
  await flush()
  assert.deepEqual(tags.value, ['a', 'b', 'c'])
  assert.equal(input.value, '')

  type(input, ',', ',')
  assert.deepEqual(tags.value, ['a', 'b', 'c'])
})

it('refuses a duplicate tag unless duplicates are allowed', async () => {
  const strict = await render()

  type(strict.input, 'a')
  press(strict.input, 'Enter')
  await flush()
  assert.deepEqual(strict.tags.value, ['a', 'b'])
  assert.deepEqual(strict.events, ['invalid:a'])
  assert.equal(strict.input.hasAttribute('data-invalid'), true)
  assert.equal(strict.input.value, 'a')

  type(strict.input, 'ab', 'b')
  await flush()
  assert.equal(strict.input.hasAttribute('data-invalid'), false)

  const loose = await render({ duplicate: true })

  type(loose.input, 'a')
  press(loose.input, 'Enter')
  await flush()
  assert.deepEqual(loose.tags.value, ['a', 'b', 'a'])
})

it('refuses a tag past the maximum', async () => {
  const { input, tags, events } = await render({ max: 2 })

  type(input, 'c')
  press(input, 'Enter')
  await flush()

  assert.deepEqual(tags.value, ['a', 'b'])
  assert.deepEqual(events, ['invalid:c'])
})

it('selects the last tag at the first Backspace, and removes it at the next one', async () => {
  const { input, tags, events, selected } = await render()

  assert.equal(press(input, 'Backspace').defaultPrevented, true)
  await flush()
  assert.deepEqual(selected(), [false, true])
  assert.deepEqual(tags.value, ['a', 'b'])

  press(input, 'Backspace')
  await flush()
  assert.deepEqual(tags.value, ['a'])
  assert.deepEqual(events, ['remove:b'])
  assert.deepEqual(selected(), [true])

  press(input, 'Backspace')
  await flush()
  assert.deepEqual(tags.value, [])
  assert.deepEqual(events, ['remove:b', 'remove:a'])
  assert.deepEqual(selected(), [])
})

it('moves the selection between the tags with the arrow keys', async () => {
  const { input, selected } = await render({}, ['a', 'b', 'c'])

  press(input, 'ArrowLeft')
  await flush()
  assert.deepEqual(selected(), [false, false, true])

  press(input, 'ArrowLeft')
  await flush()
  assert.deepEqual(selected(), [false, true, false])

  press(input, 'Home')
  await flush()
  assert.deepEqual(selected(), [true, false, false])

  press(input, 'End')
  await flush()
  assert.deepEqual(selected(), [false, false, true])

  press(input, 'ArrowRight')
  await flush()
  assert.deepEqual(selected(), [false, false, false])
})

it('removes the tag of the delete button that the user presses', async () => {
  const { host, tags, events } = await render()

  host.querySelectorAll<HTMLButtonElement>('[data-slot=tags-input-item-delete]')[0]!.click()
  await flush()

  assert.deepEqual(tags.value, ['b'])
  assert.deepEqual(events, ['remove:a'])
})

it('adds the typed text at the blur, and the pasted text at the paste, when asked', async () => {
  const { input, tags } = await render({ addOnBlur: true, addOnPaste: true })

  type(input, 'c')
  input.dispatchEvent(new FocusEvent('blur'))
  await flush()
  assert.deepEqual(tags.value, ['a', 'b', 'c'])

  const paste = new Event('paste', { bubbles: true, cancelable: true })
  Object.defineProperty(paste, 'clipboardData', { value: { getData: () => 'd,e' } })
  input.dispatchEvent(paste)
  await flush()
  assert.deepEqual(tags.value, ['a', 'b', 'c', 'd', 'e'])
  assert.equal(paste.defaultPrevented, true)
})

it('gives each tag to a form with a hidden input', async () => {
  const { host } = await render({ name: 'tags' })

  const hidden = [...host.querySelectorAll<HTMLInputElement>('input[type=hidden]')]

  assert.deepEqual(hidden.map(input => [input.name, input.value]), [['tags', 'a'], ['tags', 'b']])
})

it('does not change the tags when it is disabled', async () => {
  const { host, input } = await render({ disabled: true })

  assert.equal(input.disabled, true)
  assert.equal(host.querySelector('[data-slot=tags-input]')!.hasAttribute('data-disabled'), true)
  host.querySelector<HTMLButtonElement>('[data-slot=tags-input-item-delete]')!.click()
  await flush()
  assert.equal(host.querySelectorAll('[data-slot=tags-input-item]').length, 2)
})
