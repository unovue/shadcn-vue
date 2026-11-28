<script setup lang="ts">
import type { RangeCalendarRootValue } from '@vase-ui/vue/range-calendar'
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { RangeCalendar } from '@/styles/vase-vega/ui/range-calendar'

installTemporal()

const start = Temporal.Now.plainDateISO()
const end = start.add({ days: 7 })

const dateRange = ref<RangeCalendarRootValue>([start, end])
</script>

<template>
  <RangeCalendar
    v-model="dateRange"
    class="rounded-md border shadow-sm"
    :number-of-months="2"
    :show-outside-days="false"
  />
</template>
