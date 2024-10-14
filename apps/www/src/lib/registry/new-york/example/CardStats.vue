<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/registry/new-york/ui/card'
import { BarChart } from '@/lib/registry/new-york/ui/chart-bar'
import { LineChart } from '@/lib/registry/new-york/ui/chart-line'
import { VisScatter } from '@unovis/vue'

type Data = typeof data[number]
const data = [
  { revenue: 10400, subscription: 240 },
  { revenue: 14405, subscription: 300 },
  { revenue: 9400, subscription: 200 },
  { revenue: 8200, subscription: 278 },
  { revenue: 7000, subscription: 189 },
  { revenue: 9600, subscription: 239 },
  { revenue: 11244, subscription: 278 },
  { revenue: 26475, subscription: 189 },
]
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-normal">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          $15,231.89
        </div>
        <p class="text-xs text-muted-foreground">
          +20.1% from last month
        </p>

        <div class="h-20">
          <LineChart
            class="h-[80px]"
            :data="data"
            :margin="{ top: 5, right: 10, left: 10, bottom: 0 }"
            :categories="['revenue']"
            :index="'revenue'"
            :show-grid-line="false"
            :show-legend="false"
            :show-tooltip="false"
            :show-x-axis="false"
            :show-y-axis="false"
          >
            <VisScatter
              color="white"
              stroke-color="hsl(var(--primary))"
              :x="(d: Data, i: number) => i"
              :y="(d: Data) => d.revenue"
              :size="6"
              :stroke-width="2"
            />
          </LineChart>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="pb-2">
        <CardTitle class="text-lg">
          Subscriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          +2,350
        </div>
        <p class="text-xs text-muted-foreground">
          +54.8% from last month
        </p>

        <div class="mt-4 h-20">
          <BarChart
            class="h-[80px]"
            :data="data"
            :categories="['subscription']"
            :index="'subscription'"
            :show-grid-line="false"
            :show-legend="false"
            :show-x-axis="false"
            :show-y-axis="false"
            :show-tooltip="false"
          />
          <!-- <VisXYContainer
            height="80px" :data="data"
          >
            <VisStackedBar
              :x="(d: Data, i:number) => i"
              :y="(d: Data) => d.subscription"
              :bar-padding="0.1"
              :rounded-corners="0" color="hsl(var(--primary))"
            />
          </VisXYContainer> -->
        </div>
      </CardContent>
    </Card>
  </div>
</template>
