<script setup lang="ts">
import type { SplitterPanel } from 'reka-ui'
import type { DesignSystemSearchParams } from '@/composables/useDesignSystemSearchParams'
import { useEventListener } from '@vueuse/core'
import { sendToIframe } from '@/composables/useIframeMessageListener'

// Message types for keyboard shortcut forwarding from iframe
const CMD_K_FORWARD_TYPE = 'cmd-k-forward'
const RANDOMIZE_FORWARD_TYPE = 'randomize-forward'
const DARK_MODE_FORWARD_TYPE = 'dark-mode-forward'

const params = useDesignSystemSearchParams()
const colorMode = useColorMode()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const resizablePanelRef = ref<InstanceType<typeof SplitterPanel> | null>(null)

const iframeKey = ref(0)

watch(params.size, () => {
  resizablePanelRef.value?.resize(params.size.value)
})

watch(() => colorMode.value, (mode) => {
  const iframe = iframeRef.value
  if (!iframe?.contentWindow) {
    return
  }
  sendToIframe(iframe, 'color-mode-sync', { colorMode: mode })
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
    sendToIframe(iframe, 'color-mode-sync', { colorMode: colorMode.value })
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
const initialParams = `?theme=${params.theme.value ?? 'blue'}&iconLibrary=${params.iconLibrary.value ?? 'hugeicons'}&style=${params.style.value ?? 'luma'}&font=${params.font.value ?? 'geist'}&baseColor=${params.baseColor.value ?? 'neutral'}&chartColor=${params.chartColor.value ?? 'emerald'}&radius=${params.radius.value ?? 'default'}&menuAccent=${params.menuAccent.value ?? 'subtle'}&menuColor=${params.menuColor.value ?? 'inverted-translucent'}`
const iframeSrc = computed(() => {
  const item = typeof route.query.item === 'string' ? route.query.item : params.item.value
  return `/preview/${params.base.value}/${item}${initialParams}`
})
</script>

<template>
  <div class="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10">
    <div class="relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden">
      <div class="absolute inset-0 bg-muted dark:bg-muted/30" />
      <iframe
        ref="iframeRef"
        :key="typeof route.query.item === 'string' ? route.query.item : params.item.value"
        :src="iframeSrc"
        class="z-10 size-full flex-1"
        title="Preview"
      />
      <PreviewSwitcher />
    </div>
  </div>
</template>
