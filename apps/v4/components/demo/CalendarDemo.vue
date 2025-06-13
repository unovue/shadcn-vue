<script setup lang="ts">
import { CalendarDate, type DateValue, fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'
import { RangeCalendar } from '@/registry/new-york-v4/ui/range-calendar'

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>

const dateRange = ref({
  start: new CalendarDate(new Date().getFullYear(), 0, 12),
  end: new CalendarDate(new Date().getFullYear(), 0, 12).add({ days: 30 }),
}) as Ref<{ start: DateValue, end: DateValue }>

const range = ref({
  start: new CalendarDate(new Date().getFullYear(), 0, 12),
  end: new CalendarDate(new Date().getFullYear(), 0, 12).add({ days: 50 }),
}) as Ref<{ start: DateValue, end: DateValue }>
</script>

<template>
  <div class="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
    <Calendar
      v-model="date"
      class="rounded-md border shadow-sm"
    />

    <RangeCalendar
      v-model="dateRange"
      class="rounded-md border shadow-sm"
      :number-of-months="2"
      :max-value="fromDate(new Date(), getLocalTimeZone())"
    />

    <RangeCalendar
      v-model="range"
      class="hidden rounded-md border shadow-sm @4xl:block"
      :number-of-months="3"
    />
  </div>
</template>
