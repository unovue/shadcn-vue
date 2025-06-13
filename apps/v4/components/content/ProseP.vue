<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('leading-relaxed [&:not(:first-child)]:mt-6', props.class)">
    <slot />
  </p>
</template>
