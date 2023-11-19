---
title: Toast
description: A succinct message that is displayed temporarily.
source: apps/www/src/lib/registry/default/ui/toast 
primitive: https://www.radix-vue.com/components/toast.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="ToastDemo" />

## Installation
 

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add toast
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2,6}
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <Toaster />
</template>
```
  
</Steps>
 

## Usage

The `useToast` hook returns a `toast` function that you can use to display a toast.

```tsx-vue
import { useToast } from '{{codeConfig.aliases.components}}/ui/toast/use-toast'
```

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Button } from '{{codeConfig.aliases.components}}/ui/button'
import { useToast } from '{{codeConfig.aliases.components}}/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <{{codeConfig.prefix}}Button
    @click="() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }"
  >
    Add to calander
  </{{codeConfig.prefix}}Button>
</template>
```

<Callout>

To display multiple toasts at the same time, you can update the `TOAST_LIMIT` in `use-toast.ts`.

</Callout>

## Examples

### Simple

<ComponentPreview name="ToastSimple" />

### With Title

<ComponentPreview name="ToastWithTitle" />

### With Action

<ComponentPreview name="ToastWithAction" />

### Destructive

Use `toast({ variant: "destructive" })` to display a destructive toast.

<ComponentPreview name="ToastDestructive" />
