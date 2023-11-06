---
title: Alert
description: Displays a callout for user attention.
---


<ComponentPreview name="AlertDemo"  /> 

## Installation

 
```bash
npx shadcn-vue@latest add alert
```
  
## Usage

```vue
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
```

## Examples

### Default

<ComponentPreview name="AlertDemo"  /> 


### Destructive

<ComponentPreview name="AlertDestructiveDemo"  /> 


