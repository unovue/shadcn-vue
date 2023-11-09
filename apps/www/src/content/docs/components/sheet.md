---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
source: apps/www/src/lib/registry/default/ui/dialog 
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="SheetDemo" /> 


## Installation
 
```bash
npx shadcn-vue@latest add sheet
```

## Usage

```vue
<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
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