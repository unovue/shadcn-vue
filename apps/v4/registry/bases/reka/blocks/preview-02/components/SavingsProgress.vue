<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { Donut } from "@unovis/ts"
import { VisDonut, VisSingleContainer } from "@unovis/vue"
import { Card, CardContent, CardFooter } from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"
import { Separator } from "@/registry/bases/reka/ui/separator"

const chartData = [
  { name: "saved", value: 24000 },
  { name: "remaining", value: 6000 },
]

type Data = typeof chartData[number]

const chartConfig = {
  saved: {
    label: "Saved",
    color: "var(--chart-2)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
</script>

<template>
  <Card>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[220px]"
        :style="{
          '--vis-donut-central-label-font-size': 'var(--text-2xl)',
          '--vis-donut-central-label-font-weight': 'var(--font-weight-bold)',
          '--vis-donut-central-label-text-color': 'var(--foreground)',
          '--vis-donut-central-sub-label-text-color': 'var(--muted-foreground)',
        }"
      >
        <VisSingleContainer :data="chartData" :margin="{ top: 20, bottom: 20 }">
          <VisDonut
            :value="(d: Data) => d.value"
            :color="(d: Data) => chartConfig[d.name as keyof typeof chartConfig].color"
            :arc-width="25"
            :central-label-offset-y="10"
            central-label="$24,000"
            central-sub-label="80% of $30,000"
          />
          <ChartTooltip
            :triggers="{
              [Donut.selectors.segment]: componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })!,
            }"
          />
        </VisSingleContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-0">
      <div class="flex w-full items-center justify-between py-3">
        <span class="text-sm text-muted-foreground">
          Projected Finish
        </span>
        <span class="text-sm font-semibold">October 2024</span>
      </div>
      <Separator />
      <div class="flex w-full items-center justify-between py-3">
        <span class="text-sm text-muted-foreground">Monthly Average</span>
        <span class="text-sm font-semibold tabular-nums">$1,250</span>
      </div>
      <Separator />
      <div class="flex w-full items-center justify-between py-3">
        <span class="text-sm text-muted-foreground">Top Contributor</span>
        <span class="text-sm font-semibold">Auto-Transfer</span>
      </div>
    </CardFooter>
  </Card>
</template>
