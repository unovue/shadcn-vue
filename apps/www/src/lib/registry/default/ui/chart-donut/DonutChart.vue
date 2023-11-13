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
  valueFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  showTooltip?: boolean
  showLegend?: boolean
}>(), {
  colors: () => defaultColors,
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
</script>

<template>
  <div :class="cn('w-full h-48 flex flex-col items-end', $attrs.class ?? '')">
    <VisSingleContainer :style="{ height: isMounted ? '100%' : 'auto' }" :margin="{ left: 20, right: 20 }" :data="data">
      <ChartSingleTooltip :selector="Donut.selectors.segment" :index="category" :items="legendItems" />

      <VisDonut
        :value="(d: Data) => d[category]"
        :sort-function="(a: Data, b: Data) => (a[category] - b[category])"
        :color="colors"
        :arc-width="type === 'donut' ? 20 : 0"
        :show-background="false"
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
