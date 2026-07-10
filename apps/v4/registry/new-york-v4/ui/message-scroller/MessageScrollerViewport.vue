<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onBeforeUnmount, onMounted, watch } from "vue"
import { cn } from "@/lib/utils"
import { SCROLL_KEYS, useMessageScrollerContext } from "./useMessageScroller"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  preserveScrollOnPrepend?: boolean
}>(), {
  preserveScrollOnPrepend: true,
})

const {
  handleResize,
  preserveScrollOnPrependRef,
  setViewportElement,
  syncAfterScroll,
  userScrollIntent,
  viewportRef,
} = useMessageScrollerContext()

preserveScrollOnPrependRef.current = props.preserveScrollOnPrepend
watch(() => props.preserveScrollOnPrepend, (value) => {
  preserveScrollOnPrependRef.current = value
})

function onScroll() {
  syncAfterScroll()
}

function onWheel() {
  userScrollIntent()
}

function onTouchMove() {
  userScrollIntent()
}

function onKeyDown(event: KeyboardEvent) {
  if (SCROLL_KEYS.has(event.key))
    userScrollIntent()
}

let resizeObserver: ResizeObserver | null = null
let resizeFrame = 0

onMounted(() => {
  const viewport = viewportRef.current
  if (!viewport || typeof ResizeObserver === "undefined")
    return
  resizeObserver = new ResizeObserver(() => {
    window.cancelAnimationFrame(resizeFrame)
    resizeFrame = window.requestAnimationFrame(handleResize)
  })
  resizeObserver.observe(viewport)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(resizeFrame)
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <div
    :ref="(el) => setViewportElement(el as HTMLElement | null)"
    data-slot="message-scroller-viewport"
    role="region"
    aria-label="Messages"
    :tabindex="0"
    :class="cn(
      'size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none',
      props.class,
    )"
    @scroll="onScroll"
    @wheel="onWheel"
    @touchmove="onTouchMove"
    @keydown="onKeyDown"
  >
    <slot />
  </div>
</template>
