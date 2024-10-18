<script setup lang="ts">
import ChartContainer from '../ui/chart/ChartContainer.vue'
import { AreaChart } from '@/lib/registry/new-york/ui/chart-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/registry/new-york/ui/card'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Stacked</CardTitle>
      <CardDescription>
        Showing total visitors for the last 6 months
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer>
        <AreaChart :margin="{ bottom: 0, left: -10, right: 0, top: 0 }" :data="chartData" index="month" :show-y-axis="false" :show-legend="false" :categories="['desktop', 'mobile']" />
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp class-name="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
