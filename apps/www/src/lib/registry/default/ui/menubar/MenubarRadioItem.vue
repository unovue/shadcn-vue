<script setup lang="ts">
import {
  MenubarItemIndicator,
  MenubarRadioItem,
  type MenubarRadioItemEmits,
  type MenubarRadioItemProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import RiCheckboxBlankCircleFill from '~icons/ri/checkbox-blank-circle-fill'

const props = defineProps<MenubarRadioItemProps & { class?: string }>()

const emits = defineEmits<MenubarRadioItemEmits>()
</script>

<template>
  <MenubarRadioItem
    v-bind="props"
    :class="[
      cn(
        'flex items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none focus:bg-outline-hover px-2 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
    @select="emits('select', $event)"
  >
    <MenubarItemIndicator
      class="absolute left-3.5 inline-flex w-2 h-2 items-center justify-center"
    >
      <RiCheckboxBlankCircleFill class="text-foreground" />
    </MenubarItemIndicator>
    <span class="pl-6">
      <slot />
    </span>
  </MenubarRadioItem>
</template>
