---
title: Label
description: Renders an accessible label associated with controls.
source: apps/www/src/registry/default/ui/label
primitive: https://www.reka-ui.com/docs/components/label.html
---

<ComponentPreview name="LabelDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add label
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install reka-ui
```

### Copy and paste the following code into your project:

<<< @/registry/default/ui/label/Label.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```
