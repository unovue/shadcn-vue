<script setup lang="ts">
import { charts } from '@/constants/charts'
import { cn } from '~/lib/utils'

const chartTypes = [
  'area',
  // 'bar',
  // 'line',
  // 'pie',
  // 'radar',
  // 'radial',
  // 'tooltip',
] as const
type ChartType = (typeof chartTypes)[number]

const { params } = toRefs(useRoute())
const chartType = computed(() => params.value.type?.toString() ?? '')
const chartList = computed(() => charts[chartType.value as ChartType])
</script>

<template>
  <div class="grid flex-1 gap-12 lg:gap-24">
    <h2 class="sr-only">
      {{ chartType.charAt(0).toUpperCase() + chartType.slice(1) }} Charts
    </h2>
    <div class="grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
      <template v-for="(chart, i) in chartList.slice(0, 12)" :key="i">
        <ChartDisplay :name="chart.id" :class="cn(chart.fullWidth && 'md:col-span-2 lg:col-span-3')">
          <component :is="chart.component" />
        </ChartDisplay>
      </template>
      <template v-for="i in (12 - chartList.length)" :key="i">
        <div
          class="hidden aspect-square w-full rounded-lg border border-dashed xl:block"
        />
      </template>
    </div>
  </div>
</template>
