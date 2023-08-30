<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <h3
    :class="
      cn('text-2xl font-semibold leading-none tracking-tighter', props.class)
    "
  >
    <slot />
  </h3>
</template>
