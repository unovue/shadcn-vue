<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
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
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"
import {
  Item,
  ItemContent,
  ItemDescription,
} from "@/registry/bases/reka/ui/item"

const chartData = [
  { month: "Dec", index: 0, amount: 800 },
  { month: "Jan", index: 1, amount: 1100 },
  { month: "Feb", index: 2, amount: 900 },
  { month: "Mar", index: 3, amount: 1300 },
  { month: "Apr", index: 4, amount: 750 },
  { month: "May", index: 5, amount: 1400 },
]

type Data = typeof chartData[number]

const chartConfig = {
  amount: {
    label: "Contribution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Contribution History</CardTitle>
      <CardDescription>Last 6 months of activity</CardDescription>
      <CardAction>
        <Badge variant="secondary">
          +12% vs last month
        </Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="h-[200px] w-full">
        <VisXYContainer :data="chartData" :margin="{ left: 4, right: 4, top: 8, bottom: 4 }">
          <VisGroupedBar
            :x="(d: Data) => d.index"
            :y="[(d: Data) => d.amount]"
            :color="[chartConfig.amount.color]"
            :rounded-corners="6"
            :bar-padding="0.05"
          />
          <VisAxis
            type="x"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="chartData.length"
            :tick-format="(v: number) => chartData[v]?.month ?? ''"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true, class: 'min-w-40' })"
            color="#0000"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-4">
      <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <Item variant="muted" class="flex-col items-stretch">
          <ItemContent class="gap-1">
            <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Upcoming
            </ItemDescription>
            <span class="cn-font-heading text-lg font-semibold">
              May 25, 2024
            </span>
            <span class="text-sm text-muted-foreground">
              $1,000 scheduled
            </span>
          </ItemContent>
        </Item>
        <Item variant="muted" class="flex-col items-stretch">
          <ItemContent class="gap-1">
            <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Auto-Save Plan
            </ItemDescription>
            <span class="cn-font-heading text-lg font-semibold">
              Accelerated
            </span>
            <span class="text-sm text-muted-foreground">
              Recurring weekly
            </span>
          </ItemContent>
        </Item>
      </div>
      <Button class="w-full">
        View Full Report
      </Button>
    </CardFooter>
  </Card>
</template>
