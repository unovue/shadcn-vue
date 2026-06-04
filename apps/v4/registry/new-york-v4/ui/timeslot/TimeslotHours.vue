<script lang="ts">
export interface TimeslotHoursProps<T extends number> extends TimeslotFieldProps<T> {
  meridiem?: boolean
}

export interface TimeslotHoursEmits<T extends number> extends TimeslotFieldEmits<T> {}
</script>

<script setup lang="ts" generic="T extends number">
import type { TimeslotFieldEmits, TimeslotFieldProps } from "./TimeslotField.vue"
import { useForwardPropsEmits } from "reka-ui"
import TimeslotField from "./TimeslotField.vue"
import TimeslotFieldItem from "./TimeslotFieldItem.vue"
import TimeslotFieldItemText from "./TimeslotFieldItemText.vue"

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
  <TimeslotField
    v-slot="{ fieldItem }"
    v-bind="fieldPropsEmits"
  >
    <TimeslotFieldItem
      v-slot="{ value, disabled }"
      v-bind="fieldItem"
      :class="{
        meridiem,
        [`meridiem-${toMeridiem(fieldItem.value)}`]: meridiem,
      }"
    >
      <TimeslotFieldItemText
        v-bind="{
          disabled,
          value: meridiem ? toMeridiemFormat(value) : value,
        }"
      />
    </TimeslotFieldItem>
  </TimeslotField>
</template>
