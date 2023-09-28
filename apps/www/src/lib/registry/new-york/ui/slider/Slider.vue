<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'radix-vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useEmitAsProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()
</script>

<template>
  <SliderRoot
    :class="cn(
      'relative flex w-full touch-none select-none items-center',
      $attrs.class ?? '',
    )"
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <SliderThumb class="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>
