<script setup lang="ts" generic="T extends Record<string, any>">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { Donut } from '@unovis/ts'
import { computed, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import { ChartSingleTooltip, defaultColors } from '@/lib/registry/default/ui/chart'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  /**
   * The source data, in which each entry is a dictionary.
   */
  data: T[]
  /**
   * Sets the key to map the data to the chart.
   */
  index: string
  /**
   * Sets the name of the key containing the quantitative chart values.
   */
  category: string
  /**
   * Change the default colors.
   */
  colors?: string[]
  /**
   * Change the type of the chart
   * @default "donut"
   */
  type?: 'donut' | 'pie'
  /**
   * Change the opacity of the non-selected field
   * @default 0.2
   */
  filterOpacity?: number
  /**
   * Function to sort the segment
   */
  sortFunction?: (a: any, b: any) => number | undefined
  /**
   * Controls the formatting for the label.
   */
  valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string
  /**
   * Controls the visibility of tooltip.
   * @default true
   */
  showTooltip?: boolean
  /**
   * Controls the visibility of legend.
   * @default true
   */
  showLegend?: boolean
}>(), {
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
const colors = computed(() => props.colors?.length ? props.colors : defaultColors(props.data.filter(d => d[props.category]).filter(Boolean).length))
const legendItems = computed(() => props.data.map((item, i) => ({
  name: item[props.index],
  color: colors.value[i],
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
            click: (d: Data, ev: PointerEvent, i: number, elements: HTMLElement[]) => {
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
