<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"

const areaChartData = [
  { month: 1, monthLabel: "January", desktop: 186 },
  { month: 2, monthLabel: "February", desktop: 305 },
  { month: 3, monthLabel: "March", desktop: 237 },
  { month: 4, monthLabel: "April", desktop: 73 },
  { month: 5, monthLabel: "May", desktop: 209 },
  { month: 6, monthLabel: "June", desktop: 214 },
]

type Data = typeof areaChartData[number]

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const latestVisitors = areaChartData[areaChartData.length - 1]?.desktop ?? 0
const previousVisitors = areaChartData[areaChartData.length - 2]?.desktop ?? latestVisitors
const trendPercent = previousVisitors === 0
  ? 0
  : Math.round(((latestVisitors - previousVisitors) / previousVisitors) * 100)
const trendPrefix = trendPercent > 0 ? "+" : ""
</script>

<template>
  <Card class="pb-0">
    <CardHeader>
      <CardTitle>Visitors</CardTitle>
      <CardDescription>Last 6 months</CardDescription>
      <CardAction>
        <Badge :variant="trendPercent >= 0 ? 'secondary' : 'destructive'">
          {{ trendPrefix }}{{ trendPercent }}% vs last month
        </Badge>
      </CardAction>
    </CardHeader>
    <CardContent class="px-0">
      <ChartContainer :config="areaChartConfig" class="h-48 w-full">
        <VisXYContainer :data="areaChartData" :margin="{ left: 0, right: 0, top: 6, bottom: 0 }">
          <VisArea
            :x="(d: Data) => d.month"
            :y="(d: Data) => d.desktop"
            :color="areaChartConfig.desktop.color"
            :opacity="0.15"
          />
          <VisLine
            :x="(d: Data) => d.month"
            :y="(d: Data) => d.desktop"
            :color="areaChartConfig.desktop.color"
            :line-width="2"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.month"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(_d: number, index: number) => areaChartData[index]?.monthLabel.slice(0, 3) ?? ''"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(areaChartConfig, ChartTooltipContent, { indicator: 'line', labelKey: 'monthLabel' })"
            :color="areaChartConfig.desktop.color"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
