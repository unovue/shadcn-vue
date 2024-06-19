<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex items-center h-9 rounded-md border border-input bg-transparent py-1 shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:opacity-50', props.class)">
    <slot />
  </div>
</template>
