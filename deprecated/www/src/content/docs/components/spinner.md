---
title: Spinner
description: An indicator that can be used to show a loading state.
---

<ComponentPreview name="SpinnerDemo" />

## Installation

```bash
npx shadcn-vue@latest add spinner
```

## Usage

```vue
<script setup lang="ts">
import { Spinner } from '@/components/ui/Spinner'
</script>

<template>
  <Spinner />
</template>
```

## Customization
You can replace the default spinner icon with any other icon by editing the `Spinner` component.

<ComponentPreview name="SpinnerCustomDemo" />

## Examples

### Size

Use the `size-*` utility class to change the size of the spinner.

<ComponentPreview name="SpinnerSizesDemo" />

### Color

Use the `text-*` utility class to change the color of the spinner.

<ComponentPreview name="SpinnerColorsDemo" />

### Button

Add a spinner to a button to indicate a loading state. The `<Button />` will handle the spacing between the spinner and the text.

<ComponentPreview name="SpinnerButtonsDemo" />

### Badge

You can also use a spinner inside a badge.

<ComponentPreview name="SpinnerBadgeDemo" />

### Input Group

Input Group can have spinners inside `<InputGroupAddon>`.

<ComponentPreview name="SpinnerInputGroupDemo" />

### Empty

<ComponentPreview name="SpinnerEmptyDemo" />

### Item

Use the spinner inside `<ItemMedia>` to indicate a loading state.

<ComponentPreview name="SpinnerItemDemo" />

## API Reference

### Spinner

Use the `Spinner` component to display a spinner.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` | ``      |

```vue
<Spinner />
```
