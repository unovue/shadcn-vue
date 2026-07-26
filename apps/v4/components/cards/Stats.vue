<script setup lang="ts">
import type { ChartConfig } from '~/registry/new-york-v4/ui/chart'

import { VisArea, VisLine, VisScatter, VisXYContainer } from '@unovis/vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import { ChartContainer } from '~/registry/new-york-v4/ui/chart'

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

const x = (d: Data, i: number) => i

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--primary)',
  },
  subscription: {
    label: 'Subscriptions',
    color: 'var(--primary)',
  },
} satisfies ChartConfig
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    <Card>
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle class="text-3xl">
          $15,231.89
        </CardTitle>
        <CardDescription>+20.1% from last month</CardDescription>
      </CardHeader>
      <CardContent class="pb-0">
        <ChartContainer :config="chartConfig" class="h-[80px] w-full">
          <VisXYContainer
            :data="data"
            :margin="{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }"
          >
            <VisLine :x="x" :y="(d: Data) => d.revenue" color="var(--color-revenue)" />
            <VisScatter :x="x" :y="(d: Data) => d.revenue" :size="6" stroke-color="var(--color-revenue)" :stroke-width="2" color="white" />
          </VisXYContainer>
        </ChartContainer>
      </CardContent>
    </Card>

    <Card class="pb-0 lg:hidden xl:flex">
      <CardHeader>
        <CardDescription>Subscriptions</CardDescription>
        <CardTitle class="text-3xl">
          +2,350
        </CardTitle>
        <CardDescription>+180.1% from last month</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            View More
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent class="mt-auto max-h-[124px] flex-1 p-0">
        <ChartContainer :config="chartConfig" class="size-full">
          <VisXYContainer
            :margin="{
              left: 0,
              right: 0,
            }"
            :data="data"
          >
            <VisArea
              :x="x"
              :y="(d: Data) => d.subscription"
              color="var(--color-subscription)"
              :opacity="0.05"
            />
            <VisLine
              :x="x"
              :y="(d: Data) => d.subscription"
              color="var(--color-subscription)"
            />
          </VisXYContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
</template>
