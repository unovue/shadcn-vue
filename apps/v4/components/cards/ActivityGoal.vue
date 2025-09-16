<script setup lang="ts">
import type { ChartConfig } from '~/registry/new-york-v4/ui/chart'
import { VisStackedBar, VisXYContainer } from '@unovis/vue'
import { Minus, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import { ChartContainer } from '~/registry/new-york-v4/ui/chart'

const goal = ref(350)

type Data = typeof data[number]
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
]

const chartConfig = {
  goal: {
    label: 'Goal',
    color: 'var(--primary)',
  },
} satisfies ChartConfig
</script>

<template>
  <Card class="h-full gap-5">
    <CardHeader>
      <CardTitle>Move Goal</CardTitle>
      <CardDescription>Set your daily activity goal.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col">
      <div class="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          class="size-7 rounded-full"
          :disabled="goal <= 200"
          @click="goal -= 10"
        >
          <Minus />
          <span class="sr-only">Decrease</span>
        </Button>
        <div class="text-center">
          <div class="text-4xl font-bold tracking-tighter tabular-nums">
            {{ goal }}
          </div>
          <div class="text-muted-foreground text-xs uppercase">
            Calories/day
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="size-7 rounded-full"
          :disabled="goal >= 400"
          @click="goal += 10 "
        >
          <Plus />
          <span class="sr-only">Increase</span>
        </Button>
      </div>

      <div class="flex-1">
        <ChartContainer :config="chartConfig" class="aspect-auto h-[70px] w-full">
          <VisXYContainer :data="data">
            <VisStackedBar
              :x="(d: Data, i :number) => i"
              :y="(d: Data) => d.goal"
              color="var(--color-goal)"
              :bar-padding="0.1"
              :rounded-corners="4"
            />
          </VisXYContainer>
        </ChartContainer>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" variant="secondary">
        Set Goal
      </Button>
    </CardFooter>
  </Card>
</template>
