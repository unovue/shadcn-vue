<script setup lang="ts">
import type { DateRange } from "reka-ui"
import type { Ref } from "vue"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ref } from "vue"
import { RangeCalendar } from "@/registry/default/ui/range-calendar"

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })

const value = ref({
  start,
  end,
}) as Ref<DateRange>
</script>

<template>
  <RangeCalendar v-model="value" class="rounded-md border" />
</template>
