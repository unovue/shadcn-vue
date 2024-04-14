---
title: Bar
description: Displays a callout for user attention.
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
