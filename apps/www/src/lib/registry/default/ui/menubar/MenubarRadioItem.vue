<script setup lang="ts">
import {
  MenubarItemIndicator,
  MenubarRadioItem,
  type MenubarRadioItemEmits,
  type MenubarRadioItemProps,
} from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarRadioItemProps & { class?: string }>()

const emits = defineEmits<MenubarRadioItemEmits>()
</script>

<template>
  <MenubarRadioItem
    v-bind="props"
    :class="[
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      ),
    ]"
    @select="emits('select', $event)"
  >
    <MenubarItemIndicator
      class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
    >
      <Circle class="h-2 w-2 fill-curren" />
    </MenubarItemIndicator>

    <slot />
  </MenubarRadioItem>
</template>
