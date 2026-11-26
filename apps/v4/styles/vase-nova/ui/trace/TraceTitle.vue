<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="trace-title"
    :class="cn('min-w-0 truncate motion-reduce:shimmer-none', props.class)"
  >
    <slot />
  </span>
</template>
