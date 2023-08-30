<script setup lang="ts">
import { ContextMenuLabel, type ContextMenuLabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuLabelProps & { class?: string; inset?: boolean }>()
</script>

<template>
  <ContextMenuLabel
    v-bind="props"
    :class="
      cn('px-2 py-1.5 text-sm font-semibold text-foreground',
         inset && 'pl-8', props.class ?? '',
      )"
  >
    <slot />
  </ContextMenuLabel>
</template>
