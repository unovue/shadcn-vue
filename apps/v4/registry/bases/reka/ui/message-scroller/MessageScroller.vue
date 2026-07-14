<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useMessageScrollerContext } from "./useMessageScroller"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { autoscrolling, scrollableAttr } = useMessageScrollerContext()
</script>

<template>
  <div
    data-slot="message-scroller"
    :data-scrollable="scrollableAttr"
    :data-autoscrolling="autoscrolling ? '' : undefined"
    :class="cn(
      'group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
