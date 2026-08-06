<script setup lang="ts">
import type { TypesetCommand, TypesetSearchParams } from '@/lib/typeset/params'
import { useEventListener } from '@vueuse/core'
import {
  serializeTypesetSearchParams,
  TYPESET_COMMAND_MESSAGE,
  TYPESET_PARAMS_MESSAGE,
  TYPESET_READY_MESSAGE,
} from '@/lib/typeset/params'

const params = useTypesetSearchParams()
const { override } = useTypesetPreviewOverride()
const { shuffle, reset } = useTypesetShuffle()
const { goBack, goForward } = useTypesetHistory()
const { toggleTheme } = useTypesetThemeToggle({ shortcut: false })

const iframeRef = ref<HTMLIFrameElement | null>(null)

// Hover previews overlay the committed params without touching the URL —
// clearing the override re-sends the committed params, reverting the preview.
// Overrides never contain `item`, so the reload branch below is only ever
// driven by committed changes.
const mergedParams = computed<TypesetSearchParams>(() => ({
  ...params.toValues(),
  ...(override.value ?? {}),
}))

// Deliberately NOT a computed over mergedParams. The URL only seeds the
// iframe's first paint; every later change rides the postMessage channel
// below. Recomputing it per param would rewrite `src` and navigate the iframe
// on every pick — and on every hover preview.
//
// `item` is the exception: it picks a different specimen route, so it needs a
// real navigation. The watch re-seeds the URL and the matching `key` remounts
// the iframe onto it.
// Seeded from the committed params, never the merged ones: a hover preview is
// uncommitted by definition and must not be baked into a real navigation.
function buildPreviewUrl() {
  return serializeTypesetSearchParams(
    `/preview/typeset/${params.item.value}`,
    params.toValues(),
  )
}

const previewUrl = ref(buildPreviewUrl())

watch(() => params.item.value, () => {
  previewUrl.value = buildPreviewUrl()
})

function sendParams() {
  iframeRef.value?.contentWindow?.postMessage(
    { type: TYPESET_PARAMS_MESSAGE, data: mergedParams.value },
    window.location.origin,
  )
}

// Every param change after the initial load goes over postMessage, so the
// iframe restyles in place instead of reloading and flashing.
watch(mergedParams, () => sendParams(), { flush: 'post' })

const commands: Record<TypesetCommand, () => void> = {
  shuffle,
  reset,
  'undo': goBack,
  'redo': goForward,
  'toggle-theme': toggleTheme,
}

// The iframe forwards its keyboard shortcuts as typed commands; handle them
// here by calling the real actions.
useEventListener(globalThis.window, 'message', (event: MessageEvent) => {
  const iframeWindow = iframeRef.value?.contentWindow
  if (
    !iframeWindow
    || event.origin !== window.location.origin
    || event.source !== iframeWindow
    || event.data?.type !== TYPESET_COMMAND_MESSAGE
  ) {
    return
  }

  const command = event.data.command as TypesetCommand
  if (command in commands) {
    commands[command]()
  }
})

// The preview announces when its listener is live; answer with the current
// design. `load` alone is not enough — it fires before the iframe hydrates.
useEventListener(globalThis.window, 'message', (event: MessageEvent) => {
  if (
    event.origin === window.location.origin
    && event.source === iframeRef.value?.contentWindow
    && event.data?.type === TYPESET_READY_MESSAGE
  ) {
    sendParams()
  }
})
</script>

<template>
  <div class="relative isolate flex size-full min-h-0 flex-1 overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10">
    <iframe
      ref="iframeRef"
      :key="params.item.value"
      :src="previewUrl"
      title="typeset preview"
      class="size-full"
      @load="sendParams"
    />
    <TypesetToolbar />
  </div>
</template>
