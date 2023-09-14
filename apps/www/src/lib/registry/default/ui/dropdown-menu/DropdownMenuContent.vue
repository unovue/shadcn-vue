<script setup lang="ts">
import {
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: string }>(),
  {
    sideOffset: 4,
  },
)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :loop="props.loop"
      :as-child="props.asChild"
      :side-offset="props.sideOffset"
      :side="props.side"
      :align="props.align"
      :align-offset="props.alignOffset"
      :class="[
        cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        ),
      ]"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
