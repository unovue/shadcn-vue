<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('text-foreground max-w-3xl text-base text-balance sm:text-lg', props.class)">
    <slot />
  </p>
</template>
