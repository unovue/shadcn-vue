<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/bases/reka/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/bases/reka/ui/chart"

const radarChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const radarChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>

<template>
  <Example title="Radar Chart">
    <Card class="w-full">
      <CardHeader class="items-center pb-4">
        <CardTitle>Radar Chart - Multiple</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent class="pb-0">
        <ChartContainer
          :config="radarChartConfig"
          class="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart :data="radarChartData">
            <ChartTooltip
              :cursor="false"
            >
              <ChartTooltipContent indicator="line" />
            </ChartTooltip>
            <PolarAngleAxis data-key="month" />
            <PolarGrid />
            <Radar
              data-key="desktop"
              fill="var(--color-desktop)"
              :fill-opacity="0.6"
            />
            <Radar data-key="mobile" fill="var(--color-mobile)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col gap-2">
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
      </CardFooter>
    </Card>
  </Example>
</template>
