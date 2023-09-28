<script setup lang="ts">
import {
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardPortal,
  useForwardProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<HoverCardContentProps & { class?: string }>(),
  {
    sideOffset: 4,
  },
)

const forwarded = useForwardProps(props)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="forwarded"
      :class="
        cn(
          'z-50 w-64 rounded-md bg-background border border-border p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
