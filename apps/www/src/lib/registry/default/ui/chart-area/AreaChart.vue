<script setup lang="ts">
import type { BulletLegendItemInterface } from '@unovis/ts'
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { Area, Axis, Line } from '@unovis/ts'
import { ref } from 'vue'
import { useMounted } from '@vueuse/core'
import { ChartCrosshair, ChartLegend, defaultColors } from '@/lib/registry/default/ui/chart'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  filterOpacity?: number
  xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  showGridLine?: boolean
  showGradiant?: boolean
}>(), {
  colors: () => defaultColors,
  filterOpacity: 0.2,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
  showGradiant: true,
})

type Data = typeof props.data[number]

const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
  name: category,
  color: props.colors[i],
  inactive: false,
})))

const isMounted = useMounted()

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  // do something when clicked on legend
}
</script>

<template>
  <div :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')">
    <ChartLegend v-if="showLegend" v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />

    <VisXYContainer :style="{ height: isMounted ? '100%' : 'auto' }" :margin="{ left: 20, right: 20 }" :data="data">
      <svg width="0" height="0">
        <defs>
          <linearGradient v-for="(color, i) in colors" :id="`color-${i}`" :key="i" x1="0" y1="0" x2="0" y2="1">
            <template v-if="showGradiant">
              <stop offset="5%" :stop-color="color" stop-opacity="0.4" />
              <stop offset="95%" :stop-color="color" stop-opacity="0" />
            </template>
            <template v-else>
              <stop offset="0%" :stop-color="color" />
            </template>
          </linearGradient>
        </defs>
      </svg>

      <ChartCrosshair v-if="showTooltip" :colors="colors" :items="legendItems" :index="index" />

      <template v-for="(category, i) in categories" :key="category">
        <VisArea
          :x="(d: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          color="auto"
          :attributes="{
            [Area.selectors.area]: {
              fill: `url(#color-${i})`,
            },
          }"
          :opacity="legendItems.find(item => item.name === category)?.inactive ? filterOpacity : 1"
        />

        <VisLine
          :x="(d: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          :color="colors[i]"
          :attributes="{
            [Line.selectors.line]: {
              opacity: legendItems.find(item => item.name === category)?.inactive ? filterOpacity : 1,
            },
          }"
        />
      </template>

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"
        :grid-line="false"
        :tick-line="false"
        tick-text-color="hsl(var(--muted-foreground))"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="false"
        :tick-format="yFormatter"
        :domain-line="false"
        :grid-line="showGridLine"
        :attributes="{
          [Axis.selectors.grid]: {
            class: 'text-muted',
          },
        }"
        tick-text-color="hsl(var(--muted-foreground))"
      />
    </VisXYContainer>
  </div>
</template>

<style>
:root {
  --vis-tooltip-background-color: none;
  --vis-tooltip-border-color: none;
  --vis-tooltip-text-color: none;
  --vis-tooltip-shadow-color: none;
  --vis-tooltip-backdrop-filter: none;
  --vis-tooltip-padding: none;
}
</style>
