---
title: Chart
description: Beautiful charts. Built using Unovis. Copy and paste into your apps.
component: true
---

::component-preview
---
name: "ChartBarInteractive"
class: "theme-blue [&_.preview]:h-auto [&_.preview]:p-0 [&_.preview]:lg:min-h-[404px] [&_.preview>div]:w-full [&_.preview>div]:border-none [&_.preview>div]:shadow-none"
hideCode: true
---
::

Introducing **Charts**. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with the other components and are fully customizable to fit your project.

[Browse the Charts Library](/charts).

## Component

We use [Unovis](https://unovis.dev/) under the hood.

We designed the `chart` component with composition in mind. **You build your charts using Unovis components and only bring in custom components, such as `ChartTooltip`, when and where you need it**.

```vue showLineNumbers
<script setup lang="ts">
import { VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
</script>

<template>
  <ChartContainer :config="chartConfig">
    <VisXYContainer :data="data">
      <VisGroupedBar :x="(d) => d.month" :y="(d) => d.value" />
      <ChartTooltip :template="componentToString(chartConfig, ChartTooltipContent)" />
    </VisXYContainer>
  </ChartContainer>
</template>
```

We do not wrap Unovis. This means you're not locked into an abstraction. When a new Unovis version is released, you can follow the official upgrade path to upgrade your charts.

**The components are yours**.

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add chart
```

::

::tabs-content{value="manual"}

  ::steps
    ::step
    Install the following dependencies
    ::

    ```bash
    npm install @unovis/ts @unovis/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/chart) into your project
    ::

    ::step
    Update the import paths to match your project setup
    ::

    ::step
    Add the following colors to your CSS file
    ::

    ```css
    @layer base {
      :root {
        --chart-1: oklch(0.646 0.222 41.116);
        --chart-2: oklch(0.6 0.118 184.704);
        --chart-3: oklch(0.398 0.07 227.392);
        --chart-4: oklch(0.828 0.189 84.429);
        --chart-5: oklch(0.769 0.188 70.08);
      }

      .dark {
        --chart-1: oklch(0.488 0.243 264.376);
        --chart-2: oklch(0.696 0.17 162.48);
        --chart-3: oklch(0.769 0.188 70.08);
        --chart-4: oklch(0.627 0.265 303.9);
        --chart-5: oklch(0.645 0.246 16.439);
      }
    }
    ```
  ::

::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'

const chartData = [
  { date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
  { date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
  { date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
];
type Data = (typeof chartData)[number]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>
<template>
  <ChartContainer :config="chartConfig" class="min-h-[400px] w-full">
    <VisXYContainer :data="chartData">
      <VisGroupedBar
        :x="(d: Data) => d.date"
        :y="[(d: Data) => d.desktop, (d: Data) => d.mobile]"
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
      <ChartTooltip />
      <ChartCrosshair
        :template="
          componentToString(chartConfig, ChartTooltipContent, {
            labelFormatter(d) {
              return new Date(d).toLocaleDateString('en-US', {
                month: 'long',
              });
            },
          })
        "
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
```

## Your First Chart

Let's build your first chart. We'll build a bar chart, add a grid, axis, tooltip and legend.

::steps

  ::step
  Start by defining your data
  ::

  The following data represents the number of desktop and mobile users for each month.

  ```ts showLineNumbers
  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ]
  ```

  ::step
  Define your chart config
  ::

  The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons and color tokens for theming.

  ```ts showLineNumbers
  import type { ChartConfig } from '@/components/ui/chart'

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig
  ```

  ::step
  Build your chart
  ::

  You can now build your chart using Unovis components.

  ::component-source{name="ChartBarDemo" title="components/ExampleChart.vue"}
  ::

  ::component-preview
  ---
  name: ChartBarDemo
  class: '[&_.preview]:min-h-[250px] [&_.preview]:p-4'
  ---
  ::

::

### Add an Axis

To add axes to the chart, we use the `VisAxis` component.

::steps

  ::step
  Import the `VisAxis` component
  ::

  ```vue showLineNumbers
  import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
  ```

  ::step
  Add the `VisAxis` components to your chart
  ::

  ```vue showLineNumbers
  <template>
    <VisAxis
      type="x"
      :x="(d: Data) => d.date"
      :tick-line="false"
      :domain-line="false"
      :grid-line="false"
      :tick-format="(d: number) => {
        const date = new Date(d)
        return date.toLocaleDateString('en-US', {
          month: 'short',
        })
      }"
      :tick-values="chartData.map(d => d.date)"
    />
    <VisAxis
      type="y"
      :tick-format="(d: number) => ''"
      :tick-line="false"
      :domain-line="false"
      :grid-line="true"
    />
  </template>
  ```

  ::component-preview
  ---
  name: ChartBarDemoAxis
  class: '[&_.preview]:min-h-[250px] [&_.preview]:p-4'
  ---
  ::

::

### Add Tooltip

To add a tooltip, we'll use the custom `ChartTooltip` and `ChartTooltipContent` components from `chart`.

::steps

  ::step
  Import the `ChartTooltip` and `ChartTooltipContent` components
  ::

  ```ts
  import { ChartTooltip, ChartTooltipContent, componentToString } from '@/components/ui/chart'
  ```

  ::step
  Add the components to your chart
  ::

  ```vue showLineNumbers
  <ChartTooltip />

  <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent)" />
  ```

  ::component-preview
  ---
  name: ChartBarDemoTooltip
  class: '[&_.preview]:min-h-[250px] [&_.preview]:p-4'
  ---
  ::

  Hover to see the tooltips. Easy, right? Two components, and we've got a beautiful tooltip.

::

### Add Legend

We'll do the same for the legend. We'll use the `ChartLegend` and `ChartLegendContent` components from `chart`.

::steps

  ::step
  Import the `ChartLegendContent` components.
  ::

  ```ts
  import { ChartLegendContent } from '@/components/ui/chart'
  ```

  ::step
  Add the components to your chart.
  ::

  ```vue showLineNumbers {4}
  <template>
    <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
      <VisXYContainer :data="chartData" />
      <ChartLegendContent />
    </ChartContainer>
  </template>
  ```

  ::component-preview
  ---
  name: ChartBarDemoLegend
  class: '[&_.preview]:min-h-[250px] [&_.preview]:p-4'
  ---
  ::
::

Done. You've built your first chart! What's next?

- [Themes and Colors](/docs/components/chart#theming)
- [Tooltip](/docs/components/chart#tooltip)
- [Legend](/docs/components/chart#legend)

## Chart Config

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also works independently for cases where your data or color tokens live remotely or in a different format.

```vue showLineNumbers
<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { Monitor } from 'lucide-vue-next'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: 'var(--chart-1)',
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: 'var(--chart-1)',
      dark: 'var(--chart-2)',
    },
  },
} satisfies ChartConfig
</script>
```

## Theming

Charts has built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl or oklch.

### CSS Variables

::steps

  ::step
  Define your colors in your css file
  ::

  ```css showLineNumbers
  @layer base {
    :root {
      --chart-1: oklch(0.646 0.222 41.116);
      --chart-2: oklch(0.6 0.118 184.704);
    }

    .dark {
      --chart-1: oklch(0.488 0.243 264.376);
      --chart-2: oklch(0.696 0.17 162.48);
    }
  }
  ```

  ::step
  Add the color to your `chartConfig`
  ::

  ```ts showLineNumbers {4,8}
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig
  ```

::

### hex, hsl or oklch

You can also define your colors directly in the chart config. Use the color format you prefer.

```ts showLineNumbers
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig
```

### Using Colors

To use the theme colors in your chart, reference the colors using the format `var(--color-KEY)`.

#### Components

```vue showLineNumbers
<VisGroupedBar
  :x="(d) => d.month"
  :y="(d) => d.desktop"
  color="var(--color-desktop)"
/>
```

#### Chart Data

```ts showLineNumbers
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]
```

## Tooltip

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

You can turn on/off any of these using the `hideLabel`, `hideIndicator` props and customize the indicator style using the `indicator` prop.

Use `labelKey` and `nameKey` to use a custom key for the tooltip label and name.

Chart comes with the `ChartTooltip` and `ChartTooltipContent` components. You can use these two components to add custom tooltips to your chart.

```ts showLineNumbers
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
```

```vue showLineNumbers
<template>
  <ChartTooltip />
  <ChartCrosshair
    :template="componentToString(chartConfig, ChartTooltipContent)"
  />
</template>
```

### Props

Use the following props to customize the tooltip.

| Prop            | Type                     | Description                                  |
| :-------------- | :----------------------- | :------------------------------------------- |
| `labelKey`      | string                   | The config or data key to use for the label. |
| `nameKey`       | string                   | The config or data key to use for the name.  |
| `indicator`     | `dot` `line` or `dashed` | The indicator style for the tooltip.         |
| `hideLabel`     | boolean                  | Whether to hide the label.                   |
| `hideIndicator` | boolean                  | Whether to hide the indicator.               |

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for tooltip label and names, use the `labelKey` and `nameKey` props.

```ts showLineNumbers
const chartData = [
  { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]

const chartConfig = {
  visitors: {
    label: 'Total Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig
```

```vue showLineNumbers
<template>
  <ChartCrosshair
    :template="componentToString(chartConfig, ChartTooltipContent, {
      labelKey: 'visitors',
      nameKey: 'browser',
    })"
  />
</template>
```

This will use `Total Visitors` for label and `Chrome` and `Safari` for the tooltip names.

## Legend

You can use the custom `<ChartLegendContent>` components to add a legend to your chart.

```ts
import { ChartLegendContent } from '@/components/ui/chart'
```

```vue
<template>
  <ChartLegendContent />
</template>
```

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for legend names, use the `nameKey` prop.

```tsx showLineNumbers /browser/
const chartData = [
  { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig
```

```vue
<template>
  <ChartLegendContent name-key="browser" />
</template>
```

This will use `Chrome` and `Safari` for the legend names.
