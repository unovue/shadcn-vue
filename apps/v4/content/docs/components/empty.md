---
title: Empty
description: An indicator that can be used to show a loading state.
component: true
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
npx shadcn-vue@latest add button-group
```

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

Use the `border` utility class to create a outline empty state.

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
