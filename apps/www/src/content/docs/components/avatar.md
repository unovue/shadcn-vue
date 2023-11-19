---
title: Avatar
description: An image element with a fallback for representing the user.
source: apps/www/src/lib/registry/default/ui/avatar 
primitive: https://www.radix-vue.com/components/avatar.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="AvatarDemo" /> 


## Installation

 
```bash
npx shadcn-vue@latest add avatar
``` 

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Avatar, {{codeConfig.prefix}}AvatarFallback, {{codeConfig.prefix}}AvatarImage } from '{{codeConfig.aliases.components}}/ui/avatar'
</script>

<template>
  <{{codeConfig.prefix}}Avatar>
    <{{codeConfig.prefix}}AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
    <{{codeConfig.prefix}}AvatarFallback>CN</{{codeConfig.prefix}}AvatarFallback>
  </{{codeConfig.prefix}}Avatar>
</template>
```
