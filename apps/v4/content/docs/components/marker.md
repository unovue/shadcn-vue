---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
component: true 
---

::component-preview
---
name: MarkerDemo
class: style-luma
---
::

## Installation

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add marker
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/marker) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { Marker, MarkerContent, MarkerIcon, } from '@/components/ui/marker'
</script>

<template>
  <Marker>
    <MarkerIcon>
      <CheckIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </Marker>
</template>
```


## Composition

Use the following composition to build a marker:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Features

- Inline marker, bordered row, and labeled separator variants
- Decorative icon slot that is hidden from assistive tech
- Polymorphic root via `render` for link and button markers
- Pairs with the [`shimmer`](/docs/utilities/shimmer) utility for streaming status text
- Customizable styling through the `class` prop on every part

## Examples

### Variants

Use `variant` to switch between an inline marker, bordered row, and labeled separator.

::component-preview
---
name: MarkerVariantsDemo
class: style-luma
---
::

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

### Status

Set `role="status"` and include a [`Spinner`](/docs/components/spinner) for streaming or in-progress markers so updates are announced.

::component-preview
---
name: MarkerStatusDemo
class: style-luma
---
::


### Shimmer

Add the [`shimmer`](/docs/utils/shimmer) utility class to `MarkerContent` for an animated streaming-text effect. The utility ships with the `shadcn` package — see the shimmer docs for installation.



::component-preview
---
name: MarkerShimmerDemo
class: style-luma
---
::

### Separator

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation.

::component-preview
---
name: MarkerSeparatorDemo
class: style-luma
---
::

### Border

Use the `border` variant for status rows that should keep the default marker alignment while separating the next row.

::component-preview
---
name: MarkerBorderDemo
class: style-luma
---
::

### With Icon

Use `MarkerIcon` to render an icon alongside the content. Use `flex-col` to stack the icon above the content.


::component-preview
---
name: MarkerIconDemo
class: style-luma
---
::

### Links and Buttons

Turn a marker into a link or button with the `render` prop on `Marker`.


::component-preview
---
name: MarkerLinkButtonDemo
class: style-luma
---
::

```tsx showLineNumbers
import { Marker, MarkerContent } from "@/components/ui/marker"

<template>
  <Marker as-child>
    <a href="#links-and-buttons">
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>View the pull request</MarkerContent>
    </a>
  </Marker>
</template>
```

## Accessibility

`Marker` is presentational by default. The correct semantics depend on how you use it, so choose the role based on intent rather than relying on a single default.

### Status and Progress

For streaming or progress markers such as "Thinking..." or a running tool, set `role="status"` so assistive tech announces the update as it appears. `Marker` forwards `role` to the underlying element.

```tsx showLineNumbers
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### Labeled Separators

A separator that carries text, such as a date or a section label, needs no role. The divider lines are decorative CSS pseudo-elements, and the text is announced as ordinary content.

```tsx showLineNumbers
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

::callout
  **Note:** Do not add `role="separator"` to a labeled divider. A separator
  takes its accessible name from `aria-label`, not from its text, and its
  contents are treated as presentational, so the visible label would not be
  announced. Reserve `role="separator"` for a divider with no meaningful text.
::

### Bordered Markers

A bordered marker keeps the same semantics as the default marker. The bottom border is decorative, so choose `role="status"`, `render`, or no role based on the marker's purpose.

```tsx showLineNumbers
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### Decorative Icons

`MarkerIcon` is decorative and hidden from assistive tech with `aria-hidden`, so the adjacent `MarkerContent` carries the meaning. For an icon-only marker, provide an `aria-label` or visible text so it is not announced as empty.

```tsx showLineNumbers
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### Interactive Markers

When a marker links or triggers an action, render it as a real `<button>` or `<a>` with the `render` prop so it is focusable and exposes the correct role. The accessible name comes from the marker text.

```tsx showLineNumbers
<Marker as-child>
  <a href="/files" >
    <MarkerIcon>
      <FileTextIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </a>
</Marker>
```

## API Reference

### Marker

The root marker element. The file also exports `markerVariants` for composing the marker styles into custom components.

| Prop        | Type                                   | Default     | Description                                      |
| ----------- | -------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`   | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                               |
| `render`    | `ReactElement \| function`             | -           | Render as a different element, such as a link.   |
| `class` | `string`                               | -           | Additional classes to apply to the root element. |

### MarkerIcon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

| Prop        | Type     | Default | Description                                   |
| ----------- | -------- | ------- | --------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the icon slot. |

### MarkerContent

The marker text content.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the content slot. |
