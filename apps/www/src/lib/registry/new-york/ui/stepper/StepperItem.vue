<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperItemProps } from 'radix-vue'
import { StepperItem, useForwardProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<StepperItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperItem
    v-bind="forwarded"
    :class="cn('flex items-center gap-1 cursor-pointer group data-[disabled]:pointer-events-none', props.class)"
  >
    <slot />
  </StepperItem>
</template>
