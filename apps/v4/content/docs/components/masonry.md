---
title: Masonry
description: A responsive multi-column masonry layout that automatically flows content across columns.
component: true
---

::component-preview
---
name: MasonryDemo
description: A masonry layout with testimonial cards.
align: start
class: '[&_.preview]:h-auto [&_.preview]:py-10'
---
::

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
npx shadcn-vue@latest add masonry
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/masonry) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Masonry } from '@/components/ui/masonry'
</script>

<template>
  <Masonry>
    <Card>
      <CardContent>Card 1</CardContent>
    </Card>
    <Card>
      <CardContent>Card 2</CardContent>
    </Card>
    <Card>
      <CardContent>Card 3</CardContent>
    </Card>
  </Masonry>
</template>
```

## Examples

### Two Columns

Restrict to two columns for wider content like blog posts or article cards.

::component-preview
---
name: MasonryColumns
description: A 2-column masonry layout with blog post cards.
align: start
class: '[&_.preview]:h-auto [&_.preview]:py-10'
---
::

### Four Columns

Use more columns with a tighter gap for compact content like feature grids.

::component-preview
---
name: MasonryFourColumns
description: A 4-column masonry layout with a tighter gap.
align: start
class: '[&_.preview]:h-auto [&_.preview]:py-10'
---
::

## API Reference

### Masonry

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12` | `3` | Maximum number of columns at the largest breakpoint. Scales down responsively on smaller screens. |
| `gap` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12` | `4` | Gap between items using Tailwind's spacing scale. |
