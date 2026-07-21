<script setup lang="ts">
import type { TimeslotItemMatcher, TimeslotModelValue, TimeslotSegmentPart, TimeslotSegments } from '~/registry/new-york-v4/ui/timeslot'
import {

  Timeslot,

} from '~/registry/new-york-v4/ui/timeslot'

const segments: TimeslotSegments = {
  hour: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  minute: [0, 10, 20, 30, 40, 50],
}

const state = ref<TimeslotModelValue>()

// Disable timeslots from 12:00 to 13:30
const isReadonlyItem: TimeslotItemMatcher<TimeslotSegmentPart> = (name, value, state) => {
  switch (name) {
    case 'hour': {
      return value === 12
    }

    case 'minute': {
      if (!state?.hour) {
        return true
      }
      if (isReadonlyItem('hour', state.hour)) {
        return true
      }
      if (state.hour === 12) {
        return true
      }
      if (state.hour === 13) {
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
    class="h-64 *:data-timeslot-segment:rounded-md *:data-timeslot-segment:border"
    :segments="segments"
    :is-readonly-item="isReadonlyItem"
  />
</template>
