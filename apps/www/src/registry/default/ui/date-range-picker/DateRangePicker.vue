<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  DateRangePickerArrow,
  DateRangePickerCalendar,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerContent,
  DateRangePickerGrid,
  DateRangePickerGridBody,
  DateRangePickerGridHead,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerHeader,
  DateRangePickerHeading,
  DateRangePickerNext,
  DateRangePickerPrev,
  DateRangePickerRoot,
  DateRangePickerTrigger,
} from 'reka-ui'
import { defineEmits, defineProps, ref, watch } from 'vue'

import { Button } from '@/registry/default/ui/button'
// Props from parent
const props = defineProps<{
  modelValue: { start?: Date, end?: Date }
  placeholder: 'Select date range'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { start?: Date, end?: Date }): void
}>()

// Internal state mirrors modelValue
const modalDate = ref({
  start: undefined,
  end: undefined,
})
const startDate = ref<Date | undefined>(props.modelValue.start)
const endDate = ref<Date | undefined>(props.modelValue.end)
const isSelectingStartDate = ref(true)

// Sync local → emit to parent
watch([startDate, endDate], () => {
  const updated = { start: startDate.value, end: endDate.value }
  // console.log('[DateRangePicker] Emitting updated:', updated)
  emit('update:modelValue', updated)
  isSelectingStartDate.value = !startDate.value || (startDate.value && !endDate.value)
})

// Sync parent → local
watch(() => modalDate, (val) => {
  // console.log('[DateRangePicker] Emitting modalDate:', val.value)
  startDate.value = val.value.start
  endDate.value = val.value.end
  emit('update:modelValue', val.value)
}, { immediate: true, deep: true })

function clearDateRange() {
  // console.log('[DateRangePicker] Clear clicked')
  startDate.value = undefined
  endDate.value = undefined
  const updated = { start: startDate.value, end: endDate.value }
  modalDate.value = updated
  emit('update:modelValue', updated)
  emit('update:modelValue', modalDate.value)
}

function formatDate(date?: Date) {
  if (!date)
    return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

import type { DateValue } from '@internationalized/date'

function pagingFunc(date: DateValue, sign: -1 | 1) {
  return sign === -1 ? date.subtract({ years: 1 }) : date.add({ years: 1 })
}
</script>

<template>
  <DateRangePickerRoot
    v-model="modalDate"
    v-model:start-value="startDate"
  >
    <!-- Wrapper -->
    <div class="relative w-full">
      <!-- PopoverTrigger with Button -->
      <DateRangePickerTrigger as-child>
        <Button variant="outline" class="w-full justify-start text-left font-normal pr-8">
          <div class="flex items-center space-x-2 overflow-hidden">
            <Icon icon="radix-icons:calendar" class="h-4 w-4 text-gray-500" />
            <span v-if="startDate && !endDate">{{ formatDate(startDate) }} - ...</span>
            <span v-else-if="startDate && endDate">{{ formatDate(startDate) }} - {{ formatDate(endDate) }}</span>
            <span v-else>{{ props.placeholder }}</span>
          </div>
        </Button>
      </DateRangePickerTrigger>

      <!-- Clear Icon OUTSIDE the PopoverTrigger -->
      <Icon
        v-if="startDate || endDate"
        icon="radix-icons:cross-1"
        class="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
        @click.stop.prevent="clearDateRange"
      />
    </div>

    <DateRangePickerContent class="rounded-lg border bg-popover p-3 text-popover-foreground shadow-md z-[100]">
      <DateRangePickerArrow class="fill-popover" />
      <DateRangePickerCalendar v-slot="{ weekDays, grid }" class="space-y-4">
        <DateRangePickerHeader class="flex items-center justify-between">
          <!-- Go back 1 year -->
          <DateRangePickerPrev
            :prev-page="(date: DateValue) => pagingFunc(date, -1)"
            class="h-7 w-7 rounded hover:opacity-100"
          >
            <Icon icon="radix-icons:double-arrow-left" class="h-4 w-4" />
          </DateRangePickerPrev>

          <DateRangePickerPrev class="h-7 w-7 rounded hover:opacity-100">
            <Icon icon="radix-icons:chevron-left" class="h-4 w-4" />
          </DateRangePickerPrev>

          <DateRangePickerHeading class="text-sm font-medium" />

          <DateRangePickerNext class="h-7 w-7 rounded hover:opacity-100">
            <Icon icon="radix-icons:chevron-right" class="h-4 w-4" />
          </DateRangePickerNext>

          <!-- Go next 1 year -->
          <DateRangePickerNext
            :next-page="(date: DateValue) => pagingFunc(date, 1)"
            class="h-7 w-7 rounded hover:opacity-100"
          >
            <Icon icon="radix-icons:double-arrow-right" class="h-4 w-4" />
          </DateRangePickerNext>
        </DateRangePickerHeader>

        <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <DateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse space-y-1"
          >
            <DateRangePickerGridHead>
              <DateRangePickerGridRow class="grid grid-cols-7 gap-1">
                <DateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="text-muted-foreground text-xs font-medium"
                >
                  {{ day }}
                </DateRangePickerHeadCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridHead>

            <DateRangePickerGridBody>
              <DateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="index"
                class="grid grid-cols-7 gap-1"
              >
                <DateRangePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <DateRangePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[today]:before:bg-primary data-[outside-view]:text-muted-foreground/50 data-[disabled]:text-muted-foreground/50 data-[unavailable]:pointer-events-none data-[unavailable]:text-destructive/30 data-[unavailable]:line-through before:absolute before:bottom-1 before:h-1 before:w-1 before:rounded-full"
                  />
                </DateRangePickerCell>
              </DateRangePickerGridRow>
            </DateRangePickerGridBody>
          </DateRangePickerGrid>
        </div>
      </DateRangePickerCalendar>
    </DateRangePickerContent>
  </DateRangePickerRoot>
</template>
