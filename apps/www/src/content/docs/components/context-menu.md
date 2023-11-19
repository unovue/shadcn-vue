--- 
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/context-menu 
primitive: https://www.radix-vue.com/components/context-menu.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="ContextMenuDemo"  /> 

## Installation
 
```bash
npx shadcn-vue@latest add context-menu
``` 

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}ContextMenu,
  {{codeConfig.prefix}}ContextMenuCheckboxItem,
  {{codeConfig.prefix}}ContextMenuContent,
  {{codeConfig.prefix}}ContextMenuItem,
  {{codeConfig.prefix}}ContextMenuLabel,
  {{codeConfig.prefix}}ContextMenuRadioGroup,
  {{codeConfig.prefix}}ContextMenuRadioItem,
  {{codeConfig.prefix}}ContextMenuSeparator,
  {{codeConfig.prefix}}ContextMenuShortcut,
  {{codeConfig.prefix}}ContextMenuSub,
  {{codeConfig.prefix}}ContextMenuSubContent,
  {{codeConfig.prefix}}ContextMenuSubTrigger,
  {{codeConfig.prefix}}ContextMenuTrigger,
} from '{{codeConfig.aliases.components}}/ui/context-menu'
</script>

<template>
  <{{codeConfig.prefix}}ContextMenu>
    <{{codeConfig.prefix}}ContextMenuTrigger>Right click</{{codeConfig.prefix}}ContextMenuTrigger>
    <{{codeConfig.prefix}}ContextMenuContent>
      <{{codeConfig.prefix}}ContextMenuItem>Profile</{{codeConfig.prefix}}ContextMenuItem>
      <{{codeConfig.prefix}}ContextMenuItem>Billing</{{codeConfig.prefix}}ContextMenuItem>
      <{{codeConfig.prefix}}ContextMenuItem>Team</{{codeConfig.prefix}}ContextMenuItem>
      <{{codeConfig.prefix}}ContextMenuItem>Subscription</{{codeConfig.prefix}}ContextMenuItem>
    </{{codeConfig.prefix}}ContextMenuContent>
  </{{codeConfig.prefix}}ContextMenu>
</template>
```
