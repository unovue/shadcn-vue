---
title: Line
description: An line chart  visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.
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

### Update `css`

Add the following tooltip styling to your `tailwind.css` file:

```css
@layer base {
  :root {
    /* ... */
    --vis-secondary-color: 160 81% 40%;
    --vis-tooltip-background-color: none !important;
    --vis-tooltip-border-color: none !important;
    --vis-tooltip-text-color: none !important;
    --vis-tooltip-shadow-color: none !important;
    --vis-tooltip-backdrop-filter: none !important;
    --vis-tooltip-padding: none !important;
  }
```

</Steps>
