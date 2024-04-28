<script setup lang="ts">
import { VisCrosshair, VisLine, VisScatter, VisTooltip, VisXYContainer } from '@unovis/vue'
import { Line } from '@unovis/ts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import { useConfigStore } from '@/stores/config'

const { themePrimary } = useConfigStore()

type Data = typeof data[number]
const data = [
  { average: 400, today: 240 },
  { average: 300, today: 139 },
  { average: 200, today: 980 },
  { average: 278, today: 390 },
  { average: 189, today: 480 },
  { average: 239, today: 380 },
  { average: 349, today: 430 },
]

const x = (d: Data, i: number) => i
function template(d: Data) {
  return `
<div class="rounded-lg border bg-background p-2 shadow-sm">
  <div class="grid grid-cols-2 gap-2">
    <div class="flex flex-col">
      <span class="text-[0.70rem] uppercase text-muted-foreground">
        Average
      </span>
      <span class="font-bold text-muted-foreground">
        ${d.average}
      </span>
    </div>
    <div class="flex flex-col">
      <span class="text-[0.70rem] uppercase text-muted-foreground">
        Today
      </span>
      <span class="font-bold text-white">
        ${d.today}
      </span>
    </div>
  </div>
</div>`
}

function computeLineOpacity(val: any, index: number) {
  if (index === 0)
    return '0.5'
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Exercise Minutes</CardTitle>
      <CardDescription>
        Your exercise minutes are ahead of where you normally are.
      </CardDescription>
    </CardHeader>
    <CardContent class="pb-4">
      <div class="h-[200px]">
        <VisXYContainer
          height="200px"
          :data="data"
          :margin="{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }"
          :style="{
            '--theme-primary': themePrimary,
            '--vis-tooltip-padding': '0px',
            '--vis-tooltip-background-color': 'transparent',
            '--vis-tooltip-border-color': 'transparent',
          }"
        >
          <VisTooltip />
          <VisLine :x="x" :y="[(d: Data) => d.average, (d: Data) => d.today]" :stroke-width="2" color="var(--theme-primary)" :attributes="{ [Line.selectors.linePath]: { opacity: computeLineOpacity } }" />
          <VisScatter :x="x" :y="[(d: Data) => d.average, (d: Data) => d.today]" :size="6" :stroke-width="2" stroke-color="var(--theme-primary)" color="white" />
          <VisCrosshair :template="template" />
        </VisXYContainer>
      </div>
    </CardContent>
  </Card>
</template>
