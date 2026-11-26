<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Calendar } from '@/styles/vase-vega/ui/calendar'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
</script>

<template>
  <div class="**:data-[slot=native-select-icon]:right-[unset] **:data-[slot=native-select-icon]:left-3.5">
    <Calendar
      v-model="date"
      locale="fa-IR"
      calendar="persian"
      layout="month-and-year"
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
        {{ date.toLocaleString('fa', { numberingSystem: 'latn' }) }}
      </div>

      <div>
        {{ date.toLocaleString('fa', { month: 'short', year: 'numeric' }) }}
      </div>
    </div>
  </div>
</template>
