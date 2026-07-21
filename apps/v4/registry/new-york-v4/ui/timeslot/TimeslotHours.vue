<script lang="ts">
import type { TimeslotSegmentEmits, TimeslotSegmentProps } from "./TimeslotSegment.vue"

export interface TimeslotHoursProps<T extends number> extends TimeslotSegmentProps<T> {
  meridiem?: boolean
}

export interface TimeslotHoursEmits<T extends number> extends TimeslotSegmentEmits<T> {}
</script>

<script setup lang="ts" generic="T extends number">
import { useForwardPropsEmits } from "reka-ui"
import TimeslotSegment from "./TimeslotSegment.vue"
import TimeslotSegmentItem from "./TimeslotSegmentItem.vue"
import TimeslotSegmentItemText from "./TimeslotSegmentItemText.vue"

const props = defineProps<TimeslotHoursProps<T>>()

const emits = defineEmits<TimeslotHoursEmits<T>>()

const forwardedProps = computed(() => {
  const { meridiem, ...other } = props
  return other
})

const fieldPropsEmits = useForwardPropsEmits(forwardedProps, emits)

const MERIDIEM = 12

function toMeridiemFormat(value: number) {
  return value > MERIDIEM ? value - MERIDIEM : value
}

function toMeridiem(value: number) {
  return value < MERIDIEM ? "am" : "pm"
}
</script>

<template>
  <TimeslotSegment
    v-slot="{ segmentItem }"
    v-bind="fieldPropsEmits"
  >
    <TimeslotSegmentItem
      v-slot="{ value, disabled }"
      v-bind="segmentItem"
      :class="{
        meridiem,
        [`meridiem-${toMeridiem(segmentItem.value)}`]: meridiem,
      }"
    >
      <TimeslotSegmentItemText
        v-bind="{
          disabled,
          value: meridiem ? toMeridiemFormat(value) : value,
        }"
      />
    </TimeslotSegmentItem>
  </TimeslotSegment>
</template>
