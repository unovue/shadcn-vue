---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/registry/default/ui/switch
primitive: https://www.reka-ui.com/docs/components/switch.html
---

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
npm install reka-ui
```

### Copy and paste the following code into your project

 <<< @/registry/default/ui/switch/Switch.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <Switch />
</template>
```

# Add icon inside switch thumb

```vue
<template>
  <Switch :model-value="isDark" @update:model-value="toggleTheme">
    <template #thumb>
      <Icon v-if="isDark" icon="lucide:moon" class="size-3" />
      <Icon v-else icon="lucide:sun" class="size-3" />
    </template>
  </Switch>
</template>
```

## Examples

### Form

<ComponentPreview name="SwitchForm" />
