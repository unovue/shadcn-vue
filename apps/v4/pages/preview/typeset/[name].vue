<script setup lang="ts">
import type { FixtureName } from '@/lib/typeset/fixtures'
import { useEventListener } from '@vueuse/core'
import { AVAILABLE_CONTENT_OPTIONS, FIXTURES } from '@/lib/typeset/fixtures'
import { CHAT_QUESTION } from '@/lib/typeset/fixtures/chat'
import { findTypesetFont } from '@/lib/typeset/fonts'
import { isEditableTarget } from '@/lib/typeset/keyboard'
import {
  TYPESET_COMMAND_MESSAGE,
  TYPESET_MEASURES,
} from '@/lib/typeset/params'

definePageMeta({
  layout: 'blank',
  // Nuxt re-runs `validate` on every param change. Checking in setup instead
  // would only cover the first render: Vue Router reuses this component when
  // just `[name]` changes, so navigating on to an unknown specimen would render
  // `undefined` rather than 404.
  validate(route) {
    return AVAILABLE_CONTENT_OPTIONS.some(
      option => option.value === route.params.name,
    )
  },
})

const route = useRoute()
// Seeded from the URL, then driven by the designer over postMessage — see the
// composable for why this deliberately never writes back to the router.
const params = useTypesetPreviewParams()
const { loadFont } = useFontLoader()

const name = computed(() => route.params.name as FixtureName)

const bodyFont = computed(() => findTypesetFont(params.body))
const headingFont = computed(() =>
  params.heading === 'inherit'
    ? bodyFont.value
    : findTypesetFont(params.heading),
)
const monoFont = computed(() => findTypesetFont(params.mono))

const measureWidth = computed(
  () => TYPESET_MEASURES.find(option => option.value === params.measure)?.width,
)

// Fire-and-forget: resolve + inject the @font-face rules on demand (deduped).
watchEffect(() => {
  for (const font of [bodyFont.value, headingFont.value, monoFont.value]) {
    if (font) {
      loadFont(font.family)
    }
  }
})

// Set through typeset's own custom properties — the exact API the docs hand to
// users — rather than a private preview indirection. Inline styles win over the
// defaults typeset.css declares in @layer components.
const typesetStyle = computed(() => ({
  '--typeset-font-body': bodyFont.value?.value,
  '--typeset-font-heading': headingFont.value?.value,
  '--typeset-font-mono': monoFont.value?.value,
  '--typeset-size': `${params.scale}px`,
  '--typeset-leading': params.leading,
  '--typeset-flow': params.flow,
}))

const html = computed(() => FIXTURES[name.value])

// Shortcuts pressed inside the iframe belong to the designer around it: forward
// them as typed commands and let the parent run the real action.
function forwardCommand(command: string) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(
      { type: TYPESET_COMMAND_MESSAGE, command },
      window.location.origin,
    )
  }
}

useEventListener(globalThis.document, 'keydown', (event: KeyboardEvent) => {
  if (isEditableTarget(event.target)) {
    return
  }

  if (event.metaKey || event.ctrlKey) {
    const key = event.key.toLowerCase()
    if ((key === 'z' && event.shiftKey) || (key === 'y' && event.ctrlKey)) {
      event.preventDefault()
      forwardCommand('redo')
    }
    else if (key === 'z') {
      event.preventDefault()
      forwardCommand('undo')
    }
    return
  }

  if (event.altKey) {
    return
  }

  if (event.key === 'r' || event.key === 'R') {
    event.preventDefault()
    forwardCommand(event.shiftKey ? 'reset' : 'shuffle')
  }
  else if (event.key === 'd' || event.key === 'D') {
    event.preventDefault()
    forwardCommand('toggle-theme')
  }
})
</script>

<template>
  <div
    class="flex min-h-svh justify-center px-6 pt-8 pb-24 md:pt-24 md:pb-32"
    :style="{ fontFamily: bodyFont?.value }"
  >
    <div class="w-full" :style="{ maxWidth: measureWidth }">
      <!-- The user bubble is page chrome: it sits outside the typeset
           container on purpose, so only the answer is styled. -->
      <div v-if="name === 'chat'" class="flex w-full flex-col gap-10">
        <div class="ml-auto w-fit max-w-[65%] rounded-3xl bg-muted px-4 py-2.5">
          {{ CHAT_QUESTION }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -- static, first-party fixture -->
        <div class="typeset w-full" :style="typesetStyle" v-html="html" />
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -- static, first-party fixture -->
      <div v-else class="typeset w-full" :style="typesetStyle" v-html="html" />
    </div>
  </div>
</template>

<style>
/* typeset.css itself is imported globally from assets/css/main.css — see the
   comment there for why the layer order forces that. */
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  display: none;
}
</style>
