<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "@vase-ui/vue/scroll-area"
import type { HTMLAttributes } from "vue"
import { ScrollArea } from "@vase-ui/vue/scroll-area"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ScrollAreaScrollbarProps {
  class?: HTMLAttributes["class"]
  orientation?: ScrollAreaScrollbarProps["orientation"]
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
})
</script>

<template>
  <ScrollArea.Scrollbar
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    :class="cn('cn-scroll-area-scrollbar flex touch-none p-px transition-colors select-none', props.class)"
  >
    <ScrollArea.Thumb
      data-slot="scroll-area-thumb"
      class="cn-scroll-area-thumb relative flex-1 bg-border"
    />
  </ScrollArea.Scrollbar>
</template>
