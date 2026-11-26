import type { Component, VNodeChild } from 'vue'
import { createApp, h, nextTick } from 'vue'

export function mount(component: Component, props: Record<string, unknown> = {}, slots?: () => VNodeChild) {
  const host = document.createElement('div')
  document.body.append(host)

  const app = createApp({ render: () => h(component, props, slots) })
  app.mount(host)

  return {
    host,
    unmount() {
      app.unmount()
      host.remove()
    },
  }
}

export async function flush() {
  await nextTick()
  await nextTick()
}

export function type(input: HTMLInputElement, value: string, data: string | null = null) {
  input.value = value
  input.dispatchEvent(new InputEvent('input', { bubbles: true, data }))
}

export function press(element: Element, key: string, init: KeyboardEventInit = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init })
  element.dispatchEvent(event)

  return event
}
