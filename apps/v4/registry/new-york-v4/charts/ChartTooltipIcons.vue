<script setup lang="ts">
import type {
  ChartConfig,
} from "@/registry/new-york-v4/ui/chart"
import { VisAxis, VisStackedBar, VisXYContainer } from "@unovis/vue"

import { Footprints, TrendingUp, Waves } from "lucide-vue-next"
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
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/new-york-v4/ui/chart"

const description = "A line chart"

const chartData = [
  { date: new Date("2024-07-15"), running: 450, swimming: 300 },
  { date: new Date("2024-07-16"), running: 380, swimming: 420 },
  { date: new Date("2024-07-17"), running: 520, swimming: 120 },
  { date: new Date("2024-07-18"), running: 140, swimming: 550 },
  { date: new Date("2024-07-19"), running: 600, swimming: 350 },
  { date: new Date("2024-07-20"), running: 480, swimming: 400 },
]

type Data = typeof chartData[number]

const chartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)",
    icon: Footprints,
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
    icon: Waves,
  },
} satisfies ChartConfig
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Tooltip - Icons</CardTitle>
      <CardDescription>Tooltip with icons.</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig">
        <VisXYContainer :data="chartData" :padding="{ top: 10, bottom: 10, left: 10, right: 10 }">
          <VisStackedBar
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.running, (d: Data) => d.swimming]"
            :color="[chartConfig.running.color, chartConfig.swimming.color]"
            :rounded-corners="4"
            :bar-padding="0.1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(d: number) => {
              const date = new Date(d)
              return date.toLocaleDateString('en-US', {
                weekday: 'short',
              })
            }"
            :tick-values="chartData.map(d => d.date)"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
            color="#0000"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-start gap-2 text-sm">
      <div class="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp class="h-4 w-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
