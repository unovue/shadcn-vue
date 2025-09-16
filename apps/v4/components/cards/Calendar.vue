<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, fromDate, getLocalTimeZone } from '@internationalized/date'
import { Card, CardContent } from '@/registry/new-york-v4/ui/card'
import { RangeCalendar } from '@/registry/new-york-v4/ui/range-calendar'

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>

const dateRange = ref({
  start: new CalendarDate(new Date().getFullYear(), 5, 5),
  end: new CalendarDate(new Date().getFullYear(), 5, 5).add({ days: 8 }),
}) as Ref<{ start: DateValue, end: DateValue }>
</script>

<template>
  <Card class="hidden max-w-[260px] p-0 sm:flex">
    <CardContent class="p-0">
      <RangeCalendar
        v-model="dateRange"
        :max-value="fromDate(new Date(), getLocalTimeZone())"
      />
    </CardContent>
  </Card>
</template>
