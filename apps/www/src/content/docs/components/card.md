---
title: Card
description: Displays a card with header, content, and footer.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="CardFormDemo"  /> 

## Installation

 

```bash
npx shadcn-vue@latest add card
``` 

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Card,
  {{codeConfig.prefix}}CardContent,
  {{codeConfig.prefix}}CardDescription,
  {{codeConfig.prefix}}CardFooter,
  {{codeConfig.prefix}}CardHeader,
  {{codeConfig.prefix}}CardTitle,
} from '{{codeConfig.aliases.components}}/ui/card'
</script>

<template>
  <{{codeConfig.prefix}}Card>
    <{{codeConfig.prefix}}CardHeader>
      <{{codeConfig.prefix}}CardTitle>Card Title</{{codeConfig.prefix}}CardTitle>
      <{{codeConfig.prefix}}CardDescription>Card Description</{{codeConfig.prefix}}CardDescription>
    </{{codeConfig.prefix}}CardHeader>
    <{{codeConfig.prefix}}CardContent>
      Card Content
    </{{codeConfig.prefix}}CardContent>
    <{{codeConfig.prefix}}CardFooter>
      Card Footer
    </{{codeConfig.prefix}}CardFooter>
  </{{codeConfig.prefix}}Card>
</template>
```

## Examples

<ComponentPreview name="CardDemo"  /> 
