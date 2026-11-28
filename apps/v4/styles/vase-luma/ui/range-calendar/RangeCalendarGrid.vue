<script lang="ts" setup>
import type { CalendarGridProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CalendarGridProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Grid
    data-slot="range-calendar-grid"
    :class="cn('w-full border-collapse space-x-1', props.class)"
  >
    <slot />
  </Calendar.Grid>
</template>
