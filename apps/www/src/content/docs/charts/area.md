---
title: Area
description: An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.
source: apps/www/src/lib/registry/default/ui/chart-area
label: Alpha
---

<ComponentPreview name="AreaChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-area
```

### Setup

Follow the [guide](/docs/charts/guide.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/AreaChart.md -->

## Example

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="AreaChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](http://localhost:5173/docs/charts/guide.html#custom-tooltip).

<ComponentPreview name="AreaChartCustomTooltip"  />
