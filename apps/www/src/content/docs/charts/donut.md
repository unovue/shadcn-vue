---
title: Donut
description: A line chart visually represents data in a circular form, similar to a pie chart but with a central void, emphasizing proportions within categories.
source: apps/www/src/lib/registry/default/ui/chart-donut
label: Alpha
---

<ComponentPreview name="DonutChartDemo"  />

## Installation

<Callout>
Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-donut
```

### Setup

Follow the [guide](/docs/charts.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/DonutChart.md -->

## Example

### Pie Chart

If you want to render pie chart instead, pass `type` as `pie`.

<ComponentPreview name="DonutChartPie"  />

### Color

We generate colors automatically based on the primary and secondary color and assigned them accordingly. Feel free to pass in your own array of colors.

<ComponentPreview name="DonutChartColor"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts.html#custom-tooltip).

<ComponentPreview name="DonutChartCustomTooltip"  />
