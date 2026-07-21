<script setup lang="ts">
import type { TimeslotFields } from '~/registry/new-york-v4/ui/timeslot'
import { Label } from '~/registry/new-york-v4/ui/label'
import { Switch } from '~/registry/new-york-v4/ui/switch'
import { Timeslot } from '~/registry/new-york-v4/ui/timeslot'

const fields: TimeslotFields = {
  hour: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  minute: [0, 10, 20, 30, 40, 50],
}

const useHours12Format = ref(false)

const dateTimeFormatOptions = computed((): Intl.DateTimeFormatOptions => {
  return {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: useHours12Format.value,
  }
})

const useHorizontalFields = ref(false)
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-8">
    <div class="w-64 h-64 flex justify-center items-center">
      <Timeslot
        class="*:data-timeslot-field:rounded-md *:data-timeslot-field:border" :class="[
          useHorizontalFields ? 'timeslot-horizontal' : '',
        ]"
        :fields="fields"
        :format="dateTimeFormatOptions"
      />
    </div>
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <Switch id="meridiem-format" v-model="useHours12Format" />
        <Label for="meridiem-format">Meridiem Format</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch id="field-orientation" v-model="useHorizontalFields" />
        <Label for="field-orientation">Horizontal Fields</Label>
      </div>
    </div>
  </div>
</template>
