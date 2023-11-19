---
title: Dropdown Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/dropdown-menu 
primitive: https://www.radix-vue.com/components/dropdown-menu.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="DropdownMenuDemo" /> 

## Installation

```bash
npx shadcn-vue@latest add dropdown-menu
``` 
## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}DropdownMenu,
  {{codeConfig.prefix}}DropdownMenuContent,
  {{codeConfig.prefix}}DropdownMenuItem,
  {{codeConfig.prefix}}DropdownMenuLabel,
  {{codeConfig.prefix}}DropdownMenuSeparator,
  {{codeConfig.prefix}}DropdownMenuTrigger,
} from '{{codeConfig.aliases.components}}/ui/dropdown-menu'
</script>

<template>
  <{{codeConfig.prefix}}DropdownMenu>
    <{{codeConfig.prefix}}DropdownMenuTrigger>Open</{{codeConfig.prefix}}DropdownMenuTrigger>
    <{{codeConfig.prefix}}DropdownMenuContent>
      <{{codeConfig.prefix}}DropdownMenuLabel>My Account</{{codeConfig.prefix}}DropdownMenuLabel>
      <{{codeConfig.prefix}}DropdownMenuSeparator />
      <{{codeConfig.prefix}}DropdownMenuItem>Profile</{{codeConfig.prefix}}DropdownMenuItem>
      <{{codeConfig.prefix}}DropdownMenuItem>Billing</{{codeConfig.prefix}}DropdownMenuItem>
      <{{codeConfig.prefix}}DropdownMenuItem>Team</{{codeConfig.prefix}}DropdownMenuItem>
      <{{codeConfig.prefix}}DropdownMenuItem>Subscription</{{codeConfig.prefix}}DropdownMenuItem>
    </{{codeConfig.prefix}}DropdownMenuContent>
  </{{codeConfig.prefix}}DropdownMenu>
</template>
```
