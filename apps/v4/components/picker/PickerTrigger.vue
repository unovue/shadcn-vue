<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuTrigger
    data-slot="picker-trigger"
    v-bind="forwardedProps"
    :class="cn(
      'hover:bg-muted data-[state=open]:bg-muted border-foreground/10 bg-muted/50 relative w-[160px] shrink-0 touch-manipulation rounded-xl border p-2 select-none disabled:opacity-50 md:w-full md:rounded-lg md:border-transparent md:bg-transparent',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
