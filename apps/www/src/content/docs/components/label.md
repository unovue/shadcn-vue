---
title: Label
description: Renders an accessible label associated with controls.
source: apps/www/src/lib/registry/default/ui/label 
primitive: https://www.radix-vue.com/components/label.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="LabelDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add label
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/label/Label.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Label } from '{{codeConfig.aliases.components}}/ui/label'
</script>

<template>
  <{{codeConfig.prefix}}Label for="email">Your email address</{{codeConfig.prefix}}Label>
</template>
```
