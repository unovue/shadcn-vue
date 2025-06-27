---
title: Sonner
description: An opinionated toast component for Vue.
component: true
---

::component-preview
---
name: SonnerDemo
description: A sonner toast component.
align: center
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add sonner
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install vue-sonner
    ```

    ::step
    Copy and paste the GitHub source code into your project.
    ::
    
    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
import { toast } from 'vue-sonner'
```

```vue showLineNumbers
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
</script>

<template>
  <Button @click="() => toast('My first toast')">
    Give me a toast
  </Button>
</template>
```

## Installation

The `<Toaster />` component is required to display toasts. Add it to your root layout.

```vue showLineNumbers
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <main>
      <!-- Your app content -->
    </main>
    <Toaster />
  </div>
</template>
```

## Examples

### Simple

```vue showLineNumbers
toast('Event has been created')
```

### With Description

```vue showLineNumbers
toast('Event has been created', {
  description: 'Sunday, December 03, 2023 at 9:00 AM',
})
```

### Success

```vue showLineNumbers
toast.success('Event has been created')
```

### Error

```vue showLineNumbers
toast.error('Event has not been created')
```

### Action

```vue showLineNumbers
toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})
```
