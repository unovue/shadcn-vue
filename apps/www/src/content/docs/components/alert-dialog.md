---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
source: apps/www/src/lib/registry/default/ui/alert-dialog 
primitive: https://www.radix-vue.com/components/alert-dialog.html
---
    
 
<ComponentPreview name="AlertDialogDemo" />
 
## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add alert-dialog
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radix-vue'

function handleAction() {
  alert('clicked action button!')
}
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger
      class="bg-white text-grass11 font-semibold hover:bg-white/90 shadow-sm inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none outline-none focus:shadow-[0_0_0_2px] focus:shadow-black transition-all"
    >
      Delete account
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="alert-dialog-overlay" />
      <AlertDialogContent
        class="alert-dialog-content"
      >
        <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialogDescription>
        <div class="flex justify-end gap-[25px]">
          <AlertDialogCancel
            class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
            @click="handleAction"
          >
            Yes, delete account
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style>
.alert-dialog-overlay {
  @apply bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-20;
}

.alert-dialog-content {
  @apply z-20 text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none;
}
</style>
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```ts
const { mauve, green, grass, blackA } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...green,
        ...grass,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
```
</Steps>

</template>
</TabPreview>


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
} from '@/components/ui/alert-dialog'
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