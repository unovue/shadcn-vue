---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
source: apps/www/src/lib/registry/default/ui/menubar 
primitive: https://www.radix-vue.com/components/menubar.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="MenubarDemo" /> 

## Installation
 

```bash
npx shadcn-vue@latest add menubar
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Menubar,
  {{codeConfig.prefix}}MenubarContent,
  {{codeConfig.prefix}}MenubarItem,
  {{codeConfig.prefix}}MenubarMenu,
  {{codeConfig.prefix}}MenubarSeparator,
  {{codeConfig.prefix}}MenubarShortcut,
  {{codeConfig.prefix}}MenubarTrigger,
} from '{{codeConfig.aliases.components}}/ui/menubar'
</script>

<template>
  <{{codeConfig.prefix}}Menubar>
    <{{codeConfig.prefix}}MenubarMenu>
      <{{codeConfig.prefix}}MenubarTrigger>File</{{codeConfig.prefix}}MenubarTrigger>
      <{{codeConfig.prefix}}MenubarContent>
        <{{codeConfig.prefix}}MenubarItem>
          New Tab <{{codeConfig.prefix}}MenubarShortcut>⌘T</{{codeConfig.prefix}}MenubarShortcut>
        </{{codeConfig.prefix}}MenubarItem>
        <{{codeConfig.prefix}}MenubarItem>New Window</{{codeConfig.prefix}}MenubarItem>
        <{{codeConfig.prefix}}MenubarSeparator />
        <{{codeConfig.prefix}}MenubarItem>Share</{{codeConfig.prefix}}MenubarItem>
        <{{codeConfig.prefix}}MenubarSeparator />
        <{{codeConfig.prefix}}MenubarItem>Print</{{codeConfig.prefix}}MenubarItem>
      </{{codeConfig.prefix}}MenubarContent>
    </{{codeConfig.prefix}}MenubarMenu>
  </{{codeConfig.prefix}}Menubar>
</template>
```
