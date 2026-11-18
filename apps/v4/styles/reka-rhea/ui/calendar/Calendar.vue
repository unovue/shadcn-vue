<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui'

import type { HTMLAttributes, Ref } from 'vue'
import type { LayoutTypes } from '.'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChevronDownIcon } from '@lucide/vue'
import { createReusableTemplate, reactiveOmit, useVModel } from '@vueuse/core'
import { cn } from 'cn'
import { CalendarRoot, useDateFormatter, useForwardPropsEmits } from 'reka-ui'
import { createYear, createYearRange, toDate } from 'reka-ui/date'
import { computed, toRaw } from 'vue'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.'

const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'], layout?: LayoutTypes, yearRange?: DateValue[] }>(), {
  modelValue: undefined,
  layout: undefined,
})
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'layout', 'placeholder')

const placeholder = useVModel(props, 'placeholder', emits, {
  passive: true,
  defaultValue: props.defaultPlaceholder ?? today(getLocalTimeZone()),
}) as Ref<DateValue>

const formatter = useDateFormatter(props.locale ?? 'en')

const yearRange = computed(() => {
  return props.yearRange ?? createYearRange({
    start: props?.minValue ?? (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone()))
      .cycle('year', -100),

    end: props?.maxValue ?? (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone()))
      .cycle('year', 10),
  })
})

const [DefineMonthTemplate, ReuseMonthTemplate] = createReusableTemplate<{ date: DateValue }>()
const [DefineYearTemplate, ReuseYearTemplate] = createReusableTemplate<{ date: DateValue }>()

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DefineMonthTemplate v-slot="{ date }">
    <div class="has-focus:border-ring border-transparent has-focus:ring-ring/30 border has-focus:ring-3 relative rounded-(--cell-radius)">
      <select
        class="absolute inset-0 bg-popover opacity-0"
        :value="date.month"
        @change="(e: Event) => {
          placeholder = placeholder.set({
            month: Number((e?.target as any)?.value),
          })
        }"
      >
        <option v-for="(month) in createYear({ dateObj: date })" :key="month.toString()" :value="month.month">
          {{ formatter.custom(toDate(month), { month: 'short' }) }}
        </option>
      </select>
      <span class="h-8 pr-2 pl-3 flex items-center gap-1 rounded-(--cell-radius) text-sm font-medium select-none [&>svg]:size-3.5 [&>svg]:text-muted-foreground" aria-hidden="true">
        {{ formatter.custom(toDate(date), { month: 'short' }) }}
        <ChevronDownIcon class="size-4" />
      </span>
    </div>
  </DefineMonthTemplate>

  <DefineYearTemplate v-slot="{ date }">
    <div class="has-focus:border-ring border-transparent has-focus:ring-ring/30 border has-focus:ring-3 relative rounded-(--cell-radius)">
      <select
        class="absolute inset-0 bg-popover opacity-0"
        :value="date.year"
        @change="(e: Event) => {
          placeholder = placeholder.set({
            year: Number((e?.target as any)?.value),
          })
        }"
      >
        <option v-for="(year) in yearRange" :key="year.toString()" :value="year.year">
          {{ formatter.custom(toDate(year), { year: 'numeric' }) }}
        </option>
      </select>
      <span class="h-8 pr-2 pl-3 flex items-center gap-1 rounded-(--cell-radius) text-sm font-medium select-none [&>svg]:size-3.5 [&>svg]:text-muted-foreground" aria-hidden="true">
        {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
        <ChevronDownIcon class="size-4" />
      </span>
    </div>
  </DefineYearTemplate>

  <CalendarRoot
    v-slot="{ grid, weekDays, date }"
    v-bind="forwarded"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn('p-3 [--cell-radius:var(--radius-2xl)] [--cell-size:--spacing(8)] group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent', props.class)"
  >
    <CalendarHeader class="h-(--cell-size) px-(--cell-size) pt-0">
      <slot name="calendar-heading" :date="date" :month="ReuseMonthTemplate" :year="ReuseYearTemplate">
        <template v-if="layout === 'month-and-year'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else-if="layout === 'month-only'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
          </div>
        </template>
        <template v-else-if="layout === 'year-only'">
          <div class="flex items-center justify-center gap-1">
            {{ formatter.custom(toDate(date), { month: 'short' }) }}
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else>
          <CalendarHeading />
        </template>
      </slot>

      <nav class="pointer-events-none flex items-center gap-1 absolute top-0 inset-x-0 justify-between">
        <CalendarPrevButton class="size-(--cell-size)">
          <slot name="calendar-prev-icon" />
        </CalendarPrevButton>
        <CalendarNextButton class="size-(--cell-size)">
          <slot name="calendar-next-icon" />
        </CalendarNextButton>
      </nav>
    </CalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              v-for="day in weekDays" :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
