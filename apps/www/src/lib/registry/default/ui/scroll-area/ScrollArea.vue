<script setup lang="ts">
import {
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarProps,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & ScrollAreaScrollbarProps & { class?: string }
  >(),
  {
    class: '',
    orientation: 'vertical',
  },
)
</script>

<template>
  <ScrollAreaRoot :type="type" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="h-full w-full rounded">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      :orientation="orientation"
      class="flex touch-none select-none transition-colors"
      :class="[
        props.orientation === 'vertical'
          ? 'h-full w-2.5 border-l border-l-transparent p-[1px]'
          : 'h-2.5 border-t border-t-transparent p-[1px]',
      ]"
    >
      <ScrollAreaThumb class="relative flex-1 rounded-full bg-secondary" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
