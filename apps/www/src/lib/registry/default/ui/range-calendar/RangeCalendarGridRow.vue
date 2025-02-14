<script lang="ts" setup>
import type { RangeCalendarGridRowProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { RangeCalendarGridRow, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<RangeCalendarGridRowProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarGridRow :class="cn('flex mt-2 w-full', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarGridRow>
</template>
