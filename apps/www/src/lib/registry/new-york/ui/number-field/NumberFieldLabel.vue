<script setup lang="ts">
import type { NumberFieldLabelProps } from 'radix-vue'
import { NumberFieldLabel, useForwardProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldLabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldLabel v-bind="forwarded" :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)">
    <slot />
  </NumberFieldLabel>
</template>
