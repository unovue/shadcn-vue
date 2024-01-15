<script lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { ToggleGroupItemProps } from 'radix-vue'
</script>

<script setup lang="ts">
import { type HTMLAttributes, computed, inject } from 'vue'
import { ToggleGroupItem, useForwardProps } from 'radix-vue'
import { toggleVariants } from '@/lib/registry/default/ui/toggle'
import { cn } from '@/lib/utils'

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

const forwardedProps = useForwardProps(delegatedProps.value)
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
