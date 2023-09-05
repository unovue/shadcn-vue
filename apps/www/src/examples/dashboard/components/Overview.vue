<script setup lang="ts">
import { Axis, StackedBar, XYContainer } from '@unovis/ts'
import { nextTick, onMounted, ref } from 'vue'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

const container = ref<HTMLElement>()

let chart: XYContainer<typeof data[0]>

onMounted(async () => {
  if (!container.value)
    return

  await nextTick()

  const bar = new StackedBar<typeof data[0]>({
    x: (d, i) => i,
    y: d => d.total,
    color: '#adfa1d',
    roundedCorners: 4,
    barPadding: 0.15,
  })

  chart = new XYContainer(container.value, {
    components: [bar],
    height: '350px',
    margin: { left: 20, right: 20 },
    xAxis: new Axis({
      type: 'x',
      numTicks: data.length,
      tickFormat: (index: number) => data[index].name,
      gridLine: false,
      tickLine: false,
      color: '#888888',
    }),
    yAxis: new Axis({
      type: 'y',
      tickFormat: (value: number) => `$${value}`,
      gridLine: false,
      domainLine: false,
      tickLine: false,
      color: '#888888',
    }),
  }, data)
})
</script>

<template>
  <div ref="container" />
</template>
