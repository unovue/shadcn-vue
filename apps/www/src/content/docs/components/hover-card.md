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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/lib/registry/default/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The React Framework – created and maintained by @vercel.
    </HoverCardContent>
  </HoverCard>
</template>
```