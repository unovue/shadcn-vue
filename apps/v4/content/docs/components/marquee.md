---
title: Marquee
description: An infinite scrolling component that can be used to display text, images, or cards.
component: true
---

::component-preview
---
name: MarqueeDemo
description: A marquee with review cards.
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
npx shadcn-vue@latest add marquee
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/marquee) into your project.
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
import { Marquee } from '@/components/ui/marquee'
</script>

<template>
  <Marquee>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Marquee>
</template>
```

## Examples

### Testimonials

Two rows scrolling in opposite directions — a common pattern for social proof sections.

::component-preview
---
name: MarqueeTestimonials
description: Testimonial cards in a dual-row marquee.
---
::

### Screenshots

Three vertical columns with a 3D perspective effect for a visually striking gallery.

::component-preview
---
name: MarqueeScreenshots
description: A 3D perspective image gallery using vertical marquees.
---
::

### Vertical

Scroll content vertically — useful for sidebars or tall display sections.

::component-preview
---
name: MarqueeVertical
description: A vertical marquee.
---
::

### Reverse Direction

Flip the scroll direction to create contrast when used alongside a forward-scrolling row.

::component-preview
---
name: MarqueeReverse
description: A marquee with reversed animation direction.
---
::

### Pause on Hover

Pauses the animation when the user hovers, making individual items easier to read.

::component-preview
---
name: MarqueePauseOnHover
description: A marquee that pauses when hovered.
---
::

### Without Overlay

Removes the gradient fade at the edges for a clean, borderless look.

::component-preview
---
name: MarqueeWithoutOverlay
description: A marquee without the gradient overlay.
---
::

## API Reference

### Marquee

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The scroll direction of the marquee. |
| `pauseOnHover` | `boolean` | `false` | Pause the animation when hovering over the marquee. |
| `reverse` | `boolean` | `false` | Reverse the animation direction. |
| `repeat` | `number` | `4` | Number of times the slot content is repeated to ensure seamless looping. |
| `overlay` | `boolean` | `true` | Show a gradient overlay that fades content at the edges. |
| `class` | `string` | `—` | Additional CSS classes for the root element. |

### CSS Variables

You can customize the animation speed and gap between items using CSS custom properties:

| Variable | Default | Description |
| --- | --- | --- |
| `--duration` | `40s` | The duration of one full animation cycle. |
| `--gap` | `1rem` | The gap between repeated content blocks. |

```vue
<!-- Faster scroll with more spacing -->
<Marquee class="[--duration:10s] [--gap:2rem]">
  ...
</Marquee>
```
