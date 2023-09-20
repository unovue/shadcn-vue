---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
---

<ComponentPreview name="TextareaDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add textarea
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
import { cn } from '@/lib/utils'
</script>

<template>
  <textarea :class="cn('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')" />
</template>
```

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Textarea />
</template>
```