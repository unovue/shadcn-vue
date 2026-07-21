<script lang="ts">
import type { TimeslotSegmentEmits, TimeslotSegmentProps } from "./TimeslotSegment.vue"

// internal types from "reka-ui"
export type HourCycle = 12 | 24 | undefined
export type DayPeriod = "AM" | "PM" | null

export interface TimeslotHoursProps<T extends number> extends TimeslotSegmentProps<T> {
  hourCycle?: HourCycle
}

export interface TimeslotHoursEmits<T extends number> extends TimeslotSegmentEmits<T> {}
</script>

<script setup lang="ts" generic="T extends number">
import { useForwardPropsEmits } from "reka-ui"
import TimeslotSegment from "./TimeslotSegment.vue"
import TimeslotSegmentItem from "./TimeslotSegmentItem.vue"
import TimeslotSegmentItemText from "./TimeslotSegmentItemText.vue"

const props = withDefaults(defineProps<TimeslotHoursProps<T>>(), {
  hourCycle: 24,
})

const emits = defineEmits<TimeslotHoursEmits<T>>()

const forwardedProps = computed(() => {
  const { hourCycle, ...other } = props
  return other
})

const fieldPropsEmits = useForwardPropsEmits(forwardedProps, emits)

const showDayPeriod = computed(() => {
  return props.hourCycle === 12
})

function formatItemValue(value: number) {
  return value === 0 ? 12 : value > props.hourCycle ? value - props.hourCycle : value
}

function toDayPeriod(value: number): DayPeriod {
  return value < 12 ? "AM" : "PM"
}
</script>

<template>
  <TimeslotSegment
    v-slot="{ item }"
    v-bind="fieldPropsEmits"
  >
    <TimeslotSegmentItem
      v-slot="{ value, disabled }"
      v-bind="item"
      :data-day-period.attr="showDayPeriod ? toDayPeriod(item.value) : undefined"
    >
      <TimeslotSegmentItemText
        v-bind="{
          disabled,
          value: showDayPeriod ? formatItemValue(value) : value,
        }"
      />
    </TimeslotSegmentItem>
  </TimeslotSegment>
</template>
