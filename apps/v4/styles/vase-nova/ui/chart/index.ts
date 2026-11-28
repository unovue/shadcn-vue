import type { Component, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export { default as ChartContainer } from './ChartContainer.vue'
export { default as ChartLegendContent } from './ChartLegendContent.vue'
export { default as ChartTooltipContent } from './ChartTooltipContent.vue'
export { componentToString } from './utils'

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: string | Component
    icon?: string | Component
  } & (
    | { color?: string, theme?: never }
    | { color?: never, theme: Record<keyof typeof THEMES, string> }
  )
}

interface ChartContextProps {
  id: string
  config: Ref<ChartConfig>
}

const chartContextKey: InjectionKey<ChartContextProps> = Symbol('Chart')

export function provideChartContext(context: ChartContextProps) {
  provide(chartContextKey, context)
}

export function useChart() {
  const context = inject(chartContextKey, null)
  if (!context)
    throw new Error('useChart must be used within a ChartContainer')
  return context
}

export { VisCrosshair as ChartCrosshair, VisTooltip as ChartTooltip } from '@unovis/vue'
