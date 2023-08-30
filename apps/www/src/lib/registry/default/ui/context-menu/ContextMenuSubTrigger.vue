<script setup lang="ts">
import {
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuSubTriggerProps & { class?: string }>()
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="props"
    :class="[
      cn(
        'flex items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover px-2 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
  >
    <slot />
  </ContextMenuSubTrigger>
</template>
