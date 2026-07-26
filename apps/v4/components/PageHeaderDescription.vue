<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('max-w-4xl text-base text-balance text-foreground sm:text-lg', props.class)">
    <slot />
  </p>
</template>
