---
title: Badge
description: Displays a badge or a component that looks like a badge.
---


<ComponentPreview name="BadgeDemo"  >

<<< ../../../lib/registry/default/examples/BadgeDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add badge
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
import { Badge } from '@/lib/registry/default/ui/badge'
</script>

<template>
  <Badge>Badge</Badge>
</template>
```