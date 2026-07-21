<script setup lang="ts">
import type { TimeslotFieldName, TimeslotFields, TimeslotModelValue } from '~/registry/new-york-v4/ui/timeslot'
import {
  Timeslot,

} from '~/registry/new-york-v4/ui/timeslot'

const fields: TimeslotFields = {
  hour: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  minute: [0, 10, 20, 30, 40, 50],
}

const state = ref<TimeslotModelValue>()

// Disable timeslots from 12:00 to 13:30
function isTimeslotDisabled(name: TimeslotFieldName, value: number) {
  const hours = state.value?.hour

  switch (name) {
    case 'hour': {
      return value === 12
    }

    case 'minute': {
      if (!hours) {
        return true
      }
      if (isTimeslotDisabled('hour', hours)) {
        return true
      }
      if (hours === 12) {
        return true
      }
      if (hours === 13) {
        return value < 30
      }
    }
  }

  return false
}
</script>

<template>
  <Timeslot
    v-model="state"
    class="h-64 *:data-timeslot-field:rounded-md *:data-timeslot-field:border"
    :fields="fields"
    :is-item-disabled="isTimeslotDisabled"
  />
</template>
