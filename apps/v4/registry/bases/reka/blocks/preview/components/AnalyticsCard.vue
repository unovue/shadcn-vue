<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisArea, VisLine, VisXYContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
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

const chartData = [
  { month: 1, monthLabel: "January", visitors: 186 },
  { month: 2, monthLabel: "February", visitors: 305 },
  { month: 3, monthLabel: "March", visitors: 237 },
  { month: 4, monthLabel: "April", visitors: 73 },
  { month: 5, monthLabel: "May", visitors: 209 },
  { month: 6, monthLabel: "June", visitors: 214 },
]

type Data = typeof chartData[number]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
</script>

<template>
  <Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
    <CardHeader>
      <CardTitle>Analytics</CardTitle>
      <CardDescription>
        418.2K Visitors <Badge>+10%</Badge>
      </CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">
          View Analytics
        </Button>
      </CardAction>
    </CardHeader>
    <ChartContainer :config="chartConfig" class="aspect-[1/0.35]">
      <VisXYContainer :data="chartData" :margin="{ left: 0, right: 0, top: 0, bottom: 0 }">
        <VisArea
          :x="(d: Data) => d.month"
          :y="(d: Data) => d.visitors"
          :color="chartConfig.visitors.color"
          :opacity="0.4"
        />
        <VisLine
          :x="(d: Data) => d.month"
          :y="(d: Data) => d.visitors"
          :color="chartConfig.visitors.color"
        />
        <ChartTooltip />
        <ChartCrosshair
          :template="componentToString(chartConfig, ChartTooltipContent, { indicator: 'line', hideLabel: true })"
          :color="chartConfig.visitors.color"
        />
      </VisXYContainer>
    </ChartContainer>
  </Card>
</template>
