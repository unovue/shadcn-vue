export { default as ChartTooltip } from './ChartTooltip.vue'
export { default as ChartSingleTooltip } from './ChartSingleTooltip.vue'
export { default as ChartLegend } from './ChartLegend.vue'
export { default as ChartCrosshair } from './ChartCrosshair.vue'

const COLOR_COUNT = 3
export const defaultColors = [
  ...Array.from(Array(COLOR_COUNT).keys()).map(i => `hsl(var(--primary) / ${1 - (1 / COLOR_COUNT) * i})`),
  ...Array.from(Array(COLOR_COUNT).keys()).map(i => `hsl(var(--secondary) / ${1 - (1 / COLOR_COUNT) * i})`),
]
