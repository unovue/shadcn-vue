import type { Component } from 'vue'
import ChartAreaAxes from '~/registry/new-york-v4/charts/ChartAreaAxes.vue'
import ChartAreaGradient from '~/registry/new-york-v4/charts/ChartAreaGradient.vue'
import ChartAreaIcons from '~/registry/new-york-v4/charts/ChartAreaIcons.vue'
import ChartAreaInteractive from '~/registry/new-york-v4/charts/ChartAreaInteractive.vue'

interface ChartItem {
  id: string
  component: Component
  fullWidth?: boolean
}

interface ChartGroups {
  area: ChartItem[]
  // bar: ChartItem[]
  // line: ChartItem[]
  // pie: ChartItem[]
  // radar: ChartItem[]
  // radial: ChartItem[]
  // tooltip: ChartItem[]
}

export const charts: ChartGroups = {
  area: [
    {
      id: 'ChartAreaInteractive',
      component: ChartAreaInteractive,
      fullWidth: true,
    },
    // { id: "chart-area-default", component: ChartAreaDefault },
    // { id: "chart-area-linear", component: ChartAreaLinear },
    // { id: "chart-area-step", component: ChartAreaStep },
    // { id: "chart-area-legend", component: ChartAreaLegend },
    // { id: "chart-area-stacked", component: ChartAreaStacked },
    // { id: "chart-area-stacked-expand", component: ChartAreaStackedExpand },
    { id: 'ChartAreaIcons', component: ChartAreaIcons },
    // { id: "chart-area-gradient", component: ChartAreaGradient },
    { id: 'ChartAreaGradient', component: ChartAreaGradient },
    { id: 'ChartAreaAxes', component: ChartAreaAxes },
  ],
  // bar: [
  //   {
  //     id: "chart-bar-interactive",
  //     component: ChartBarInteractive,
  //     fullWidth: true,
  //   },
  //   { id: "chart-bar-default", component: ChartBarDefault },
  //   { id: "chart-bar-horizontal", component: ChartBarHorizontal },
  //   { id: "chart-bar-multiple", component: ChartBarMultiple },
  //   { id: "chart-bar-stacked", component: ChartBarStacked },
  //   { id: "chart-bar-label", component: ChartBarLabel },
  //   { id: "chart-bar-label-custom", component: ChartBarLabelCustom },
  //   { id: "chart-bar-mixed", component: ChartBarMixed },
  //   { id: "chart-bar-active", component: ChartBarActive },
  //   { id: "chart-bar-negative", component: ChartBarNegative },
  // ],
  // line: [
  //   {
  //     id: "chart-line-interactive",
  //     component: ChartLineInteractive,
  //     fullWidth: true,
  //   },
  //   { id: "chart-line-default", component: ChartLineDefault },
  //   { id: "chart-line-linear", component: ChartLineLinear },
  //   { id: "chart-line-step", component: ChartLineStep },
  //   { id: "chart-line-multiple", component: ChartLineMultiple },
  //   { id: "chart-line-dots", component: ChartLineDots },
  //   { id: "chart-line-dots-custom", component: ChartLineDotsCustom },
  //   { id: "chart-line-dots-colors", component: ChartLineDotsColors },
  //   { id: "chart-line-label", component: ChartLineLabel },
  //   { id: "chart-line-label-custom", component: ChartLineLabelCustom },
  // ],
  // pie: [
  //   { id: "chart-pie-simple", component: ChartPieSimple },
  //   { id: "chart-pie-separator-none", component: ChartPieSeparatorNone },
  //   { id: "chart-pie-label", component: ChartPieLabel },
  //   { id: "chart-pie-label-custom", component: ChartPieLabelCustom },
  //   { id: "chart-pie-label-list", component: ChartPieLabelList },
  //   { id: "chart-pie-legend", component: ChartPieLegend },
  //   { id: "chart-pie-donut", component: ChartPieDonut },
  //   { id: "chart-pie-donut-active", component: ChartPieDonutActive },
  //   { id: "chart-pie-donut-text", component: ChartPieDonutText },
  //   { id: "chart-pie-stacked", component: ChartPieStacked },
  //   { id: "chart-pie-interactive", component: ChartPieInteractive },
  // ],
  // radar: [
  //   { id: "chart-radar-default", component: ChartRadarDefault },
  //   { id: "chart-radar-dots", component: ChartRadarDots },
  //   { id: "chart-radar-lines-only", component: ChartRadarLinesOnly },
  //   { id: "chart-radar-label-custom", component: ChartRadarLabelCustom },
  //   { id: "chart-radar-grid-custom", component: ChartRadarGridCustom },
  //   { id: "chart-radar-grid-none", component: ChartRadarGridNone },
  //   { id: "chart-radar-grid-circle", component: ChartRadarGridCircle },
  //   {
  //     id: "chart-radar-grid-circle-no-lines",
  //     component: ChartRadarGridCircleNoLines,
  //   },
  //   { id: "chart-radar-grid-circle-fill", component: ChartRadarGridCircleFill },
  //   { id: "chart-radar-grid-fill", component: ChartRadarGridFill },
  //   { id: "chart-radar-multiple", component: ChartRadarMultiple },
  //   { id: "chart-radar-legend", component: ChartRadarLegend },
  //   { id: "chart-radar-icons", component: ChartRadarIcons },
  //   { id: "chart-radar-radius", component: ChartRadarRadius },
  // ],
  // radial: [
  //   { id: "chart-radial-simple", component: ChartRadialSimple },
  //   { id: "chart-radial-label", component: ChartRadialLabel },
  //   { id: "chart-radial-grid", component: ChartRadialGrid },
  //   { id: "chart-radial-text", component: ChartRadialText },
  //   { id: "chart-radial-shape", component: ChartRadialShape },
  //   { id: "chart-radial-stacked", component: ChartRadialStacked },
  // ],
  // tooltip: [
  //   { id: "chart-tooltip-default", component: ChartTooltipDefault },
  //   {
  //     id: "chart-tooltip-indicator-line",
  //     component: ChartTooltipIndicatorLine,
  //   },
  //   {
  //     id: "chart-tooltip-indicator-none",
  //     component: ChartTooltipIndicatorNone,
  //   },
  //   { id: "chart-tooltip-label-custom", component: ChartTooltipLabelCustom },
  //   {
  //     id: "chart-tooltip-label-formatter",
  //     component: ChartTooltipLabelFormatter,
  //   },
  //   { id: "chart-tooltip-label-none", component: ChartTooltipLabelNone },
  //   { id: "chart-tooltip-formatter", component: ChartTooltipFormatter },
  //   { id: "chart-tooltip-icons", component: ChartTooltipIcons },
  //   { id: "chart-tooltip-advanced", component: ChartTooltipAdvanced },
  // ],
}
