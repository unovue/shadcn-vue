<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />
</template>
