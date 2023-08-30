<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuItemProps & { class?: string }>()
</script>

<template>
  <DropdownMenuItem
    v-bind="props"
    :class="[
      cn(
        'flex items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none focus:bg-outline-hover px-2 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
  >
    <slot />
  </DropdownMenuItem>
</template>
