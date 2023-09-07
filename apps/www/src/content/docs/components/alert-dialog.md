---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
source: apps/www/src/lib/registry/default/ui/alert-dialog 
primitive: https://www.radix-vue.com/components/alert-dialog.html
---
    
 
<ComponentPreview name="AlertDialogDemo" />



 
## Installation

```bash
npx shadcn-vue@latest add alert-dialog 
```  
  
<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/lib/registry/default/ui/alert-dialog'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      Open
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```