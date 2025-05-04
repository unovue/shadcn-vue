<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui'
import { type HTMLAttributes, inject } from 'vue'
import { cn } from '@/lib/utils'
import { toggleVariants } from '@/registry/default/ui/toggle'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()

const context = inject<ToggleGroupVariants>('toggleGroup')

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    v-bind="forwardedProps" :class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
