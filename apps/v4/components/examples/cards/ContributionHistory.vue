<script setup lang="ts">
import { Button } from '@/styles/reka-rhea/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import { Item, ItemContent, ItemDescription } from '@/styles/reka-rhea/ui/item'

const chartData = [
  { month: 'Dec', amount: 800 },
  { month: 'Jan', amount: 1100 },
  { month: 'Feb', amount: 900 },
  { month: 'Mar', amount: 1300 },
  { month: 'Apr', amount: 750 },
]

const maxAmount = Math.max(...chartData.map(item => item.amount))
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Contribution History</CardTitle>
      <CardDescription>Last 6 months of activity</CardDescription>
    </CardHeader>
    <CardContent>
      <div
        class="flex h-[200px] w-full items-end gap-3"
        role="img"
        aria-label="Last 6 months of contribution activity"
      >
        <div
          v-for="(item, index) in chartData"
          :key="item.month"
          class="flex h-full flex-1 flex-col justify-end gap-2"
        >
          <div
            :data-index="index"
            class="data-[index=5]:bg-chart-6 min-h-2 rounded-lg data-[index=0]:bg-chart-1 data-[index=1]:bg-chart-2 data-[index=2]:bg-chart-3 data-[index=3]:bg-chart-4 data-[index=4]:bg-chart-5"
            :style="{ height: `${(item.amount / maxAmount) * 100}%` }"
          />
          <span class="text-center text-xs text-muted-foreground">
            {{ item.month }}
          </span>
        </div>
      </div>
    </CardContent>
    <CardContent>
      <div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
        <Item variant="muted" class="flex-col items-stretch">
          <ItemContent class="gap-1">
            <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Upcoming
            </ItemDescription>
            <span class="cn-font-heading text-base font-semibold">
              May 2024
            </span>
            <span class="text-sm text-muted-foreground">Scheduled</span>
          </ItemContent>
        </Item>
        <Item
          variant="muted"
          class="hidden flex-col items-stretch xl:flex"
        >
          <ItemContent class="gap-1">
            <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Savings Plan
            </ItemDescription>
            <span class="cn-font-heading text-base font-semibold">
              Accelerated
            </span>
            <span class="text-sm text-muted-foreground">Recurring</span>
          </ItemContent>
        </Item>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        View Full Report
      </Button>
    </CardFooter>
  </Card>
</template>
