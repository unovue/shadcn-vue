import type { Component } from 'vue'
import ChartAreaAxes from '~/registry/new-york-v4/charts/ChartAreaAxes.vue'
import ChartAreaGradient from '~/registry/new-york-v4/charts/ChartAreaGradient.vue'
import ChartAreaIcons from '~/registry/new-york-v4/charts/ChartAreaIcons.vue'
import ChartAreaInteractive from '~/registry/new-york-v4/charts/ChartAreaInteractive.vue'
import ChartBarDefault from '~/registry/new-york-v4/charts/ChartBarDefault.vue'
import ChartBarHorizontal from '~/registry/new-york-v4/charts/ChartBarHorizontal.vue'
import ChartBarInteractive from '~/registry/new-york-v4/charts/ChartBarInteractive.vue'
import ChartBarMultiple from '~/registry/new-york-v4/charts/ChartBarMultiple.vue'
import ChartLineDefault from '~/registry/new-york-v4/charts/ChartLineDefault.vue'
import ChartLineInteractive from '~/registry/new-york-v4/charts/ChartLineInteractive.vue'
import ChartLineLinear from '~/registry/new-york-v4/charts/ChartLineLinear.vue'
import ChartLineStep from '~/registry/new-york-v4/charts/ChartLineStep.vue'
import ChartPieDonut from '~/registry/new-york-v4/charts/ChartPieDonut.vue'
import ChartPieDonutText from '~/registry/new-york-v4/charts/ChartPieDonutText.vue'
import ChartPieSimple from '~/registry/new-york-v4/charts/ChartPieSimple.vue'
import ChartTooltipDefault from '~/registry/new-york-v4/charts/ChartTooltipDefault.vue'
import ChartTooltipIcons from '~/registry/new-york-v4/charts/ChartTooltipIcons.vue'
import ChartTooltipIndicatorLine from '~/registry/new-york-v4/charts/ChartTooltipIndicatorLine.vue'
import ChartTooltipIndicatorNone from '~/registry/new-york-v4/charts/ChartTooltipIndicatorNone.vue'
import ChartTooltipLabelCustom from '~/registry/new-york-v4/charts/ChartTooltipLabelCustom.vue'
import ChartTooltipLabelFormatter from '~/registry/new-york-v4/charts/ChartTooltipLabelFormatter.vue'
import ChartTooltipLabelNone from '~/registry/new-york-v4/charts/ChartTooltipLabelNone.vue'
// import ChartPieStacked from '~/registry/new-york-v4/charts/ChartPieStacked.vue'

interface ChartItem {
  id: string
  component: Component
  fullWidth?: boolean
}

interface ChartGroups {
  area: ChartItem[]
  bar: ChartItem[]
  line: ChartItem[]
  pie: ChartItem[]
  // radar: ChartItem[]
  // radial: ChartItem[]
  tooltip: ChartItem[]
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
  bar: [
    {
      id: 'ChartBarInteractive',
      component: ChartBarInteractive,
      fullWidth: true,
    },
    { id: 'ChartBarDefault', component: ChartBarDefault },
    { id: 'ChartBarHorizontal', component: ChartBarHorizontal },
    { id: 'ChartBarMultiple', component: ChartBarMultiple },
    // { id: "chart-bar-stacked", component: ChartBarStacked },
    // { id: "chart-bar-label", component: ChartBarLabel },
    // { id: "chart-bar-label-custom", component: ChartBarLabelCustom },
    // { id: "chart-bar-mixed", component: ChartBarMixed },
    // { id: "chart-bar-active", component: ChartBarActive },
    // { id: "chart-bar-negative", component: ChartBarNegative },
  ],
  line: [
    {
      id: 'ChartLineInteractive',
      component: ChartLineInteractive,
      fullWidth: true,
    },
    { id: 'ChartLineDefault', component: ChartLineDefault },
    { id: 'ChartLineLinear', component: ChartLineLinear },
    { id: 'ChartLineStep', component: ChartLineStep },
  //   { id: "chart-line-multiple", component: ChartLineMultiple },
  //   { id: "chart-line-dots", component: ChartLineDots },
  //   { id: "chart-line-dots-custom", component: ChartLineDotsCustom },
  //   { id: "chart-line-dots-colors", component: ChartLineDotsColors },
  //   { id: "chart-line-label", component: ChartLineLabel },
  //   { id: "chart-line-label-custom", component: ChartLineLabelCustom },
  ],
  pie: [
    { id: 'ChartPieSimple', component: ChartPieSimple },
    //   { id: "chart-pie-separator-none", component: ChartPieSeparatorNone },
    //   { id: "chart-pie-label", component: ChartPieLabel },
    //   { id: "chart-pie-label-custom", component: ChartPieLabelCustom },
    //   { id: "chart-pie-label-list", component: ChartPieLabelList },
    //   { id: "chart-pie-legend", component: ChartPieLegend },
    { id: 'ChartPieDonut', component: ChartPieDonut },
    //   { id: "chart-pie-donut-active", component: ChartPieDonutActive },
    { id: 'ChartPieDonutText', component: ChartPieDonutText },
    // { id: 'ChartPieStacked', component: ChartPieStacked },
  //   { id: "chart-pie-interactive", component: ChartPieInteractive },
  ],
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
  tooltip: [
    { id: 'ChartTooltipDefault', component: ChartTooltipDefault },
    { id: 'ChartTooltipIndicatorLine', component: ChartTooltipIndicatorLine },
    { id: 'ChartTooltipIndicatorNone', component: ChartTooltipIndicatorNone },
    { id: 'ChartTooltipLabelCustom', component: ChartTooltipLabelCustom },
    { id: 'ChartTooltipLabelFormatter', component: ChartTooltipLabelFormatter },
    { id: 'ChartTooltipLabelNone', component: ChartTooltipLabelNone },
    //   { id: "chart-tooltip-formatter", component: ChartTooltipFormatter },
    { id: 'ChartTooltipIcons', component: ChartTooltipIcons },
  //   { id: "chart-tooltip-advanced", component: ChartTooltipAdvanced },
  ],
}
