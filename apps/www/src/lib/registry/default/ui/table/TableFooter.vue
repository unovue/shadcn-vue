<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tfoot :class="cn('bg-primary font-medium text-primary-foreground', props.class)">
    <slot />
  </tfoot>
</template>
