<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar
    v-model="date"
    class="rounded-md border shadow-sm"
    layout="month-and-year"
  />
</template>
