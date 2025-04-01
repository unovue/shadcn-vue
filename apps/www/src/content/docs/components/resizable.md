---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
source: apps/www/src/registry/default/ui/resizable
primitive: https://www.reka-ui.com/docs/components/splitter.html
---

<ComponentPreview name="ResizableDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add resizable
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install reka-ui
```

### Copy and paste the following code into your project:

`index.ts`

<<< @/registry/default/ui/resizable/index.ts

`ResizablePanelGroup.vue`

<<< @/registry/default/ui/resizable/ResizablePanelGroup.vue

`ResizableHandle.vue`

<<< @/registry/default/ui/resizable/ResizableHandle.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

## Examples

### Vertical

Use the direction prop to set the direction of the resizable panels.

<ComponentPreview name="ResizableVerticalDemo" />

```vue:line-numbers {10}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="vertical">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

### Handle

You can set or hide the handle by using the withHandle prop on the ResizableHandle component.

<ComponentPreview name="ResizableHandleDemo" />

```vue:line-numbers {12}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```
