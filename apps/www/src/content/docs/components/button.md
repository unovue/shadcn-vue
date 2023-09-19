---
title: Button
description: Displays a button or a component that looks like a button.
---


<ComponentPreview name="ButtonDemo"  /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add button
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component
    :is="as"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </component>
</template>
```

</Steps>
</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Button</Button>
</template>
```