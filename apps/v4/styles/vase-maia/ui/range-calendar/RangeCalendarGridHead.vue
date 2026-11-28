<script lang="ts" setup>
import type { CalendarGridHeaderProps } from '@vase-ui/vue/calendar'
import { Calendar } from '@vase-ui/vue/calendar'

interface Props extends /* @vue-ignore */ CalendarGridHeaderProps {}

defineProps<Props>()
</script>

<template>
  <Calendar.GridHeader data-slot="range-calendar-grid-head">
    <slot />
  </Calendar.GridHeader>
</template>
