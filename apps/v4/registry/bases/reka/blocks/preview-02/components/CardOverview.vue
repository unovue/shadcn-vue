<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisGroupedBar, VisXYContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"

const activityData = [
  { month: "Jan", index: 0, amount: 40 },
  { month: "Feb", index: 1, amount: 55 },
  { month: "Mar", index: 2, amount: 35 },
  { month: "Apr", index: 3, amount: 60 },
  { month: "May", index: 4, amount: 45 },
  { month: "Jun", index: 5, amount: 50 },
  { month: "Jul", index: 6, amount: 65 },
  { month: "Aug", index: 7, amount: 40 },
  { month: "Sep", index: 8, amount: 55 },
  { month: "Oct", index: 9, amount: 70 },
  { month: "Nov", index: 10, amount: 45 },
  { month: "Dec", index: 11, amount: 80 },
]

type Data = typeof activityData[number]

const chartConfig = {
  amount: {
    label: "Activity",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <Card>
      <CardContent>
        <CardDescription>Card Balance</CardDescription>
        <CardTitle class="text-2xl tabular-nums">
          US$12.94
        </CardTitle>
        <CardDescription class="tabular-nums">
          US$11,337.06 Available
        </CardDescription>
      </CardContent>
    </Card>
    <Card class="flex flex-col justify-between">
      <CardContent class="flex flex-1 flex-col justify-between">
        <div class="flex flex-col gap-1">
          <CardDescription>Payment Due</CardDescription>
          <CardTitle class="text-2xl">
            1 Apr
          </CardTitle>
        </div>
        <Button variant="outline" size="sm" class="mt-3 w-full">
          Pay Early
        </Button>
      </CardContent>
    </Card>
    <Card class="col-span-2">
      <CardContent class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <CardDescription>Yearly Activity</CardDescription>
          <Badge variant="secondary">
            +US$0.25 Daily Cash
          </Badge>
        </div>
        <ChartContainer :config="chartConfig" class="h-20 w-full">
          <VisXYContainer :data="activityData" :margin="{ top: 4, right: 0, bottom: 0, left: 0 }">
            <VisGroupedBar
              :x="(d: Data) => d.index"
              :y="[(d: Data) => d.amount]"
              :color="[chartConfig.amount.color]"
              :rounded-corners="3"
            />
            <ChartTooltip />
            <ChartCrosshair
              :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
              color="#0000"
            />
          </VisXYContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
</template>
