<script setup lang="ts">
import type { ComponentPublicInstance, HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useMessageScrollerRegister } from "./useMessageScroller"

const props = withDefaults(defineProps<{
  messageId?: string
  scrollAnchor?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  scrollAnchor: false,
})

const register = useMessageScrollerRegister()

let previous: HTMLElement | null = null

function setItemRef(el: Element | ComponentPublicInstance | null) {
  const element = el instanceof HTMLElement ? el : null
  const prev = previous
  previous = element
  if (props.messageId)
    register(props.messageId, element, prev)
}
</script>

<template>
  <div
    :ref="setItemRef"
    data-slot="message-scroller-item"
    :data-message-id="messageId"
    :data-scroll-anchor="scrollAnchor ? 'true' : 'false'"
    :class="cn(
      'min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
