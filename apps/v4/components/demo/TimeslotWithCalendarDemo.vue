<script setup lang="ts">
import type {
  CalendarDateTime,
  DateValue,
} from '@internationalized/date'

import type { TimeslotModelValue, TimeslotSegments } from '~/registry/new-york-v4/ui/timeslot'

import {
  getLocalTimeZone,
  Time,
  toCalendarDateTime,
  today,
} from '@internationalized/date'

import { useLocale } from 'reka-ui'

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
import { cn } from '~/lib/utils'
import {
  Timeslot,
} from '~/registry/new-york-v4/ui/timeslot'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>

const segments: TimeslotSegments = {
  hour: [10, 11, 12, 13, 14, 15, 16, 17],
  minute: [0, 20, 40],
}

const timeslot = ref<TimeslotModelValue>({})
const time = computed(() => {
  const { hour, minute } = timeslot.value ?? {}
  if (undefined === hour || undefined === minute)
    return
  return new Time(hour, minute)
})

const dateTime = computed(() => {
  return toCalendarDateTime(date.value, time.value)
})

const locale = useLocale()
const dateTimeFormat = computed(() => {
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
})
function formatDateTime(value: CalendarDateTime) {
  const date = value.toDate(getLocalTimeZone())
  return dateTimeFormat.value.format(date)
}
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
            v-model="timeslot"
            :segments="segments"
            :class="cn(
              'w-0 min-w-full',
              'w-auto sm:h-0 min-w-auto sm:min-h-full',
              '*:data-timeslot-segment:rounded-md *:data-timeslot-segment:border',
              'max-sm:timeslot-horizontal',
            )"
          />
        </div>
        <p class="text-justify text-muted-foreground text-sm">
          Meeting will start <b>{{ formatDateTime(dateTime) }}</b>.
        </p>
      </div>
    </CardContent>
    <CardFooter class="flex gap-2">
      <Button>
        Submit
      </Button>
      <Button variant="ghost">
        Cancel
      </Button>
    </CardFooter>
  </Card>
</template>
