<script setup lang="ts" generic="T extends Record<string, any>">
import type { BulletLegendItemInterface } from '@unovis/ts'
import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { Axis, GroupedBar, StackedBar } from '@unovis/ts'
import { computed, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import { ChartCrosshair, ChartLegend, defaultColors } from '@/lib/registry/new-york/ui/chart'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  data: T[]
  categories: string[]
  index: string
  colors?: string[]
  filterOpacity?: number
  type?: 'stacked' | 'grouped'
  xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  showGridLine?: boolean
}>(), {
  colors: () => defaultColors,
  type: 'grouped',
  filterOpacity: 0.2,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
})

const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
  name: category,
  color: props.colors[i],
  inactive: false,
})))

const isMounted = useMounted()

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  // do something when clicked on legend
}

const VisBarComponent = computed(() => props.type === 'grouped' ? VisGroupedBar : VisStackedBar)
const selectorsBar = computed(() => props.type === 'grouped' ? GroupedBar.selectors.bar : StackedBar.selectors.bar)
</script>

<template>
  <div :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')">
    <ChartLegend v-if="showLegend" v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />

    <VisXYContainer :style="{ height: isMounted ? '100%' : 'auto' }" :margin="{ left: 20, right: 20 }" :data="data">
      <ChartCrosshair v-if="showTooltip" :colors="colors" :items="legendItems" :index="index" />

      <VisBarComponent
        :x="(d: T, i: number) => i"
        :y="categories.map(category => (d: T) => d[category]) "
        :color="colors"
        :rounded-corners="4"
        :bar-padding="0.1"
        :attributes="{
          [selectorsBar]: {
            opacity: (d: T, i:number) => {
              const pos = i % categories.length
              return legendItems[pos]?.inactive ? filterOpacity : 1
            },
          },
        }"
      />

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
