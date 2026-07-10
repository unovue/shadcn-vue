---
title: scroll-fade
description: Scroll-aware edge-fade utilities that fade the edges of a scroll container when content overflows.
---

::component-preview
---
name: ScrollFadeDemo
---
::

## Installation

If your project was set up with `npx shadcn-vue@latest init`, you already have `scroll-fade`. It ships with the `shadcn-vue` package, which the CLI imports in your global CSS file.

## Usage

| Class            | Styles                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| `scroll-fade`    | Fades the top and bottom edges of the container.                          |
| `scroll-fade-t`  | Fades the top edge only. Scroll-aware via `data-scrollable~="start"`.     |
| `scroll-fade-b`  | Fades the bottom edge only. Scroll-aware via `data-scrollable~="end"`.    |
| `scroll-fade-x`  | Fades the left and right edges of the container.                          |

Add a fade to any scroll container:

```vue
<template>
  <div class="scroll-fade-b h-64 overflow-y-auto">
    <!-- long content -->
  </div>
</template>
```

The directional utilities (`scroll-fade-t`, `scroll-fade-b`) are scroll-aware: they only fade an edge while there is content to reveal in that direction. This is driven by the `data-scrollable` attribute that [`MessageScroller`](/docs/components/message-scroller) sets on its viewport, so the fade appears and disappears as the reader scrolls.

The effect is pure CSS. The container is painted with a `mask-image` gradient that turns transparent toward the faded edge.

## Size

Set `--scroll-fade-size` to change the fade length. The default is `1.5rem`.

```vue
<template>
  <div class="scroll-fade-b overflow-y-auto" style="--scroll-fade-size: 3rem">
    <!-- long content -->
  </div>
</template>
```
