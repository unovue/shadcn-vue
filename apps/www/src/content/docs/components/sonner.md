---
title: Sonner
description: An opinionated toast component for Vue.
docs: https://vue-sonner.vercel.app
source: apps/www/src/lib/registry/default/ui/sonner
---

<ComponentPreview name="SonnerDemo" />

## About

The Sonner component is provided by [vue-sonner](https://vue-sonner.vercel.app/), which is a Vue port of Sonner, originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add sonner
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2,6}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster />
</template>
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    }"
  >
    Add to calendar
  </Button>
</template>
```

## Examples

### Sonner with Dialog

Related issue https://github.com/radix-vue/shadcn-vue/issues/462

Add `pointer-events-auto` class to Toaster component in your `App.vue` file:

```vue {6}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster class="pointer-events-auto" />
</template>
```

<ComponentPreview name="SonnerWithDialog" />
