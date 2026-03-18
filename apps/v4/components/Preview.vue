<script setup lang="ts">
import type { SplitterPanel } from 'reka-ui'
import type { DesignSystemSearchParams } from '@/composables/useDesignSystemSearchParams'
import { useEventListener } from '@vueuse/core'
import { sendToIframe } from '@/composables/useIframeMessageListener'
import { Badge } from '@/registry/new-york-v4/ui/badge'

// Message types for keyboard shortcut forwarding from iframe
const CMD_K_FORWARD_TYPE = 'cmd-k-forward'
const RANDOMIZE_FORWARD_TYPE = 'randomize-forward'
const DARK_MODE_FORWARD_TYPE = 'dark-mode-forward'

const params = useDesignSystemSearchParams()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const resizablePanelRef = ref<InstanceType<typeof SplitterPanel> | null>(null)

const iframeKey = ref(0)

watch(params.size, () => {
  resizablePanelRef.value?.resize(params.size.value)
})

watch(() => params, () => {
  const iframe = iframeRef.value
  if (!iframe) {
    return
  }

  const sendParams = () => {
    const rawParams = Object.fromEntries(
      Object.entries(toRaw(params)).map(([key, value]) => [key, unref(value)]),
    ) as DesignSystemSearchParams
    sendToIframe(iframe, 'design-system-params', rawParams)
  }

  if (iframe.contentWindow) {
    sendParams()
  }

  iframe.addEventListener('load', sendParams)
  onWatcherCleanup(() => {
    iframe.removeEventListener('load', sendParams)
  })
}, { deep: true })

function handleMessage(event: MessageEvent) {
  if (event.data.type === CMD_K_FORWARD_TYPE) {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
    const key = event.data.key || 'k'

    const syntheticEvent = new KeyboardEvent('keydown', {
      key,
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(syntheticEvent)
  }

  if (event.data.type === RANDOMIZE_FORWARD_TYPE) {
    const key = event.data.key || 'r'

    const syntheticEvent = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(syntheticEvent)
  }

  if (event.data.type === DARK_MODE_FORWARD_TYPE) {
    const key = event.data.key || 'd'

    const syntheticEvent = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(syntheticEvent)
  }
}

useEventListener(globalThis.window, 'message', handleMessage)

const route = useRoute()
const initialParams = `?theme=${params.theme.value ?? 'neutral'}&iconLibrary=${params.iconLibrary.value ?? 'lucide'}&style=${params.style.value ?? 'vega'}&font=${params.font.value ?? 'inter'}&baseColor=${params.baseColor.value ?? 'neutral'}`
const iframeSrc = computed(() => {
  const item = typeof route.query.item === 'string' ? route.query.item : params.item.value
  return `/preview/${params.base.value}/${item}${initialParams}`
})
</script>

<template>
  <div class="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
    <div class="ring-foreground/15 3xl:max-h-[1200px] 3xl:max-w-[1800px] relative -z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl ring-1">
      <div class="bg-muted dark:bg-muted/30 absolute inset-0 rounded-2xl" />
      <iframe
        ref="iframeRef"
        :key="typeof route.query.item === 'string' ? route.query.item : params.item.value"
        :src="iframeSrc"
        class="z-10 size-full flex-1"
        title="Preview"
      />
      <Badge
        class="absolute right-2 bottom-2 isolate z-10"
        variant="secondary"
      >
        Preview
      </Badge>
    </div>
  </div>
</template>
