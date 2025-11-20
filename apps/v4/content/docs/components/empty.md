---
title: Empty
description: Use the Empty component to display an empty state.
component: true
new: true
---

::component-preview
---
name: EmptyDemo
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
npx shadcn-vue@latest add empty
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/empty) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { FolderOpen } from 'lucide-vue-next'
import { Button } from '@/registry/default/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/default/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderOpen />
      </EmptyMedia>
    </EmptyHeader>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
    <EmptyContent>
      <Button>Add data</Button>
    </EmptyContent>
  </Empty>
</template>
```

## Examples

### Outline

Use the `border` utility class to create an outline empty state.

::component-preview
---
name: EmptyOutlineDemo
class: '[&_.preview]:p-6 md:[&_.preview]:p-10'
---
::

### Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

::component-preview
---
name: EmptyBackgroundDemo
class: '[&_.preview]:p-0'
---
::

### Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

::component-preview
---
name: EmptyAvatarDemo
class: '[&_.preview]:p-0'
---
::

### Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

::component-preview
---
name: EmptyAvatarGroupDemo
class: '[&_.preview]:p-0'
---
::

### InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

::component-preview
---
name: EmptyInputGroupDemo
class: '[&_.preview]:p-0'
---
::

## API Reference

### Empty

The main component of the empty state. Wraps the `EmptyHeader` and `EmptyContent` components.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <Empty>
    <EmptyHeader />
    <EmptyContent />
  </Empty>
</template>
```

### EmptyHeader

The `EmptyHeader` component wraps the empty media, title, and description.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyHeader>
    <EmptyMedia />
    <EmptyTitle />
    <EmptyDescription />
  </EmptyHeader>
</template>
```

### EmptyMedia

Use the `EmptyMedia` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop        | Type                  | Default   |
| ----------- | --------------------- | --------- |
| `variant`   | `"default" \| "icon"` | `default` |
| `class` | `string`              |           |

```vue
<template>
  <EmptyMedia variant="icon">
    <Icon />
  </EmptyMedia>
</template>
```

```vue
<template>
  <EmptyMedia>
    <Avatar>
      <AvatarImage src="..." />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </EmptyMedia>
</template>
```

### EmptyTitle

Use the `EmptyTitle` component to display the title of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyTitle>No data</EmptyTitle>
</template>
```

### EmptyDescription

Use the `EmptyDescription` component to display the description of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyDescription>You do not have any notifications.</EmptyDescription>
</template>
```

### EmptyContent

Use the `EmptyContent` component to display the content of the empty state such as a button, input or a link.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<template>
  <EmptyContent>
    <Button>Add Project</Button>
  </EmptyContent>
</template>
```
