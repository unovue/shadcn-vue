<script lang="ts" setup>
import type { CalendarGridHeaderRowProps, CalendarWeekProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CalendarGridHeaderRowProps {
  class?: HTMLAttributes['class']
  week?: CalendarWeekProps['week']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Week
    v-if="week"
    :week="week"
    data-slot="range-calendar-grid-row"
    :class="cn('flex', props.class)"
  >
    <slot />
    <template v-if="$slots.day" #day="slotProps">
      <slot name="day" v-bind="slotProps" />
    </template>
  </Calendar.Week>
  <Calendar.GridHeaderRow
    v-else
    data-slot="range-calendar-grid-row"
    :class="cn('flex', props.class)"
  >
    <slot />
    <template v-if="$slots.weekday" #weekday="slotProps">
      <slot name="weekday" v-bind="slotProps" />
    </template>
  </Calendar.GridHeaderRow>
</template>
