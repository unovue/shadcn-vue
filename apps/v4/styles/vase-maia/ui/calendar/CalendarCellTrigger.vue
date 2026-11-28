<script lang="ts" setup>
import type { CalendarDayButtonProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'
import { buttonVariants } from '@/styles/vase-maia/ui/button'

interface Props extends /* @vue-ignore */ CalendarDayButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.DayButton
    data-slot="calendar-cell-trigger"
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      // The button style has a transparent border and a clipped background. The accent of the cell then shows around a selected day.
      'size-8 border-0 p-0 font-normal cursor-default',
      '[&[aria-current=date]:not([data-selected])]:bg-accent [&[aria-current=date]:not([data-selected])]:text-accent-foreground',
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
      'disabled:text-muted-foreground disabled:opacity-50',
      'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
      'data-[outside-month]:text-muted-foreground',
      props.class,
    )"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Calendar.DayButton>
</template>
