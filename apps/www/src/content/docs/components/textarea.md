---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


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

<<< @/lib/registry/default/ui/textarea/Textarea.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Textarea } from '{{codeConfig.aliases.components}}/ui/textarea'
</script>

<template>
  <{{codeConfig.prefix}}Textarea />
</template>
```

## Examples

### Default

<ComponentPreview name="TextareaDemo" />

### Disabled

<ComponentPreview name="TextareaDisabled" />

### With Label

<ComponentPreview name="TextareaWithLabel"   />

### With Text

<ComponentPreview name="TextareaWithText" />

### With Button

<ComponentPreview name="TextareaWithButton" />

### Form

<ComponentPreview name="TextareaForm" />
