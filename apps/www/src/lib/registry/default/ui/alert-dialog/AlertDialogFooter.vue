<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col space-y-2 sm:space-y-0 mt-3.5 sm:flex-row sm:justify-end sm:space-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
