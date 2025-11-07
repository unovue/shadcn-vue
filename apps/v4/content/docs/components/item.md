---
title: Item
description: A versatile component that you can use to display any content.
component: true
new: true
---

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

You can pretty much achieve the same result with the `div` element and some classes, but I've built this so many times that I decided to create a component for it. Now I use it all the time.

::component-preview
---
name: ItemDemo
class: '[&_.preview]:p-0'
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
npx shadcn-vue@latest add item
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/item) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

## Usage

```vue showLineNumbers
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

::component-preview
---
name: ItemVariantDemo
---
::

### Size

The `Item` component has different sizes for different use cases. For example, you can use the `sm` size for a compact item or the `default` size for a standard item.

::component-preview
---
name: ItemSizeDemo
---
::

### Icon

::component-preview
---
name: ItemIconDemo
---
::

### Avatar

::component-preview
---
name: ItemAvatarDemo
---
::

### Image

::component-preview
---
name: ItemImageDemo
---
::

### Group

::component-preview
---
name: ItemGroupDemo
---
::

### Header

::component-preview
---
name: ItemHeaderDemo
---
::

### Link

To render an item as a link, use the `as-child` prop. The hover and focus states will be applied to the anchor element.

::component-preview
---
name: ItemLinkDemo
---
::

### Dropdown

::component-preview
---
name: ItemDropdownDemo
---
::

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
