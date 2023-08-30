<script setup lang="ts">
import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicator,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import RadixIconsCheck from '~icons/radix-icons/check'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: string }>()

const emits = defineEmits<DropdownMenuCheckboxItemEmits>()
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="props"
    :class="[
      cn(
        'flex relative items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover pl-7 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
    @update:checked="emits('update:checked', $event)"
    @select="emits('select', $event)"
  >
    <DropdownMenuItemIndicator
      class="absolute left-1.5 inline-flex w-4 h-4 items-center justify-center"
    >
      <RadixIconsCheck />
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
