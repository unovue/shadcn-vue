<script setup lang="ts">
import { type DateValue, fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar
    v-model="date"
    class="rounded-md border shadow-sm"
  />
</template>
