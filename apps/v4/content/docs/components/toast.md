---
title: Toast
description: A succinct message that is displayed temporarily.
component: true
links:
  doc: https://reka-ui.com/docs/components/toast
  api: https://reka-ui.com/docs/components/toast#api-reference
---

::component-preview
---
name: ToastDemo
description: A toast component.
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
npx shadcn-vue@latest add toast
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install reka-ui
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
import { useToast } from "@/components/ui/toast"
```

```vue showLineNumbers
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>

<template>
  <Button @click="() => toast({
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
  })">
    Add to calendar
  </Button>
</template>
```

## Installation

Add the `Toaster` component to your root layout.

```vue showLineNumbers
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
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
toast({
  description: "Your message has been sent.",
})
```

### With title

```vue showLineNumbers
toast({
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
})
```

### With Action

```vue showLineNumbers
toast({
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
  action: {
    altText: "Try again",
    label: "Try again",
    onClick: () => {
      console.log("Try again")
    },
  },
})
```

### Destructive

```vue showLineNumbers
toast({
  variant: "destructive",
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
})
```
