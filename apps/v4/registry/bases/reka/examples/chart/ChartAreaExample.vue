<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/bases/reka/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/bases/reka/ui/chart"

const areaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
</script>

<template>
  <Example title="Area Chart">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer :config="areaChartConfig">
          <AreaChart
            accessibility-layer
            :data="areaChartData"
            :margin="{
              left: 12,
              right: 12,
            }"
          >
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :axis-line="false"
              :tick-margin="8"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <ChartTooltip
              :cursor="false"
            >
              <ChartTooltipContent indicator="line" />
            </ChartTooltip>
            <Area
              data-key="desktop"
              type="natural"
              fill="var(--color-desktop)"
              :fill-opacity="0.4"
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div class="flex w-full items-start gap-2">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              <IconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                class="size-4"
              />
            </div>
            <div class="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  </Example>
</template>
