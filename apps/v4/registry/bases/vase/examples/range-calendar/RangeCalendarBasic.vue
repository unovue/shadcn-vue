<script setup lang="ts">
import type { RangeCalendarRootValue } from "@vase-ui/vue/range-calendar"
import { ref } from "vue"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { RangeCalendar } from "@/registry/bases/vase/ui/range-calendar"
import { Example } from "~/registry/bases/vase/components/example"

installTemporal()

const range = ref<RangeCalendarRootValue>([
  new Temporal.PlainDate(new Date().getFullYear(), 1, 1),
  new Temporal.PlainDate(new Date().getFullYear(), 1, 7),
])
</script>

<template>
  <Example title="Basic Range Calendar">
    <RangeCalendar v-model="range" />
  </Example>
</template>
