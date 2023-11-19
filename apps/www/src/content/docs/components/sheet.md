---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
source: apps/www/src/lib/registry/default/ui/dialog 
primitive: https://www.radix-vue.com/components/dialog.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SheetDemo" /> 


## Installation
 
```bash
npx shadcn-vue@latest add sheet
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Sheet,
  {{codeConfig.prefix}}SheetContent,
  {{codeConfig.prefix}}SheetDescription,
  {{codeConfig.prefix}}SheetHeader,
  {{codeConfig.prefix}}SheetTitle,
  {{codeConfig.prefix}}SheetTrigger,
} from '{{codeConfig.aliases.components}}/ui/sheet'
</script>

<template>
  <{{codeConfig.prefix}}Sheet>
    <{{codeConfig.prefix}}SheetTrigger>Open</{{codeConfig.prefix}}SheetTrigger>
    <{{codeConfig.prefix}}SheetContent>
      <{{codeConfig.prefix}}SheetHeader>
        <{{codeConfig.prefix}}SheetTitle>Are you sure absolutely sure?</{{codeConfig.prefix}}SheetTitle>
        <{{codeConfig.prefix}}SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </{{codeConfig.prefix}}SheetDescription>
      </{{codeConfig.prefix}}SheetHeader>
    </{{codeConfig.prefix}}SheetContent>
  </{{codeConfig.prefix}}Sheet>
</template>
```

## Examples

### Side

Use the `side` property to `<SheetContent />` to indicate the edge of the screen where the component will appear. The values can be `top`, `right`, `bottom` or `left`.

<ComponentPreview name="SheetSideDemo" /> 


### Size

You can adjust the size of the sheet using CSS classes:

```vue:line-numbers showLineNumbers{4}
<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent class="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```
