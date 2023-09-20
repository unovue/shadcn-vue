---
title: Badge
description: Displays a badge or a component that looks like a badge.
---


<ComponentPreview name="BadgeDemo"  /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add badge
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '.'
import { cn } from '@/lib/utils'

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

interface Props {
  variant?: BadgeVariantProps['variant']
}
defineProps<Props>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), $attrs.class ?? '')">
    <slot />
  </div>
</template>
```

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge>Badge</Badge>
</template>
```