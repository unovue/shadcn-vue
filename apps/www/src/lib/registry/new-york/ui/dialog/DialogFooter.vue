<script setup lang="ts">
import { cn } from '@/lib/utils'

interface DialogFooterProps {
  class?: string
}

const props = defineProps<DialogFooterProps>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col space-y-2 sm:space-y-0 mt-1.5 sm:flex-row sm:justify-end sm:space-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
