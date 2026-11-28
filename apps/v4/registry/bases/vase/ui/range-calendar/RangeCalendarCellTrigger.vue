<script lang="ts" setup>
import type { CalendarDayButtonProps } from "@vase-ui/vue/calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { cn } from "cn"
import { buttonVariants } from "@/registry/bases/vase/ui/button"

interface Props extends /* @vue-ignore */ CalendarDayButtonProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.DayButton
    data-slot="range-calendar-trigger"
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      // The button style has a transparent border and a clipped background. The accent of the cell then shows around a selected day.
      'h-8 w-8 border-0 p-0 font-normal data-[selected]:opacity-100',
      '[&[aria-current=date]:not([data-selected])]:bg-accent [&[aria-current=date]:not([data-selected])]:text-accent-foreground',
      'data-[range-start]:bg-primary data-[range-start]:text-primary-foreground data-[range-start]:hover:bg-primary data-[range-start]:hover:text-primary-foreground data-[range-start]:focus:bg-primary data-[range-start]:focus:text-primary-foreground',
      'data-[range-end]:bg-primary data-[range-end]:text-primary-foreground data-[range-end]:hover:bg-primary data-[range-end]:hover:text-primary-foreground data-[range-end]:focus:bg-primary data-[range-end]:focus:text-primary-foreground',
      'data-[outside-month]:text-muted-foreground',
      'disabled:text-muted-foreground disabled:opacity-50',
      'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
      props.class,
    )"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Calendar.DayButton>
</template>
