<script setup lang="ts">
import { VisLine, VisScatter, VisStackedBar, VisXYContainer } from '@unovis/vue'

import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'

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

const lineX = (d: Data, i: number) => i
const lineY = (d: Data) => d.revenue
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
          <VisXYContainer
            height="80px"
            :data="data" :margin="{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }"
          >
            <VisLine :x="lineX" :y="lineY" color="hsl(var(--primary))" />
            <VisScatter :x="lineX" :y="lineY" :size="6" stroke-color="hsl(var(--primary))" :stroke-width="2" color="white" />
          </VisXYContainer>
        </div>
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
        <VisXYContainer height="80px" :data="data">
          <VisStackedBar
            :x="lineX"
            :y="(d: Data) => d.subscription"
            :bar-padding="0.1"
            :rounded-corners="0" color="hsl(var(--primary))"
          />
        </VisXYContainer>
      </CardContent>
    </Card>
  </div>
</template>
