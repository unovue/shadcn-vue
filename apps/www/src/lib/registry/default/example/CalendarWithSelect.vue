<script setup lang="ts">
import { type HTMLAttributes, computed, onMounted, ref, toRef } from 'vue'
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'radix-vue'
import { CALENDAR, DateFormatter, getLocalTimeZone, temporalToString, toCalendar, toDate, today } from 'flat-internationalized-date'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading } from '@/lib/registry/default/ui/calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/default/ui/select'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: undefined,
  placeholder() {
    return toCalendar(today(getLocalTimeZone()), CALENDAR.GREGORIAN)
  },
  weekdayFormat: 'short',
})
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __, ...delegated } = props

  return delegated
})
const placeholder = toRef(props.placeholder)

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CalendarRoot

    v-slot="{ getMonths, getYears, formatter, date }"
    v-model:placeholder="placeholder"
    v-bind="forwarded"
    :class="cn('rounded-md border p-3', props.class)"
  >
    {{ JSON.stringify(placeholder) }}
    <CalendarHeader>
      <CalendarHeading class="flex w-full items-center justify-between gap-2">
        <Select
          :default-value="props.placeholder.month.toString()"
        >
          <SelectTrigger aria-label="Select month" class="w-[60%]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="month in getMonths"
              :key="temporalToString(month)" :value="month.month.toString()"
              @click="placeholder = month"
            >
              {{ formatter.custom(month, { month: 'long' }) }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          :default-value="props.placeholder.year.toString()"
        >
          <SelectTrigger aria-label="Select year" class="w-[40%]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent class="max-h-[200px]">
            <SelectItem
              v-for="yearValue in getYears({ startIndex: -10, endIndex: 10 })"
              :key="temporalToString(yearValue)" :value="yearValue.year.toString()"
              @click="placeholder = yearValue"
            >
              {{ yearValue.year }}
            </SelectItem>
          </SelectContent>
        </Select>
      </CalendarHeading>
    </CalendarHeader>
  </CalendarRoot>
</template>
