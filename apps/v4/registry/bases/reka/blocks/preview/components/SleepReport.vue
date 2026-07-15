<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisStackedBar, VisXYContainer } from "@unovis/vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { ChartContainer } from "@/registry/bases/reka/ui/chart"

const sleepChartData = [
  { hour: "10pm", deep: 0, light: 30, rem: 0 },
  { hour: "11pm", deep: 20, light: 10, rem: 0 },
  { hour: "12am", deep: 40, light: 0, rem: 10 },
  { hour: "1am", deep: 30, light: 5, rem: 15 },
  { hour: "2am", deep: 10, light: 20, rem: 30 },
  { hour: "3am", deep: 25, light: 10, rem: 20 },
  { hour: "4am", deep: 15, light: 25, rem: 10 },
  { hour: "5am", deep: 5, light: 35, rem: 15 },
  { hour: "6am", deep: 0, light: 20, rem: 25 },
]

type Data = typeof sleepChartData[number]

const sleepChartConfig = {
  deep: {
    label: "Deep",
    color: "var(--chart-1)",
  },
  light: {
    label: "Light",
    color: "var(--chart-2)",
  },
  rem: {
    label: "REM",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const stats = [
  { label: "Deep", value: "2h 10m" },
  { label: "Light", value: "3h 48m" },
  { label: "REM", value: "1h 26m" },
  { label: "Score", value: "84" },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Sleep Report</CardTitle>
      <CardDescription>Last night · 7h 24m</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <ChartContainer :config="sleepChartConfig" class="h-32 w-full">
        <VisXYContainer :data="sleepChartData" :margin="{ left: 0, right: 0, top: 0, bottom: 0 }">
          <VisStackedBar
            :x="(_d: Data, i: number) => i"
            :y="[(d: Data) => d.deep, (d: Data) => d.light, (d: Data) => d.rem]"
            :color="[sleepChartConfig.deep.color, sleepChartConfig.light.color, sleepChartConfig.rem.color]"
            :bar-width="16"
          />
        </VisXYContainer>
      </ChartContainer>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="s in stats"
          :key="s.label"
          class="text-center"
        >
          <div class="text-sm font-medium tabular-nums">
            {{ s.value }}
          </div>
          <div class="text-xs text-muted-foreground">
            {{ s.label }}
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Badge variant="outline">
        Good
      </Badge>
      <Button variant="outline" size="sm" class="ml-auto">
        Details
      </Button>
    </CardFooter>
  </Card>
</template>
