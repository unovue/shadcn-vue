<script lang="ts" setup>
import ChartsLayout from '../../layout/ChartsLayout.vue'
import ChartDisplay from './ChartDisplay.vue'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import ChartAreaStacked from '@/lib/registry/new-york/block/ChartAreaStacked.vue'
</script>

<template>
  <ChartsLayout>
    <div class="gap-6 md:flex md:flex-row-reverse md:items-start">
      <!-- <ChartsThemeSwitcher
            :themes="chartThemes"
            class="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
          /> -->
      <div class="grid flex-1 gap-12">
        <h2 class="sr-only">
          Examples
        </h2>
        <div class="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
          <ChartDisplay name="chart-area-stacked">
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-multiple">
            <!-- <Charts.ChartBarMultiple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay
            name="chart-pie-donut-text"
            class="[&_[data-chart]]:xl:max-h-[243px]"
          >
            <!-- <Charts.ChartPieDonutText /> -->
            <ChartAreaStacked />
          </ChartDisplay>
        </div>
        <div class="hidden gap-4 md:grid">
          <ChartsNav />
          <Separator />
        </div>
        <div
          id="area-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-area-default">
            <!-- <Charts.ChartAreaDefault /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-linear">
            <!-- <Charts.ChartAreaLinear /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-step">
            <!-- <Charts.ChartAreaStep /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-stacked">
            <!-- <Charts.ChartAreaStacked /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-stacked-expand">
            <!-- <Charts.ChartAreaStackedExpand /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-legend">
            <!-- <Charts.ChartAreaLegend /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-icons">
            <!-- <Charts.ChartAreaIcons /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-gradient">
            <!-- <Charts.ChartAreaGradient /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-area-axes">
            <!-- <Charts.ChartAreaAxes /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <div class="md:col-span-2 lg:col-span-3">
            <ChartDisplay name="chart-area-interactive">
              <!-- <Charts.ChartAreaInteractive /> -->
              <ChartAreaStacked />
            </ChartDisplay>
          </div>
        </div>
        <Separator />
        <div
          id="bar-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-bar-default">
            <!-- <Charts.ChartBarDefault /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-horizontal">
            <!-- <Charts.ChartBarHorizontal /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-multiple">
            <!-- <Charts.ChartBarMultiple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-label">
            <!-- <Charts.ChartBarLabel /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-label-custom">
            <!-- <Charts.ChartBarLabelCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-mixed">
            <!-- <Charts.ChartBarMixed /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-stacked">
            <!-- <Charts.ChartBarStacked /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-active">
            <!-- <Charts.ChartBarActive /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-bar-negative">
            <!-- <Charts.ChartBarNegative /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <div class="md:col-span-2 lg:col-span-3">
            <ChartDisplay name="chart-bar-interactive">
              <!-- <Charts.ChartBarInteractive /> -->
              <ChartAreaStacked />
            </ChartDisplay>
          </div>
        </div>
        <Separator />
        <div
          id="line-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-line-default">
            <!-- <Charts.ChartLineDefault /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-linear">
            <!-- <Charts.ChartLineLinear /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-step">
            <!-- <Charts.ChartLineStep /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-multiple">
            <!-- <Charts.ChartLineMultiple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-dots">
            <!-- <Charts.ChartLineDots /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-dots-custom">
            <!-- <Charts.ChartLineDotsCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-dots-colors">
            <!-- <Charts.ChartLineDotsColors /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-label">
            <!-- <Charts.ChartLineLabel /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-line-label-custom">
            <!-- <Charts.ChartLineLabelCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <div class="md:col-span-2 lg:col-span-3">
            <ChartDisplay name="chart-line-interactive">
              <!-- <Charts.ChartLineInteractive /> -->
              <ChartAreaStacked />
            </ChartDisplay>
          </div>
        </div>
        <Separator />
        <div
          id="pie-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-pie-simple">
            <!-- <Charts.ChartPieSimple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-separator-none">
            <!-- <Charts.ChartPieSeparatorNone /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-label">
            <!-- <Charts.ChartPieLabel /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-label-custom">
            <!-- <Charts.ChartPieLabelCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-label-list">
            <!-- <Charts.ChartPieLabelList /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-legend">
            <!-- <Charts.ChartPieLegend /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-donut">
            <!-- <Charts.ChartPieDonut /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-donut-active">
            <!-- <Charts.ChartPieDonutActive /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-donut-text">
            <!-- <Charts.ChartPieDonutText /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-stacked">
            <!-- <Charts.ChartPieStacked /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-pie-interactive">
            <!-- <Charts.ChartPieInteractive /> -->
            <ChartAreaStacked />
          </ChartDisplay>
        </div>
        <Separator />
        <div
          id="radar-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-radar-default">
            <!-- <Charts.ChartRadarDefault /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-dots">
            <!-- <Charts.ChartRadarDots /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-multiple">
            <!-- <Charts.ChartRadarMultiple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-lines-only">
            <!-- <Charts.ChartRadarLinesOnly /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-label-custom">
            <!-- <Charts.ChartRadarLabelCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-radius">
            <!-- <Charts.ChartRadarRadius /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-custom">
            <!-- <Charts.ChartRadarGridCustom /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-fill">
            <!-- <Charts.ChartRadarGridFill /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-none">
            <!-- <Charts.ChartRadarGridNone /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-circle">
            <!-- <Charts.ChartRadarGridCircle /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-circle-no-lines">
            <!-- <Charts.ChartRadarGridCircleNoLines /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-grid-circle-fill">
            <!-- <Charts.ChartRadarGridCircleFill /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-legend">
            <!-- <Charts.ChartRadarLegend /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radar-icons">
            <!-- <Charts.ChartRadarIcons /> -->
            <ChartAreaStacked />
          </ChartDisplay>
        </div>
        <Separator />
        <div
          id="radial-chart"
          class="chart-wrapper grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
        >
          <ChartDisplay name="chart-radial-simple">
            <!-- <Charts.ChartRadialSimple /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radial-label">
            <!-- <Charts.ChartRadialLabel /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radial-grid">
            <!-- <Charts.ChartRadialGrid /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radial-text">
            <!-- <Charts.ChartRadialText /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radial-shape">
            <!-- <Charts.ChartRadialShape /> -->
            <ChartAreaStacked />
          </ChartDisplay>
          <ChartDisplay name="chart-radial-stacked">
            <!-- <Charts.ChartRadialStacked /> -->
            <ChartAreaStacked />
          </ChartDisplay>
        </div>
      </div>
    </div>
  </ChartsLayout>
</template>
