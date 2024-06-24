---
title: Charts
description: Versatile visualization tool, allowing users to represent data using various types of charts for effective analysis.
label: Alpha
---

<script setup>
import Area from '~icons/gravity-ui/chart-area-stacked'
import Bar from '~icons/gravity-ui/chart-column'
import Line from '~icons/gravity-ui/chart-line'
import Pie from '~icons/gravity-ui/chart-pie'
</script>

<Callout>
  Only works with Vue >3.3
</Callout>

`Charts` components were built on top of [Unovis](https://unovis.dev/) (a modular data visualization framework), and inspired by [tremor](https://www.tremor.so).

## Chart type

<div class="grid gap-4 mt-8 sm:grid-cols-2 sm:gap-6 not-docs">
  <LinkedCard href="/docs/charts/area">
    <Area class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Area</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/line">
    <Line class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Line</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/bar">
    <Bar class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Bar</p>
  </LinkedCard>

  <LinkedCard href="/docs/charts/donut">
    <Pie class="text-foreground/80 w-11 h-11" />
    <p class="mt-2 font-medium">Donut</p>
  </LinkedCard>
</div>

## Installation

<Steps>

### Update `css`

Add the following tooltip styling to your `tailwind.css` file:

```css
@layer base {
  :root {
    /* ... */
    --vis-tooltip-background-color: none !important;
    --vis-tooltip-border-color: none !important;
    --vis-tooltip-text-color: none !important;
    --vis-tooltip-shadow-color: none !important;
    --vis-tooltip-backdrop-filter: none !important;
    --vis-tooltip-padding: none !important;

    --vis-primary-color: var(--primary);
    /* change to any hsl value you want */
    --vis-secondary-color: 160 81% 40%;
    --vis-text-color: var(--muted-foreground);
  }
```

If you are not using `css-variables` for your component, you need to update the `--vis-primary-color` and `--vis-text-color` to your desired hsl value.

You may use [this tool](https://redpixelthemes.com/blog/tailwindcss-colors-different-formats/) to help you find the hsl value for your primary color and text color. Be sure to provide `dark` mode styling as well.

</Steps>

## Colors

By default, we construct the primary theme color, and secondary (`--vis-secondary-color`) color with different opacity for the graph.

However, you can always pass in the desired `color` into each chart.

```vue
<template>
  <AreaChart
    :data="data"
    :colors="['blue', 'pink', 'orange', 'red']"
  />
</template>
```

## Custom tooltip

If you want to customize the `Tooltip` for the chart, you can pass `customTooltip` prop with a custom Vue component.
The custom component would receive `title` and `data` props, check out [ChartTooltip.vue component](https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/lib/registry/default/ui/chart/ChartTooltip.vue) for example.

The expected prop definition would be:

```ts
defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
```
