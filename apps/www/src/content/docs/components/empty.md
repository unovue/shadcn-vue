---
title: Empty
description: A component to display an empty state.
---

<ComponentPreview name="EmptyDemo" />

## Installation

```bash
npx shadcn-vue@latest add empty
```

## Usage

```vue
<script setup lang="ts">
import { FolderOpen } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderOpen />
      </EmptyMedia>
      <EmptyTitle>No data</EmptyTitle>
      <EmptyDescription>No data found</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button>Add data</Button>
    </EmptyContent>
  </Empty>
</template>
```

## Examples

### Outline

Use the `border` utility class to create a outline empty state.

<ComponentPreview name="EmptyOutlineDemo" />

### Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

<ComponentPreview name="EmptyBackgroundDemo" />

### Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

<ComponentPreview name="EmptyAvatarDemo" />

### Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

<ComponentPreview name="EmptyAvatarGroupDemo" />

### InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

<ComponentPreview name="EmptyInputGroupDemo" class="[&_.preview]:p-0" />

## API Reference

### Empty

The main component of the empty state. Wraps the `EmptyHeader` and `EmptyContent` components.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<Empty>
  <EmptyHeader />
  <EmptyContent />
</Empty>
```

### EmptyHeader

The `EmptyHeader` component wraps the empty media, title, and description.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<EmptyHeader>
  <EmptyMedia />
  <EmptyTitle />
  <EmptyDescription />
</EmptyHeader>
```

### EmptyMedia

Use the `EmptyMedia` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop        | Type                  | Default   |
| ----------- | --------------------- | --------- |
| `variant`   | `"default" \| "icon"` | `default` |
| `class` | `string`              |           |

```vue
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

```vue
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

### EmptyTitle

Use the `EmptyTitle` component to display the title of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<EmptyTitle>
No data
</EmptyTitle>
```

### EmptyDescription

Use the `EmptyDescription` component to display the description of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<EmptyDescription>
You do not have any notifications.
</EmptyDescription>
```

### EmptyContent

Use the `EmptyContent` component to display the content of the empty state such as a button, input or a link.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```
