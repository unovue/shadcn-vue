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

## Usage

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```