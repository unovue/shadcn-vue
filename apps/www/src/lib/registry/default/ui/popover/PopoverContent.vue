<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentProps,
  PopoverPortal,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: string }>(),
  {
    sideOffset: 4,
  },
)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="props"
      :class="
        cn(
          'z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-border bg-background shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
