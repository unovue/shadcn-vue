---
title: Toggle
description: A two-state button that can be either on or off.
source: apps/www/src/lib/registry/default/ui/toggle 
primitive: https://www.radix-vue.com/components/toggle.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="ToggleDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/toggle/Toggle.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Toggle } from '{{codeConfig.aliases.components}}/ui/toggle'
</script>

<template>
  <{{codeConfig.prefix}}Toggle>Toggle</{{codeConfig.prefix}}Toggle>
</template>
```

## Examples

### Default 

<ComponentPreview name="ToggleDemo" /> 


### Outline

<ComponentPreview name="ToggleItalicDemo" /> 


### With Text

<ComponentPreview name="ToggleItalicWithTextDemo" />


### Small

<ComponentPreview name="ToggleSmallDemo" />


### Large

<ComponentPreview name="ToggleLargeDemo" />


### Disabled

<ComponentPreview name="ToggleDisabledDemo" />



