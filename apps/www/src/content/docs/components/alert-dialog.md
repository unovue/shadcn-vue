---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
source: apps/www/src/lib/registry/default/ui/alert-dialog 
primitive: https://www.radix-vue.com/components/alert-dialog.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>

<ComponentPreview name="AlertDialogDemo" />

## Installation

```bash
npx shadcn-vue@latest add alert-dialog
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}AlertDialog,
  {{codeConfig.prefix}}AlertDialogAction,
  {{codeConfig.prefix}}AlertDialogCancel,
  {{codeConfig.prefix}}AlertDialogContent,
  {{codeConfig.prefix}}AlertDialogDescription,
  {{codeConfig.prefix}}AlertDialogFooter,
  {{codeConfig.prefix}}AlertDialogHeader,
  {{codeConfig.prefix}}AlertDialogTitle,
  {{codeConfig.prefix}}AlertDialogTrigger,
} from '{{codeConfig.aliases.components}}/ui/alert-dialog'
</script>

<template>
  <{{codeConfig.prefix}}AlertDialog>
    <{{codeConfig.prefix}}AlertDialogTrigger>Open</{{codeConfig.prefix}}AlertDialogTrigger>
    <{{codeConfig.prefix}}AlertDialogContent>
      <{{codeConfig.prefix}}AlertDialogHeader>
        <{{codeConfig.prefix}}AlertDialogTitle>Are you absolutely sure?</{{codeConfig.prefix}}AlertDialogTitle>
        <{{codeConfig.prefix}}AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </{{codeConfig.prefix}}AlertDialogDescription>
      </{{codeConfig.prefix}}AlertDialogHeader>
      <{{codeConfig.prefix}}AlertDialogFooter>
        <{{codeConfig.prefix}}AlertDialogCancel>Cancel</{{codeConfig.prefix}}AlertDialogCancel>
        <{{codeConfig.prefix}}AlertDialogAction>Continue</{{codeConfig.prefix}}AlertDialogAction>
      </{{codeConfig.prefix}}AlertDialogFooter>
    </{{codeConfig.prefix}}AlertDialogContent>
  </{{codeConfig.prefix}}AlertDialog>
</template>
```
