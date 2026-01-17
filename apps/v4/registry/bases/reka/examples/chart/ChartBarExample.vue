<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/bases/reka/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/bases/reka/ui/chart"

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const barChartConfig = {
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
  <Example title="Bar Chart">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer :config="barChartConfig">
          <BarChart accessibility-layer :data="barChartData">
            <CartesianGrid :vertical="false" />
            <XAxis
              data-key="month"
              :tick-line="false"
              :tick-margin="10"
              :axis-line="false"
              :tick-formatter="(value: string) => value.slice(0, 3)"
            />
            <ChartTooltip :cursor="false">
              <ChartTooltipContent indicator="dashed" />
            </ChartTooltip>
            <Bar data-key="desktop" fill="var(--color-desktop)" :radius="4" />
            <Bar data-key="mobile" fill="var(--color-mobile)" :radius="4" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col items-start gap-2">
        <div class="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <IconPlaceholder
            lucide="TrendingUpIcon"
            tabler="IconTrendingUp"
            hugeicons="ChartUpIcon"
            phosphor="TrendUpIcon"
            remixicon="RiLineChartLine"
            class="size-4"
          />
        </div>
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  </Example>
</template>
