<script setup lang="ts">
import {
  MenubarContent,
  type MenubarContentProps,
  MenubarPortal,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<MenubarContentProps & { class?: string }>(),
  {
    align: 'start',
    alignOffset: -4,
    sideOffset: 8,
  },
)
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      :loop="props.loop"
      :as-child="props.asChild"
      :side-offset="props.sideOffset"
      :side="props.side"
      :align="props.align"
      :align-offset="props.alignOffset"
      :class="
        cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
