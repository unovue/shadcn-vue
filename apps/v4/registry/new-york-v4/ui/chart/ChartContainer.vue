<script lang="ts">
import { useId } from 'reka-ui'
import { defineSlots, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { type ChartConfig, provideChartContext } from '.'
import ChartStyle from './ChartStyle.vue'
</script>

<script setup lang="ts">
const props = defineProps<{
  id?: HTMLAttributes['id']
  class?: HTMLAttributes['class']
  config: ChartConfig
}>()

defineSlots<{
  default: {
    id: string
    config: ChartConfig
  }
}>()

const { config } = toRefs(props)
const uniqueId = useId()
const chartId = computed(() => `chart-${props.id || uniqueId.replace(/:/g, '')}`)

provideChartContext({
  config,
})
</script>

<template>
  <div
    data-slot="chart"
    :data-chart="chartId"
    :class="cn(
      `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.tick_line]:!stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden`,
      props.class,
    )"
    :style="{
      '--vis-tooltip-background-color': 'none !important',
      '--vis-tooltip-border-color': 'none !important',
      '--vis-tooltip-text-color': 'none !important',
      '--vis-tooltip-shadow-color': 'none !important',
      '--vis-tooltip-backdrop-filter': 'none !important',
      '--vis-tooltip-padding': 'none !important',
    }"
  >
    <slot :id="uniqueId" :config="config" />
    <ChartStyle :id="chartId" :config="config" />
  </div>
</template>
