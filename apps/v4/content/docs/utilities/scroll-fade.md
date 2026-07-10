---
title: scroll-fade
description: Scroll-aware edge-fade utilities that fade the edges of a scroll container as it overflows.
---

::component-preview
---
name: ScrollFadeDemo
---
::

## Installation

If your project was set up with `npx shadcn-vue@latest init`, you already have `scroll-fade`. It ships with the `shadcn-vue` package, which the CLI imports in your global CSS file.

## Usage

Add a fade to any scroll container. The fade is driven by CSS scroll-driven animations, so an edge only fades while there is content to reveal in that direction — no JavaScript required.

```vue
<template>
  <div class="scroll-fade h-72 overflow-y-auto">
    <!-- long content -->
  </div>
</template>
```

| Class            | Styles                                                            |
| ---------------- | ----------------------------------------------------------------- |
| `scroll-fade`    | Fades the top and bottom edges (alias: `scroll-fade-y`).          |
| `scroll-fade-x`  | Fades the start and end edges (logical, RTL-aware).               |
| `scroll-fade-t`  | Fades the top edge only.                                          |
| `scroll-fade-b`  | Fades the bottom edge only.                                       |
| `scroll-fade-s`  | Fades the start edge only (logical, RTL-aware).                   |
| `scroll-fade-e`  | Fades the end edge only (logical, RTL-aware).                     |
| `scroll-fade-l`  | Fades the left edge only (physical).                              |
| `scroll-fade-r`  | Fades the right edge only (physical).                             |
| `scroll-fade-none` | Removes the fade mask (e.g. to disable it responsively).        |

The effect is pure CSS. The container is painted with a `mask-image` gradient whose transparent stops animate to `0` as the corresponding edge reaches the end of its scroll range. Where scroll-driven animations are unsupported, it falls back to a static fade.

## Size

Set the fade length with `scroll-fade-<number>` (spacing scale) or an arbitrary value. The default is `min(12%, 2.5rem)`.

```vue
<template>
  <!-- 8 * 0.25rem = 2rem fade -->
  <div class="scroll-fade scroll-fade-8 overflow-y-auto">
    <!-- long content -->
  </div>
</template>
```

Per-edge sizes are available too: `scroll-fade-t-<number>`, `scroll-fade-b-<number>`, `scroll-fade-s-<number>`, `scroll-fade-e-<number>`.
