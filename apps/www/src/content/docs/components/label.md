---
title: Label
description: Renders an accessible label associated with controls.
source: apps/www/src/lib/registry/default/ui/label 
primitive: https://www.radix-vue.com/components/label.html
---

<ComponentPreview name="LabelDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add input
```

<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```