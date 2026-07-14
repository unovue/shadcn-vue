<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisGroupedBar, VisXYContainer } from "@unovis/vue"
import {
  Card,
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
import { Progress } from "@/registry/bases/reka/ui/progress"
import { Separator } from "@/registry/bases/reka/ui/separator"

// Hard-edged styles (lyra, sera) flatten the bar corners — mirrors shadcn-ui.
const params = useDesignSystemSearchParams()
const isRounded = computed(() => !["lyra", "sera"].includes(params.style.value))

const chartData = [
  { hour: "6a", index: 0, usage: 1.2 },
  { hour: "8a", index: 1, usage: 2.8 },
  { hour: "10a", index: 2, usage: 3.1 },
  { hour: "12p", index: 3, usage: 2.4 },
  { hour: "2p", index: 4, usage: 3.4 },
  { hour: "4p", index: 5, usage: 2.9 },
  { hour: "6p", index: 6, usage: 3.8 },
  { hour: "8p", index: 7, usage: 3.2 },
]

type Data = typeof chartData[number]

const chartConfig = {
  usage: {
    label: "Usage (kW)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Power Usage</CardTitle>
      <CardDescription>Whole Home</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <ChartContainer :config="chartConfig" class="h-[140px] w-full">
        <VisXYContainer :data="chartData" :margin="{ left: 0, right: 0, top: 4, bottom: 0 }">
          <VisGroupedBar
            :x="(d: Data) => d.index"
            :y="[(d: Data) => d.usage]"
            :color="[chartConfig.usage.color]"
            :rounded-corners="isRounded ? 4 : 0"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
            color="#0000"
          />
        </VisXYContainer>
      </ChartContainer>
      <Separator />
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-0.5">
          <span class="text-sm text-muted-foreground">
            Currently Using
          </span>
          <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-sm text-muted-foreground">Solar Gen</span>
          <span class="text-lg font-semibold text-chart-1 tabular-nums">
            +1.2 kW
          </span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex-col items-start gap-1">
      <span class="text-sm text-muted-foreground">Battery Level</span>
      <div class="flex w-full items-center gap-2">
        <Progress :model-value="85" class="flex-1" />
        <span class="text-sm font-medium tabular-nums">85%</span>
      </div>
    </CardFooter>
  </Card>
</template>
