<script setup lang="ts">
import type { ChartConfig } from '~/registry/new-york-v4/ui/chart'
import { Line, Scatter } from '@unovis/ts'
import { VisAxis, VisCrosshair, VisLine, VisScatter, VisTooltip, VisXYContainer } from '@unovis/vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import { ChartContainer, componentToString } from '~/registry/new-york-v4/ui/chart'
import ChartTooltipContent from '~/registry/new-york-v4/ui/chart/ChartTooltipContent.vue'

type Data = typeof data[number]

const data = [
  { today: 240, average: 400, day: 1, dayLabel: 'Monday' },
  { today: 139, average: 300, day: 2, dayLabel: 'Tuesday' },
  { today: 980, average: 200, day: 3, dayLabel: 'Wednesday' },
  { today: 390, average: 278, day: 4, dayLabel: 'Thursday' },
  { today: 480, average: 189, day: 5, dayLabel: 'Friday' },
  { today: 380, average: 239, day: 6, dayLabel: 'Saturday' },
  { today: 430, average: 349, day: 7, dayLabel: 'Sunday' },
]

const chartConfig = {
  today: {
    label: 'Today',
    color: 'var(--primary)',
  },
  average: {
    label: 'Average',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

const x = (d: Data) => d.day
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Exercise Minutes</CardTitle>
      <CardDescription>
        Your exercise minutes are ahead of where you normally are.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="w-full md:h-[200px]" cursor>
        <VisXYContainer
          :data="data"
          :margin="{ top: 5, right: 10, left: 10, bottom: 0 }"
          :y-domain="[0, 1000]"
        >
          <VisAxis
            type="x"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :x="x"
            :num-ticks="7"
            :tick-format="(d: number, index: number) => {
              return data[index]?.dayLabel.slice(0, 3)
            }"
          />
          <VisAxis
            type="y"
            :tick-line="false"
            :domain-line="false"
            tick-text-hide-overlapping
            :tick-format="(d: number) => {
              return ''
            }"
          />
          <VisLine
            :x="x"
            :y="(d: Data) => d.today"
            color="var(--color-today)"
          />
          <VisLine
            :x="x"
            :y="(d: Data) => d.average"
            color="var(--color-average)"
            :attributes="{ [Line.selectors.linePath]: { opacity: 0.5 } }"
          />
          <VisScatter
            :x="x"
            :y="(d: Data) => d.today"
            :size="8"
            :stroke-width="2"
            color="var(--color-today)"
          />
          <VisScatter
            :x="x"
            :y="(d: Data) => d.average"
            :size="8"
            :stroke-width="2"
            color="var(--color-average)"
            :attributes="{ [Scatter.selectors.point]: { opacity: 0.5 } }"
          />

          <VisTooltip />
          <VisCrosshair
            color="var(--color-today)"
            :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'dayLabel' })"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
