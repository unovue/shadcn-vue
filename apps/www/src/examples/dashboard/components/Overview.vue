<script setup lang="ts">
import { VisArea, VisAxis, VisXYContainer } from '@unovis/vue'
import { Area } from '@unovis/ts'

type Data = typeof data[number]
const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
]
</script>

<template>
  <VisXYContainer height="350px" :margin="{ left: 20, right: 20 }" :data="data">
    <svg width="0" height="0">
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stop-color="hsl(var(--primary))" stop-opacity="0.8" />
          <stop offset="95%" stop-color="hsl(var(--primary))" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <VisArea
      :x="(d: Data, i: number) => i"
      :y="(d: Data) => d.total"
      color="auto"
      :attributes="{
        [Area.selectors.area]: {
          fill: 'url(#colorUv)',
        },
      }"
      :rounded-corners="4"
      :bar-padding="0.15"
    />
    <VisAxis
      type="x"
      :num-ticks="data.length"
      :tick-format="(index: number) => data[index]?.name"
      :grid-line="false"
      :tick-line="false"
      tick-text-color="hsl(var(--muted-foreground))"
    />
    <VisAxis
      type="y"
      :num-ticks="data.length"
      :tick-format="(index: number) => data[index]?.name"
      :grid-line="false"
      :tick-line="false"
      :domain-line="false"
      tick-text-color="hsl(var(--muted-foreground))"
    />
  </VisXYContainer>
</template>
