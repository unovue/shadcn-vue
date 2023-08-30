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
  <div
    :class="
      cn(
        'bg-background text-foreground border border-border rounded-xl shadow-md',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
