<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperRootEmits, StepperRootProps } from 'radix-vue'
import { StepperRoot, useForwardPropsEmits } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<StepperRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<StepperRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <StepperRoot
    :class="cn(
      'flex gap-1 p-0.5',
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot />
  </StepperRoot>
</template>
