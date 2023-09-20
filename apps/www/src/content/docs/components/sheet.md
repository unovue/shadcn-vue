---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
source: apps/www/src/lib/registry/default/ui/dialog 
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="SheetDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add sheet
```
</template>

<template #Manual>

#### Coming soon...

</template>
</TabPreview>

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