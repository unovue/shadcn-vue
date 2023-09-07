---
title: Avatar
description: An image element with a fallback for representing the user.
source: apps/www/src/lib/registry/default/ui/avatar 
primitive: https://www.radix-vue.com/components/avatar.html
---


<ComponentPreview name="AvatarDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add avatar
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
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/registry/default/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```