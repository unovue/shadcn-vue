<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperSeparatorProps } from 'radix-vue'
import { StepperSeparator, useForwardProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="cn(
      'w-full h-[1px] bg-border',
      // Disabled
      'group-data-[disabled]:bg-muted-foreground group-data-[disabled]:opacity-50',
      // Completed
      'group-data-[state=completed]:bg-accent',
      props.class,
    )"
  />
</template>
