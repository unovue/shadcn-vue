<script lang="ts" setup generic="Value extends NonNullable<RangeCalendarRootProps['min']> = NonNullable<RangeCalendarRootValue[number]>">
import type { RangeCalendarRootEmits, RangeCalendarRootProps, RangeCalendarRootValue } from "@vase-ui/vue/range-calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { RangeCalendar } from "@vase-ui/vue/range-calendar"
import { cn } from "cn"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNextButton, RangeCalendarPrevButton } from "."

interface Props extends /* @vue-ignore */ RangeCalendarRootProps<Value> {
  class?: HTMLAttributes["class"]
  showOutsideDays?: boolean
}
interface Emits extends /* @vue-ignore */ RangeCalendarRootEmits<Value> {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  showOutsideDays: true,
})
defineEmits<Emits>()

installTemporal()
</script>

<template>
  <RangeCalendar.Root
    v-bind="$attrs"
    :show-outside-days="showOutsideDays"
    data-slot="range-calendar"
    :class="cn('relative p-3', props.class)"
  >
    <RangeCalendarHeader class="pt-0">
      <RangeCalendarPrevButton class="top-0" />
      <RangeCalendarNextButton class="top-0" />
    </RangeCalendarHeader>

    <Calendar.Months class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <template #month="{ month }">
        <Calendar.Month :month="month" class="flex flex-col gap-4">
          <RangeCalendarHeading class="flex h-7 items-center justify-center" />
          <RangeCalendarGrid>
            <RangeCalendarGridHead>
              <RangeCalendarGridRow>
                <template #weekday="{ weekday }">
                  <RangeCalendarHeadCell :weekday="weekday" />
                </template>
              </RangeCalendarGridRow>
            </RangeCalendarGridHead>
            <RangeCalendarGridBody>
              <template #week="{ week }">
                <RangeCalendarGridRow :week="week" class="mt-2 w-full">
                  <template #day="{ day }">
                    <RangeCalendarCell :day="day">
                      <RangeCalendarCellTrigger />
                    </RangeCalendarCell>
                  </template>
                </RangeCalendarGridRow>
              </template>
            </RangeCalendarGridBody>
          </RangeCalendarGrid>
        </Calendar.Month>
      </template>
    </Calendar.Months>
  </RangeCalendar.Root>
</template>
