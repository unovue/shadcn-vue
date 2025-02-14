<script lang="ts" setup>
import type { RangeCalendarHeadCellProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { RangeCalendarHeadCell, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<RangeCalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeadCell :class="cn('w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarHeadCell>
</template>
