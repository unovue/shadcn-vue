<script setup lang="ts">
import type { ScrollAreaRootProps } from "@vase-ui/vue/scroll-area"
import type { HTMLAttributes } from "vue"
import { ScrollArea as VaseScrollArea } from "@vase-ui/vue/scroll-area"
import { cn } from "cn"
import ScrollBar from "./ScrollBar.vue"

interface Props extends /* @vue-ignore */ ScrollAreaRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <VaseScrollArea.Root
    data-slot="scroll-area"
    :class="cn('cn-scroll-area relative', props.class)"
  >
    <VaseScrollArea.Viewport
      data-slot="scroll-area-viewport"
      class="cn-scroll-area-viewport size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
    >
      <VaseScrollArea.Content>
        <slot />
      </VaseScrollArea.Content>
    </VaseScrollArea.Viewport>
    <ScrollBar />
    <VaseScrollArea.Corner />
  </VaseScrollArea.Root>
</template>
