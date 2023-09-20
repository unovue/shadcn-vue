---
title: Card
description: Displays a card with header, content, and footer.
---


<ComponentPreview name="CardDemo"  /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add card
```
</template>

<template #Manual>

#### Coming soon...
</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      Card Content
    </CardContent>
    <CardFooter>
      Card Footer
    </CardFooter>
  </Card>
</template>
```