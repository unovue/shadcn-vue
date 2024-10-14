<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { toggleVariants } from '@/lib/registry/default/ui/toggle'
import { cn } from '@/lib/utils'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes, inject } from 'vue'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()

const context = inject<ToggleGroupVariants>('toggleGroup')

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps" :class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
