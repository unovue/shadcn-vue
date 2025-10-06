---
title: Item
description: A versatile component that you can use to display any content.
---

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

You can pretty much achieve the same result with the `div` element and some classes, but I've built this so many times that I decided to create a component for it. Now I use it all the time.

<ComponentPreview name="ItemDemo" />

## Installation

```bash
npx shadcn-vue@latest add item
```

## Usage

```vue
<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Item>
    <ItemHeader>Item Header</ItemHeader>
    <ItemMedia />
    <ItemContent>
      <ItemTitle>Item</ItemTitle>
      <ItemDescription>Item</ItemDescription>
    </ItemContent>
    <ItemFooter>Item Footer</ItemFooter>
  </Item>
</template>
```

## Examples

### Variants

<ComponentPreview name="ItemVariantDemo" />

### Size

The `Item` component has different sizes for different use cases. For example, you can use the `sm` size for a compact item or the `default` size for a standard item.

<ComponentPreview name="ItemSizeDemo" />

### Icon

<ComponentPreview name="ItemIconDemo" />

### Avatar

<ComponentPreview name="ItemAvatarDemo" />

### Image

<ComponentPreview name="ItemImageDemo" />
