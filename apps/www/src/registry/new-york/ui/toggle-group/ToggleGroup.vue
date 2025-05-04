<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/registry/new-york/ui/toggle'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui'
import { type HTMLAttributes, provide } from 'vue'
import { cn } from '@/lib/utils'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

provide('toggleGroup', {
  variant: props.variant,
  size: props.size,
})

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot v-slot="slotProps" v-bind="forwarded" :class="cn('flex items-center justify-center gap-1', props.class)">
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
