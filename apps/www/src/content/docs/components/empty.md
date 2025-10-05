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
