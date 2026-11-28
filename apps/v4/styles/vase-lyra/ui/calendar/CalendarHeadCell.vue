<script lang="ts" setup>
import type { CalendarWeekdayProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CalendarWeekdayProps {
  class?: HTMLAttributes['class']
  weekday: CalendarWeekdayProps['weekday']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Weekday
    :weekday="weekday"
    format="narrow"
    data-slot="calendar-head-cell"
    :class="cn('text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]', props.class)"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Calendar.Weekday>
</template>
