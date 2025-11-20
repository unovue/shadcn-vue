<script setup lang="ts">
import type {
  ChartConfig,
} from "@/registry/new-york-v4/ui/chart"
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue"
import { TrendingDown, TrendingUp } from "lucide-vue-next"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/new-york-v4/ui/chart"

const description = "An area chart with axes"

const chartData = [
  { month: 1, monthLabel: "January", desktop: 186, mobile: 80 },
  { month: 2, monthLabel: "February", desktop: 305, mobile: 200 },
  { month: 3, monthLabel: "March", desktop: 237, mobile: 120 },
  { month: 4, monthLabel: "April", desktop: 73, mobile: 190 },
  { month: 5, monthLabel: "May", desktop: 209, mobile: 130 },
  { month: 6, monthLabel: "June", desktop: 214, mobile: 140 },
]

type Data = typeof chartData[number]

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
    icon: TrendingUp,
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
    icon: TrendingDown,
  },
} satisfies ChartConfig
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Icons</CardTitle>
      <CardDescription>
        Showing total visitors for the last 6 months
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig">
        <VisXYContainer :data="chartData" :margin="{ top: 10, bottom: 10 }">
          <VisArea
            :x="(d: Data) => d.month"
            :y="[(d: Data) => d.mobile, (d: Data) => d.desktop]"
            :color="(d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i]"
            :opacity="0.4"
          />
          <VisLine
            :x="(d: Data) => d.month"
            :y="[(d: Data) => d.mobile, (d: Data) => d.mobile + d.desktop]"
            :color="(d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i]"
            :line-width="1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.month"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(d: number, index: number) => {
              return chartData[index].monthLabel.slice(0, 3)
            }"
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
            :tick-format="(d: number, index: number) => ''"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'monthLabel', indicator: 'line' })"
            :color="(d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i % 2]"
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp class="h-4 w-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
