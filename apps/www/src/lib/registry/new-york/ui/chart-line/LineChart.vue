<script setup lang="ts" generic="T extends Record<string, any>">
import type { BulletLegendItemInterface } from '@unovis/ts'
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { Axis, Line } from '@unovis/ts'
import { computed, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import { ChartCrosshair, ChartLegend, defaultColors } from '@/lib/registry/new-york/ui/chart'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  /**
   * The source data, in which each entry is a dictionary.
   */
  data: T[]
  /**
   * Select the categories from your data. Used to populate the legend and toolip.
   */
  categories: KeyOfT[]
  /**
   * Sets the key to map the data to the axis.
   */
  index: KeyOfT
  /**
   * Change the default colors.
   */
  colors?: string[]
  /**
   * Change the opacity of the non-selected field
   * @default 0.2
   */
  filterOpacity?: number
  /**
   * Function to format X label
   */
  xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  /**
   * Function to format Y label
   */
  yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string
  /**
   * Controls the visibility of the X axis.
   * @default true
   */
  showXAxis?: boolean
  /**
   * Controls the visibility of the Y axis.
   * @default true
   */
  showYAxis?: boolean
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
  /**
   * Controls the visibility of gridline.
   * @default true
   */
  showGridLine?: boolean
}>(), {
  filterOpacity: 0.2,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
})

const emits = defineEmits<{
  legendItemClick: [d: BulletLegendItemInterface, i: number]
}>()

type KeyOfT = Extract<keyof T, string>
type Data = typeof props.data[number]

const index = computed(() => props.index as KeyOfT)
const colors = computed(() => props.colors?.length ? props.colors : defaultColors(props.categories.length))

const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
  name: category,
  color: colors.value[i],
  inactive: false,
})))

const isMounted = useMounted()

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  emits('legendItemClick', d, i)
}
</script>

<template>
  <div :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')">
    <ChartLegend v-if="showLegend" v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />

    <VisXYContainer
      :margin="{ left: 20, right: 20 }"
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
    >
      <ChartCrosshair v-if="showTooltip" :colors="colors" :items="legendItems" :index="index" />

      <template v-for="(category, i) in categories" :key="category">
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
