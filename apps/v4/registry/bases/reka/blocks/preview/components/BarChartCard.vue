<script setup lang="ts">
import type { ChartConfig } from "@/registry/bases/reka/ui/chart"
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/registry/bases/reka/ui/chart"

// Hard-edged styles (lyra, sera) flatten the bar corners — mirrors shadcn-ui.
const params = useDesignSystemSearchParams()
const isRounded = computed(() => !["lyra", "sera"].includes(params.style.value))

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

type Data = typeof barChartData[number]

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

const desktopTotal = barChartData.reduce((sum, item) => sum + item.desktop, 0)
const mobileTotal = barChartData.reduce((sum, item) => sum + item.mobile, 0)
const desktopDelta = Math.round(((desktopTotal - mobileTotal) / mobileTotal) * 100)
const desktopDeltaPrefix = desktopDelta > 0 ? "+" : ""
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-lg">
        Traffic channels
      </CardTitle>
      <CardDescription class="line-clamp-2 text-sm leading-snug">
        Monthly desktop and mobile traffic for the last six months—compare
        volume and mix across platforms and devices at a glance.
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4 pt-0">
      <ChartContainer :config="barChartConfig" class="max-h-[180px] w-full">
        <VisXYContainer :data="barChartData" :margin="{ left: 0, right: 0, top: 8, bottom: 0 }">
          <VisGroupedBar
            :x="(_d: Data, i: number) => i"
            :y="[(d: Data) => d.desktop, (d: Data) => d.mobile]"
            :color="[barChartConfig.desktop.color, barChartConfig.mobile.color]"
            :rounded-corners="isRounded ? 4 : 0"
          />
          <VisAxis
            type="x"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :tick-format="(_: number, i: number) => barChartData[i]?.month.slice(0, 3) ?? ''"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(barChartConfig, ChartTooltipContent, { indicator: 'dashed' })"
            :color="[barChartConfig.desktop.color, barChartConfig.mobile.color]"
          />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
      <div class="grid w-full grid-cols-3 divide-x divide-border/60">
        <div class="px-2 text-center">
          <div class="text-[0.65rem] text-muted-foreground uppercase">
            Desktop
          </div>
          <div class="text-sm font-medium tabular-nums">
            {{ desktopTotal.toLocaleString() }}
          </div>
        </div>
        <div class="px-2 text-center">
          <div class="text-[0.65rem] text-muted-foreground uppercase">
            Mobile
          </div>
          <div class="text-sm font-medium tabular-nums">
            {{ mobileTotal.toLocaleString() }}
          </div>
        </div>
        <div class="px-2 text-center">
          <div class="text-[0.65rem] text-muted-foreground uppercase">
            Mix Delta
          </div>
          <div class="text-sm font-medium tabular-nums">
            {{ desktopDeltaPrefix }}{{ desktopDelta }}%
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        View report
      </Button>
    </CardFooter>
  </Card>
</template>
