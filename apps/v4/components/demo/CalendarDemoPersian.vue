<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { fromDate, getLocalTimeZone, PersianCalendar, toCalendar } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(toCalendar(fromDate(new Date(), getLocalTimeZone()), new PersianCalendar())) as Ref<DateValue>
</script>

<template>
  <Calendar
    v-model="date"
    locale="fa-IR"
    class="rounded-md border shadow-sm"
    dir="rtl"
  />
</template>
