<script setup lang="ts">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { computed, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import { ChartSingleTooltip, defaultColors } from '@/lib/registry/new-york/ui/chart'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  data: any[]
  index: string
  category: string
  colors?: string[]
  type?: 'donut' | 'pie'
  filterOpacity?: number
  sortFunction?: (a: any, b: any) => number | undefined
  valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string
  showTooltip?: boolean
  showLegend?: boolean
}>(), {
  colors: () => defaultColors,
  sortFunction: () => undefined,
  valueFormatter: (tick: number) => `${tick}`,
  type: 'donut',
  filterOpacity: 0.2,
  showTooltip: true,
  showLegend: true,
})

type Data = typeof props.data[number]

const isMounted = useMounted()

const activeSegmentKey = ref<string>()
const legendItems = computed(() => props.data.map((item, i) => ({
  name: item[props.index],
  color: props.colors[i],
  inactive: false,
})))

const totalValue = computed(() => props.data.reduce((prev, curr) => {
  return prev + curr[props.category]
}, 0))
</script>

<template>
  <div :class="cn('w-full h-48 flex flex-col items-end', $attrs.class ?? '')">
    <VisSingleContainer :style="{ height: isMounted ? '100%' : 'auto' }" :margin="{ left: 20, right: 20 }" :data="data">
      <ChartSingleTooltip
        :selector="Donut.selectors.segment"
        :index="category"
        :items="legendItems"
        :value-formatter="valueFormatter"
      />

      <VisDonut
        :value="(d: Data) => d[category]"
        :sort-function="sortFunction"
        :color="colors"
        :arc-width="type === 'donut' ? 20 : 0"
        :show-background="false"
        :central-label="valueFormatter(totalValue)"
        :events="{
          [Donut.selectors.segment]: {
            click: (d: any, ev: PointerEvent, i: number, elements: HTMLElement[]) => {
              if (d?.data?.[index] === activeSegmentKey) {
                activeSegmentKey = undefined
                elements.forEach(el => el.style.opacity = '1')
              }
              else {
                activeSegmentKey = d?.data?.[index]
                elements.forEach(el => el.style.opacity = `${filterOpacity}`)
                elements[i].style.opacity = '1'
              }
            },
          },
        }"
      />
    </VisSingleContainer>
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
