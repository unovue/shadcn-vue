<script setup lang="ts">
import type { SelectScrollUpButtonProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronUpIcon } from '@radix-icons/vue'
import { SelectScrollUpButton, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn('flex cursor-default items-center justify-center py-1', props.class)">
    <slot>
      <ChevronUpIcon />
    </slot>
  </SelectScrollUpButton>
</template>
