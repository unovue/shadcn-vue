<script setup lang="ts">
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Calendar } from '@/styles/vase-vega/ui/calendar'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
const min = new Temporal.PlainDate(1925, 1, 1)
const max = new Temporal.PlainDate(2035, 1, 1)
</script>

<template>
  <Calendar
    v-model="date"
    class="rounded-md border shadow-sm"
    layout="month-and-year"
    :min
    :max
  />
</template>
