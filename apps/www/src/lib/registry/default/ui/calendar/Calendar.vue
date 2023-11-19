<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Calendar } from 'v-calendar'
import { DatePicker } from 'v-calendar'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, nextTick, onMounted, ref } from 'vue'
import type { DatePickerModel } from 'v-calendar/dist/types/src/use/datePicker'
import { buttonVariants } from '@/lib/registry/default/ui/button'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string | number | Date | DatePickerModel
  modelModifiers?: object
  columns?: number
  type?: 'single' | 'range'
}>(), {
  type: 'single',
  columns: 1,
})
const emits = defineEmits<{
  (e: 'update:modelValue', payload: typeof props.modelValue): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})

const datePicker = ref<InstanceType<typeof DatePicker>>()
// @ts-expect-error in this current version of v-calendar has the calendaRef instance, which is required to handle arrow nav.
const calendarRef = computed<InstanceType<typeof Calendar>>(() => datePicker.value.calendarRef)

function handleNav(direction: 'prev' | 'next') {
  if (!calendarRef.value)
    return

  if (direction === 'prev')
    calendarRef.value.movePrev()
  else calendarRef.value.moveNext()
}

onMounted(async () => {
  await nextTick()
  if (modelValue.value instanceof Date && calendarRef.value)
    calendarRef.value.focusDate(modelValue.value)
})
</script>

<template>
  <div class="relative">
    <div class="absolute top-3 flex justify-between w-full px-4">
      <button :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')" @click="handleNav('prev')">
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')" @click="handleNav('next')">
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <DatePicker
      ref="datePicker"
      v-model="modelValue"
      v-bind="$attrs"
      :model-modifiers="modelModifiers"
      class="calendar"
      trim-weeks
      :transition="'none'"
      :columns="columns"
    />
  </div>
</template>

<style lang="postcss">
.calendar {
  @apply p-3 text-center;
}
.calendar .vc-pane-layout {
  @apply grid gap-4;
}
.calendar .vc-title {
  @apply text-sm font-medium pointer-events-none;
}
.calendar .vc-pane-header-wrapper {
  @apply hidden;
}
.calendar .vc-weeks {
  @apply mt-4;
}
.calendar .vc-weekdays {
  @apply flex;
}
.calendar .vc-weekday {
  @apply text-muted-foreground rounded-md w-9 font-normal text-[0.8rem];
}
.calendar .vc-weeks {
  @apply w-full space-y-2 flex flex-col [&>_div]:grid [&>_div]:grid-cols-7;
}
.calendar .vc-day:has(.vc-highlights) {
  @apply bg-accent first:rounded-l-md last:rounded-r-md overflow-hidden;
}
.calendar .vc-day-content  {
  @apply text-center text-sm p-0 relative focus-within:relative focus-within:z-20 inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9  font-normal aria-selected:opacity-100 select-none;
}
.calendar .vc-day-content:not(.vc-highlight-content-light) {
  @apply rounded-md;
}
.calendar .is-not-in-month:not(:has(.vc-highlight-content-solid)):not(:has(.vc-highlight-content-light)):not(:has(.vc-highlight-content-outline)),
.calendar .vc-disabled {
  @apply text-muted-foreground opacity-50;
}
.calendar .vc-highlight-content-solid, .calendar .vc-highlight-content-outline {
  @apply bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground;
}
.calendar .vc-highlight-content-light {
  @apply bg-accent text-accent-foreground;
}
</style>
