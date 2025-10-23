<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar
    v-model="date"
    class="rounded-md border shadow-sm"
    :number-of-months="2"
    disable-days-outside-current-view
  />
</template>
