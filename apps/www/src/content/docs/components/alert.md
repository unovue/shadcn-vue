---
title: Alert
description: Displays a callout for user attention.
---


<ComponentPreview name="AlertDemo"  /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add alert
```
</template>

<template #Manual>

#### Coming soon...
</template>
</TabPreview>

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