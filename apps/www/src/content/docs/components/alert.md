---
title: Alert
description: Displays a callout for user attention.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>

<ComponentPreview name="AlertDemo"  /> 

## Installation

 
```bash
npx shadcn-vue@latest add alert
```
  
## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Alert, {{codeConfig.prefix}}AlertDescription, {{codeConfig.prefix}}AlertTitle } from '{{codeConfig.aliases.components}}/ui/alert'
</script>

<template>
  <{{codeConfig.prefix}}Alert>
    <{{codeConfig.prefix}}AlertTitle>Heads up!</{{codeConfig.prefix}}AlertTitle>
    <{{codeConfig.prefix}}AlertDescription>
      You can add components to your app using the cli.
    </{{codeConfig.prefix}}AlertDescription>
  </{{codeConfig.prefix}}Alert>
</template>
```

## Examples

### Default

<ComponentPreview name="AlertDemo"  /> 


### Destructive

<ComponentPreview name="AlertDestructiveDemo"  /> 


