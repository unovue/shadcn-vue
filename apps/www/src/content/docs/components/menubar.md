---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
source: apps/www/src/lib/registry/default/ui/menubar
primitive: https://www.radix-vue.com/components/menubar.html
---

<ComponentPreview name="MenubarDemo" />

## Installation

```bash
npx shadcn-vue@latest add menubar
```

## Usage

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Share</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Print</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```
