<script lang="ts" setup generic="Value extends CalendarValue = NonNullable<CalendarRootProps['modelValue']>, Multiple extends boolean | undefined = false">
import type { CalendarRootEmits, CalendarRootProps, CalendarValue } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import type { LayoutTypes } from '.'
import { Calendar } from '@vase-ui/vue/calendar'
import { createReusableTemplate } from '@vueuse/core'
import { cn } from 'cn'
import { computed, useSlots } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { NativeSelect, NativeSelectOption } from '@/styles/vase-sera/ui/native-select'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.'

interface Props extends /* @vue-ignore */ CalendarRootProps<Value, Multiple> {
  class?: HTMLAttributes['class']
  layout?: LayoutTypes
  showOutsideDays?: boolean
  showWeekNumber?: boolean
}
interface Emits extends /* @vue-ignore */ CalendarRootEmits<Value, Multiple> {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  layout: undefined,
  showOutsideDays: true,
  showWeekNumber: false,
})
defineEmits<Emits>()

installTemporal()

const slots = useSlots()
const hasHeading = computed(() => !!props.layout || !!slots['calendar-heading'])

const [DefineMonthTemplate, ReuseMonthTemplate] = createReusableTemplate<{ text?: boolean }>()
const [DefineYearTemplate, ReuseYearTemplate] = createReusableTemplate<{ text?: boolean }>()

// NativeSelect puts `class` on its wrapper, so the classes of the select itself use a descendant selector.
const selectClass = '**:data-[slot=native-select]:h-8 **:data-[slot=native-select]:pr-6 **:data-[slot=native-select]:pl-2 **:data-[slot=native-select]:text-xs **:data-[slot=native-select]:text-transparent'
</script>

<template>
  <DefineMonthTemplate v-slot="{ text }">
    <Calendar.MonthSelect format="short">
      <template #element="{ props: selectProps, elementRef, options, value }">
        <template v-if="text">
          {{ options.find(option => option.value === value)?.text }}
        </template>
        <div v-else class="**:data-[slot=native-select-icon]:right-1 **:data-[slot=native-select-icon]:opacity-50">
          <div class="relative">
            <div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none">
              {{ options.find(option => option.value === value)?.text }}
            </div>
            <NativeSelect
              v-bind="selectProps"
              :ref="elementRef"
              :model-value="value"
              :class="selectClass"
            >
              <NativeSelectOption
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.text }}
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
      </template>
    </Calendar.MonthSelect>
  </DefineMonthTemplate>

  <DefineYearTemplate v-slot="{ text }">
    <Calendar.YearSelect>
      <template #element="{ props: selectProps, elementRef, options, value }">
        <template v-if="text">
          {{ options.find(option => option.value === value)?.text }}
        </template>
        <div v-else class="**:data-[slot=native-select-icon]:right-1 **:data-[slot=native-select-icon]:opacity-50">
          <div class="relative">
            <div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none">
              {{ options.find(option => option.value === value)?.text }}
            </div>
            <NativeSelect
              v-bind="selectProps"
              :ref="elementRef"
              :model-value="value"
              :class="selectClass"
            >
              <NativeSelectOption
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.text }}
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
      </template>
    </Calendar.YearSelect>
  </DefineYearTemplate>

  <Calendar.Root
    v-bind="$attrs"
    :show-outside-days="showOutsideDays"
    data-slot="calendar"
    :class="cn('p-3 [--cell-radius:0] [--cell-size:--spacing(8)] group/calendar relative bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent', props.class)"
  >
    <CalendarHeader class="pt-0">
      <slot name="calendar-heading" :month="ReuseMonthTemplate" :year="ReuseYearTemplate">
        <template v-if="layout === 'month-and-year'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate />
            <ReuseYearTemplate />
          </div>
        </template>
        <template v-else-if="layout === 'month-only'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate />
            <ReuseYearTemplate text />
          </div>
        </template>
        <template v-else-if="layout === 'year-only'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate text />
            <ReuseYearTemplate />
          </div>
        </template>
      </slot>

      <nav class="pointer-events-none flex items-center gap-1 absolute top-0 inset-x-0 justify-between">
        <CalendarPrevButton>
          <slot name="calendar-prev-icon" />
        </CalendarPrevButton>
        <CalendarNextButton>
          <slot name="calendar-next-icon" />
        </CalendarNextButton>
      </nav>
    </CalendarHeader>

    <Calendar.Months :class="cn('flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0', hasHeading && 'mt-4')">
      <template #month="{ month }">
        <Calendar.Month :month="month" class="flex w-full flex-col gap-4">
          <CalendarHeading v-if="!hasHeading" class="flex h-7 items-center justify-center" />
          <CalendarGrid>
            <CalendarGridHead>
              <CalendarGridRow>
                <Calendar.WeekNumberHeader
                  v-if="showWeekNumber"
                  class="text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none"
                />
                <template #weekday="{ weekday }">
                  <CalendarHeadCell :weekday="weekday" />
                </template>
              </CalendarGridRow>
            </CalendarGridHead>
            <CalendarGridBody>
              <template #week="{ week }">
                <CalendarGridRow :week="week" class="mt-2 w-full">
                  <Calendar.WeekNumber
                    v-if="showWeekNumber"
                    :week="week"
                    class="text-muted-foreground flex flex-1 items-center justify-center text-[0.8rem] font-normal select-none"
                  />
                  <template #day="{ day }">
                    <CalendarCell :day="day">
                      <CalendarCellTrigger />
                    </CalendarCell>
                  </template>
                </CalendarGridRow>
              </template>
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar.Month>
      </template>
    </Calendar.Months>
  </Calendar.Root>
</template>
