<script setup lang="ts">
import type { DateValue, TimeValue } from 'reka-ui'

import type { ShallowRef } from 'vue'
import type { TimeslotItemMatcher, TimeslotSegmentPart, TimeslotSegments } from '@/registry/new-york-v4/ui/timeslot'

import {
  getLocalTimeZone,
  toCalendarDateTime,
  today,
} from '@internationalized/date'

import { useDateFormatter, useLocale } from 'reka-ui'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Calendar,
} from '@/registry/new-york-v4/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {

  Timeslot,

} from '@/registry/new-york-v4/ui/timeslot'
import { cn } from '~/lib/utils'

const date = shallowRef(today(getLocalTimeZone())) as ShallowRef<DateValue>

const segments: TimeslotSegments = {
  hour: [10, 11, 12, 13, 14, 15, 16, 17],
  minute: [0, 20, 40],
}

const time = shallowRef<TimeValue>() as ShallowRef<TimeValue | undefined>

const dateTime = computed(() => {
  return toCalendarDateTime(date.value, time.value)
})

const locale = useLocale()
const formatter = useDateFormatter(locale.value)

function formatDateTime(value: DateValue) {
  const date = value.toDate(getLocalTimeZone())
  return formatter.custom(date, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

const disabledHours = [11, 13]

const isReadonlyItem: TimeslotItemMatcher<TimeslotSegmentPart> = {
  hour: value => disabledHours.includes(value),
  minute: (_, state) => !!(state?.hour && isReadonlyItem.hour?.(state.hour)),
}

const isTimeslotAvailable = computed(() => {
  if (!time.value)
    return
  return !isReadonlyItem.hour?.(time.value.hour) && !isReadonlyItem.minute?.(time.value.minute)
})

const hourCycle = computed(() => {
  return formatter.part(dateTime.value, 'dayPeriod') ? 12 : 24
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>New meeting</CardTitle>
      <CardDescription>
        Select a date and time for your meeting
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div
        :class="cn(
          'flex flex-col gap-4',
        )"
      >
        <div
          :class="cn(
            'gap-8 grid',
            'grid-rows-[repeat(2,min-content)] grid-cols-1',
            'sm:grid-rows-1 sm:grid-cols-[repeat(2,min-content)]',
          )"
        >
          <Calendar
            v-model="date"
            class="rounded-md border overflow-hidden **:data-[slot=calendar-cell-trigger]:size-10!"
          />
          <Timeslot
            v-model="time"
            :segments="segments"
            :hour-cycle="hourCycle"
            :is-readonly-item="isReadonlyItem"
            :class="cn(
              'w-0 min-w-full',
              'w-auto sm:h-0 min-w-auto sm:min-h-full',
              '*:data-timeslot-segment:rounded-md *:data-timeslot-segment:border',
              'max-sm:timeslot-horizontal',
            )"
          />
        </div>
        <div class="text-justify text-muted-foreground text-sm">
          <p v-if="isTimeslotAvailable">
            Meeting will start <b>{{ formatDateTime(dateTime) }}</b>.
          </p>
          <p v-else>
            Selected timeslot is unavailable.
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex gap-2">
      <Button :disabled="!isTimeslotAvailable">
        Submit
      </Button>
      <Button variant="ghost">
        Cancel
      </Button>
    </CardFooter>
  </Card>
</template>
