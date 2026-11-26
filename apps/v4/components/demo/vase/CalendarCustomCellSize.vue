<script setup lang="ts">
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Calendar } from '@/styles/vase-vega/ui/calendar'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
</script>

<template>
  <Calendar
    v-model="date"
    class="rounded-md border shadow-sm **:data-[slot=calendar-cell-trigger]:size-12!"
  >
    <template #calendar-heading="{ month }">
      <div class="flex gap-2 items-center">
        <div>
          Custom heading
        </div>
        <component :is="month" />
      </div>
    </template>
  </Calendar>
</template>
