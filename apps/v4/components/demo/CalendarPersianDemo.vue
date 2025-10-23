<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { fromDate, getLocalTimeZone, PersianCalendar, toCalendar } from '@internationalized/date'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useDateFormatter } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'

const date = ref(toCalendar(fromDate(new Date(), getLocalTimeZone()), new PersianCalendar())) as Ref<DateValue>

const formatter = useDateFormatter('fa')
</script>

<template>
  <div>
    <Calendar
      v-model="date"
      locale="fa-IR"
      class="rounded-md border shadow-sm"
      dir="rtl"
    >
      <template #calendar-next-icon>
        <ChevronLeft />
      </template>

      <template #calendar-prev-icon>
        <ChevronRight />
      </template>
    </Calendar>

    <div class="flex flex-col justify-center items-center gap-2">
      <div>
        {{
          formatter.custom(
            toDate(date, getLocalTimeZone()), {
              numberingSystem: 'latn',
            })
        }}
      </div>

      <div>
        {{ formatter.custom(date.toDate(getLocalTimeZone()), { month: 'short', year: 'numeric' }) }}
      </div>
    </div>
  </div>
</template>
