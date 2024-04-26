---
title: Bar
description: An line chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.
source: apps/www/src/lib/registry/default/ui/chart-bar
label: Alpha
---

<ComponentPreview name="BarChartDemo"  />

## Installation

<Callout>
  Only works with Vue >3.3
</Callout>

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add chart-bar
```

### Setup

Follow the [guide](/docs/charts/guide.html#installation) to complete the setup.

</Steps>

## API

<!-- @include: @/content/meta/BarChart.md -->

## Example

### Stacked

You can stack the bar chart by settings prop `type` to `stacked`.

<ComponentPreview name="BarChartStacked"  />

### Rounded

<ComponentPreview name="BarChartRounded"  />

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/docs/charts/guide.html#custom-tooltip).

<ComponentPreview name="BarChartCustomTooltip"  />
