---
title: Avatar
description: An image element with a fallback for representing the user.
source: apps/www/src/registry/default/ui/avatar
primitive: https://www.reka-ui.com/docs/components/avatar.html
---

<ComponentPreview name="AvatarDemo" />

## Installation

```bash
npx shadcn-vue@latest add avatar
```

## Usage

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```
