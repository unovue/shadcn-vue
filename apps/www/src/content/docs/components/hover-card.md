---
title: Hover Card
description: For sighted users to preview content available behind a link.
source: apps/www/src/lib/registry/default/ui/hover-card
primitive: https://www.radix-vue.com/components/hover-card.html
---

<ComponentPreview name="HoverCardDemo" />

## Installation

```bash
npx shadcn-vue@latest add hover-card
```
## Usage

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by @vuejs.
    </HoverCardContent>
  </HoverCard>
</template>
```
