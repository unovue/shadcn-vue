---
title: Line
description: An line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.
source: apps/www/src/lib/registry/default/ui/chart-line
label: Alpha
---

<ComponentPreview name="LineChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-line
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/LineChart.md -->

## Example

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

<ComponentPreview name="LineChartSparkline"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="LineChartCustomTooltip"  />
