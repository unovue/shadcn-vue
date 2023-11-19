---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/switch 
primitive: https://www.radix-vue.com/components/switch.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SwitchDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add switch
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project
 
 <<< @/lib/registry/default/ui/switch/Switch.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Switch } from '{{codeConfig.aliases.components}}/ui/switch'
</script>

<template>
  <{{codeConfig.prefix}}Switch />
</template>
```

## Examples

### Form

<ComponentPreview name="SwitchForm" />
