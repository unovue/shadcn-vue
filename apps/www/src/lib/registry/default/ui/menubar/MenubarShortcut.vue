<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('text-xxs ml-auto tracking-widest opacity-50', props.class)">
    <slot />
  </span>
</template>
