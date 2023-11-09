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
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

defineProps<Props>()

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

interface Props {
  variant?: BadgeVariantProps['variant']
}
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


## Examples

### Default

<ComponentPreview name="BadgeDemo"  /> 


### Secondary

<ComponentPreview name="BadgeSecondaryDemo" />

### Outline

<ComponentPreview name="BadgeOutlineDemo" />

### Destructive

<ComponentPreview name="BadgeDestructiveDemo" />