<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="trace-icon"
    aria-hidden="true"
    :class="cn('size-4 [&_svg:not([class*=\'size-\'])]:size-4 [[data-slot=trace-title]~&]:-ml-1 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </span>
</template>
