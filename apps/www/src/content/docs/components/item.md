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

## Item vs Field

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

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

### Group

<ComponentPreview name="ItemGroupDemo" />

### Header

<ComponentPreview name="ItemHeaderDemo" />

### Link

To render an item as a link, use the `as-child` prop. The hover and focus states will be applied to the anchor element.

<ComponentPreview name="ItemLinkDemo" />

### Dropdown

<ComponentPreview name="ItemDropdownDemo" />

## API Reference

### Item

The main component for displaying content with media, title, description, and actions.

| Prop       | Type                                | Default     |
| ---------- | ----------------------------------- | ----------- |
| `variant`  | `"default" \| "outline" \| "muted"` | `"default"` |
| `size`     | `"default" \| "sm"`                 | `"default"` |
| `as-child` | `boolean`                           | `false`     |

```vue
<template>
  <Item size="" variant="">
    <ItemMedia />
    <ItemContent>
      <ItemTitle>Item</ItemTitle>
      <ItemDescription>Item</ItemDescription>
    </ItemContent>
    <ItemActions />
  </Item>
</template>
```

You can use the `as-child` prop to render a custom component as the item, for example a link. The hover and focus states will be applied to the custom component.

```vue
<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Item as-child>
    <a href="/dashboard">
      <ItemMedia variant="icon">
        <Home />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Dashboard</ItemTitle>
        <ItemDescription>
          Overview of your account and activity.
        </ItemDescription>
      </ItemContent>
    </a>
  </Item>
</template>
```

### ItemGroup

The `ItemGroup` component is a container that groups related items together with consistent styling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemGroup>
    <Item />
    <Item />
  </ItemGroup>
</template>
```

### ItemSeparator

The `ItemSeparator` component is a separator that separates items in the item group.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemGroup>
    <Item />
    <ItemSeparator />
    <Item />
  </ItemGroup>
</template>
```

### ItemMedia

Use the `ItemMedia` component to display media content such as icons, images, or avatars.

| Prop        | Type                             | Default     |
| ----------- | -------------------------------- | ----------- |
| `variant`   | `"default" \| "icon" \| "image"` | `"default"` |
| `class`     | `string`                         |             |

```vue
<template>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
</template>
```

```vue
<template>
  <ItemMedia variant="image">
    <img src="..." alt="...">
  </ItemMedia>
</template>
```

### ItemContent

The `ItemContent` component wraps the title and description of the item.

You can skip `ItemContent` if you only need a title.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>Item</ItemDescription>
  </ItemContent>
</template>
```

### ItemTitle

Use the `ItemTitle` component to display the title of the item.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemTitle>Item Title</ItemTitle>
</template>
```

### ItemDescription

Use the `ItemDescription` component to display the description of the item.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemDescription>Item description</ItemDescription>
</template>
```

### ItemActions

Use the `ItemActions` component to display action buttons or other interactive elements.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemActions>
    <Button>Action</Button>
    <Button>Action</Button>
  </ItemActions>
</template>
```

### ItemHeader

Use the `ItemHeader` component to display a header in the item.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemHeader>Item Header</ItemHeader>
</template>
```

### ItemFooter

Use the `ItemFooter` component to display a footer in the item.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <ItemFooter>Item Footer</ItemFooter>
</template>
```
