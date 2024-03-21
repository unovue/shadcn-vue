---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
source: apps/www/src/lib/registry/default/ui/toggle-group
primitive: https://www.radix-vue.com/components/toggle-group.html
---

<ComponentPreview name="ToggleGroupDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle-group
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/toggle-group/ToggleGroup.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## Examples

### Default

<ComponentPreview name="ToggleGroupDemo" />

### Outline

<ComponentPreview name="ToggleGroupOutlineDemo" />

### Single

<ComponentPreview name="ToggleGroupSingleDemo" />

### Small

<ComponentPreview name="ToggleGroupSmallDemo" />

### Large

<ComponentPreview name="ToggleGroupLargeDemo" />

### Disabled

<ComponentPreview name="ToggleGroupDisabledDemo" />
