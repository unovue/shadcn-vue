<script setup lang="ts">
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuItemProps & { class?: string }>()

const emits = defineEmits<ContextMenuItemEmits>()
</script>

<template>
  <ContextMenuItem
    v-bind="props"
    :class="[
      cn(
        'flex items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none focus:bg-outline-hover px-2 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
    @select="emits('select', $event)"
  >
    <slot />
  </ContextMenuItem>
</template>
