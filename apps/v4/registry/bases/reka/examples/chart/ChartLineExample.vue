<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/bases/reka/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/bases/reka/ui/chart"

const lineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const lineChartConfig = {
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
  <Example title="Line Chart">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer :config="lineChartConfig">
          <LineChart
            accessibility-layer
            :data="lineChartData"
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
            <ChartTooltip :cursor="false">
              <ChartTooltipContent />
            </ChartTooltip>
            <Line
              data-key="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              :stroke-width="2"
              :dot="false"
            />
            <Line
              data-key="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              :stroke-width="2"
              :dot="false"
            />
          </LineChart>
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
                phosphor="TrendUpIcon"
                remixicon="RiLineChartLine"
                class="size-4"
              />
            </div>
            <div class="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  </Example>
</template>
