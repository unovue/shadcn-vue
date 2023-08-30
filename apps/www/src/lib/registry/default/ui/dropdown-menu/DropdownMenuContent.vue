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
    sideOffset: 6,
  },
)
</script>

<template>
  <DropdownMenuPortal force-mount>
    <DropdownMenuContent
      :loop="props.loop"
      :as-child="props.asChild"
      :side-offset="props.sideOffset"
      :side="props.side"
      :align="props.align"
      :align-offset="props.alignOffset"
      :class="[
        cn(
          'bg-background focus:outline-none outline-none border border-border p-1 z-50 min-w-[8rem] rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        ),
      ]"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
