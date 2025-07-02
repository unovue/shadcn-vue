<script setup lang="ts">
import { ref } from 'vue'
import DateRangePicker from '@/registry/default/ui/date-range-picker/DateRangePicker.vue'

const selectedDateRange = ref({
  start: null,
  end: null,
})

function setDateRange() {
  console.log('setDateRange selectedDateRange', selectedDateRange.value)
}
</script>

<template>
  <DateRangePicker
    v-model="selectedDateRange"
    @update:model-value="setDateRange()"
  />
</template>
