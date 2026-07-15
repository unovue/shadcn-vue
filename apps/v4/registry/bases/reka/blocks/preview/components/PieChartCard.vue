<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { Donut } from "@unovis/ts"
import { VisDonut, VisSingleContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"
import { Progress } from "@/registry/bases/reka/ui/progress"

const pieChartData = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 287 },
  { browser: "edge", visitors: 173 },
]

type Data = typeof pieChartData[number]

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const totalVisitors = pieChartData.reduce((sum, item) => sum + item.visitors, 0)
const topBrowser = pieChartData.reduce((max, item) => item.visitors > max.visitors ? item : max)
const topBrowserShare = Math.round((topBrowser.visitors / totalVisitors) * 100)
const topBrowserLabel = (pieChartConfig as Record<string, { label?: string }>)[topBrowser.browser]?.label ?? "Top"

const donutColors = pieChartData.map(d => (pieChartConfig as Record<string, { color?: string }>)[d.browser]?.color ?? "var(--chart-1)")
</script>

<template>
  <Card>
    <CardHeader class="pb-0">
      <CardTitle>Browser Share</CardTitle>
      <CardDescription>January - June 2026</CardDescription>
      <CardAction>
        <Badge variant="outline">
          {{ topBrowserLabel }}
        </Badge>
      </CardAction>
    </CardHeader>
    <CardContent class="pt-0">
      <ChartContainer
        :config="pieChartConfig"
        class="mx-auto aspect-square max-h-[190px]"
        :style="{
          '--vis-donut-central-label-font-size': 'var(--text-2xl)',
          '--vis-donut-central-label-font-weight': 'var(--font-weight-bold)',
          '--vis-donut-central-label-text-color': 'var(--foreground)',
          '--vis-donut-central-sub-label-text-color': 'var(--muted-foreground)',
        }"
      >
        <VisSingleContainer :data="pieChartData">
          <VisDonut
            :value="(d: Data) => d.visitors"
            :color="donutColors"
            :arc-width="20"
            :central-label="totalVisitors.toLocaleString()"
            central-sub-label="Visitors"
          />
          <ChartTooltip
            :triggers="{
              [Donut.selectors.segment]: componentToString(pieChartConfig, ChartTooltipContent, { hideLabel: true })!,
            }"
          />
        </VisSingleContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-stretch gap-2">
      <div class="flex items-center text-xs">
        <span class="font-medium">{{ topBrowserLabel }}</span>
        <span class="ml-auto text-muted-foreground tabular-nums">
          {{ topBrowserShare }}%
        </span>
      </div>
      <Progress
        :model-value="topBrowserShare"
        class="**:data-[slot=progress-indicator]:bg-chart-3"
      />
    </CardFooter>
  </Card>
</template>
