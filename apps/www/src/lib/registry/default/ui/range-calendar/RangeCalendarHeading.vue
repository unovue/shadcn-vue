<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-sm font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot v-bind:heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>
