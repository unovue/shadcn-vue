<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/bases/reka/ui/card"
import { ChartContainer } from "@/registry/bases/reka/ui/chart"

const radialChartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
]

const radialChartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>

<template>
  <Example title="Radial Chart">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Radial Chart - Shape</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class="flex-1 pb-0">
        <ChartContainer
          :config="radialChartConfig"
          class="mx-auto aspect-square max-h-[210px]"
        >
          <RadialBarChart
            :data="radialChartData"
            :end-angle="100"
            :inner-radius="80"
            :outer-radius="140"
          >
            <PolarGrid
              grid-type="circle"
              :radial-lines="false"
              stroke="none"
              class="first:fill-muted last:fill-background"
              :polar-radius="[86, 74]"
            />
            <RadialBar data-key="visitors" :background="true" />
            <PolarRadiusAxis :tick="false" :tick-line="false" :axis-line="false">
              <Label
                :content="({ viewBox }: any) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return {
                      type: 'text',
                      props: {
                        x: viewBox.cx,
                        y: viewBox.cy,
                        textAnchor: 'middle',
                        dominantBaseline: 'middle',
                      },
                      children: [
                        {
                          type: 'tspan',
                          props: {
                            x: viewBox.cx,
                            y: viewBox.cy,
                            class: 'fill-foreground text-4xl font-bold',
                          },
                          children: radialChartData[0].visitors.toLocaleString(),
                        },
                        {
                          type: 'tspan',
                          props: {
                            x: viewBox.cx,
                            y: (viewBox.cy || 0) + 24,
                            class: 'fill-muted-foreground',
                          },
                          children: 'Visitors',
                        },
                      ],
                    }
                  }
                }"
              />
            </PolarRadiusAxis>
          </RadialBarChart>
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
        <div class="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  </Example>
</template>
