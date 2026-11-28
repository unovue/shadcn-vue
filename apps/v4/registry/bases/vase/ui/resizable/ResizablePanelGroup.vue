<script setup lang="ts">
import type { ResizableRootEmits, ResizableRootProps } from "@vase-ui/vue/resizable"
import type { HTMLAttributes } from "vue"
import { Resizable } from "@vase-ui/vue/resizable"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ResizableRootProps {
  class?: HTMLAttributes["class"]
  direction?: ResizableRootProps["orientation"]
}
interface Emits extends /* @vue-ignore */ ResizableRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Resizable.Root
    data-slot="resizable-panel-group"
    v-bind="direction !== undefined ? { orientation: direction } : undefined"
    :class="cn('cn-resizable-panel-group flex h-full w-full data-[orientation=vertical]:flex-col', props.class)"
  >
    <slot />
  </Resizable.Root>
</template>
