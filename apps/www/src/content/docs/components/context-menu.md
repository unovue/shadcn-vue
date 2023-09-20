--- 
title: Context Menu
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/context-menu 
primitive: https://www.radix-vue.com/components/context-menu.html
---


<ComponentPreview name="ContextMenuDemo"  /> 

## Installation
 
```bash
npx shadcn-vue@latest add context-menu
``` 

## Usage

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```