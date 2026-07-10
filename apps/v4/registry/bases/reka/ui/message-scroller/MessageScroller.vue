<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useMessageScrollerContext } from "./useMessageScroller"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { setRootElement } = useMessageScrollerContext()
</script>

<template>
  <div
    :ref="(el) => setRootElement(el as HTMLElement | null)"
    data-slot="message-scroller"
    :class="cn(
      'group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
