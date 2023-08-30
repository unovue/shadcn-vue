<script setup lang="ts">
import {
  MenubarCheckboxItem,
  type MenubarCheckboxItemEmits,
  type MenubarCheckboxItemProps,
  MenubarItemIndicator,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import RadixIconsCheck from '~icons/radix-icons/check'

const props = defineProps<MenubarCheckboxItemProps & { class?: string }>()

const emit = defineEmits<MenubarCheckboxItemEmits>()
</script>

<template>
  <MenubarCheckboxItem
    v-bind="props"
    :class="[
      cn(
        'flex relative items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover pl-7 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
    @update:checked="emit('update:checked', $event)"
    @select="emit('select', $event)"
  >
    <MenubarItemIndicator
      class="absolute left-2 inline-flex w-3.5 h-3.5 items-center justify-center"
    >
      <RadixIconsCheck class="text-foreground" />
    </MenubarItemIndicator>
    <slot />
  </MenubarCheckboxItem>
</template>
