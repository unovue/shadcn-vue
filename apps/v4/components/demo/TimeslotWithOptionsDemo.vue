<script setup lang="ts">
import type { TimeslotSegmentPart, TimeslotSegments } from '~/registry/new-york-v4/ui/timeslot'
import { Label } from '~/registry/new-york-v4/ui/label'
import { Switch } from '~/registry/new-york-v4/ui/switch'
import { Timeslot } from '~/registry/new-york-v4/ui/timeslot'

const showDisabledHours = ref(true)
const useEmptyMinutes = ref(false)

function* allHours() {
  for (let value = 0; value < 24; ++value) {
    yield value
  }
}

function isTimeslotDisabled(name: TimeslotSegmentPart, value: number) {
  switch (name) {
    case 'hour':
      return value < 8 || value > 17
  }

  return false
}

const segments = computed((): TimeslotSegments => {
  return {
    hour: [...allHours()].filter((value) => {
      return showDisabledHours.value || !isTimeslotDisabled('hour', value)
    }),
    minute: useEmptyMinutes.value ? [] : [0, 10, 20, 30, 40, 50],
  }
})

const hourCycle = ref<12 | 24>(24)

const useHorizontalFields = ref(false)
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-8">
    <div class="w-64 h-64 flex justify-center items-center">
      <Timeslot
        class="*:data-timeslot-segment:rounded-md *:data-timeslot-segment:border" :class="[
          useHorizontalFields ? 'timeslot-horizontal' : '',
        ]"
        :segments="segments"
        :hour-cycle="hourCycle"
        :is-item-disabled="isTimeslotDisabled"
      />
    </div>
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <Switch
          id="12-hours-format"
          :model-value="hourCycle === 12"
          @update:model-value="value => { hourCycle = value ? 12 : 24 }"
        />
        <Label for="12-hours-format">12-hour clock</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch id="field-orientation" v-model="useHorizontalFields" />
        <Label for="field-orientation">Horizontal Fields</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch id="show-disabled-hours" v-model="showDisabledHours" />
        <Label for="show-disabled-hours">Show disabled hours</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch id="empty-minutes" v-model="useEmptyMinutes" />
        <Label for="empty-minutes">Empty minutes</Label>
      </div>
    </div>
  </div>
</template>
