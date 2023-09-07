<script setup lang="ts">
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
} from 'radix-vue'
import RadixIconsChevronRight from '~icons/radix-icons/chevron-right'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: string }>()
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="props"
    :class="[
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        props.class,
      ),
    ]"
  >
    <slot />
    <RadixIconsChevronRight class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
