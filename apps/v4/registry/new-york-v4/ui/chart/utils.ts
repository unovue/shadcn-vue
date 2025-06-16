import type { ChartConfig } from '.'
import { isClient } from '@vueuse/core'
import { type Component, h, render } from 'vue'

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload
    = 'payload' in payload
      && typeof payload.payload === 'object'
      && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload
    && typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  }
  else if (
    payloadPayload
    && key in payloadPayload
    && typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

// Simple cache using a Map to store serialized object keys
const cache = new Map<string, string>()

// Convert object to a consistent string key
function serializeKey(key: Record<string, any>): string {
  return JSON.stringify(key, Object.keys(key).sort())
}

// TODO: improve props auto-infer
export function componentToString<P>(config: ChartConfig, component: string | Component<P>, props?: P) {
  if (!isClient)
    return

  // https://unovis.dev/docs/auxiliary/Crosshair#component-props
  return (data: any, x: number | Date) => {
    const serializedKey = serializeKey(data)
    const cachedContent = cache.get(serializedKey)
    if (cachedContent)
      return cachedContent

    const vnode = h<any>(component, { ...props, payload: data, config, x })
    const div = document.createElement('div')
    render(vnode, div)
    cache.set(serializedKey, div.innerHTML)
    return div.innerHTML
  }
}
