---
title: Kbd
description: Used to display textual user input from keyboard.
---

<ComponentPreview name="KbdDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add kbd
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project:

`index.ts`

<<< @/registry/default/ui/kbd/index.ts

`Kbd.vue`

<<< @/registry/default/ui/kbd/Kbd.vue

`KbdGroup.vue`

<<< @/registry/default/ui/kbd/KbdGroup.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'
</script>

<template>
  <Kbd>Ctrl</Kbd>
</template>
```

<!-- TODO 这里根据 shadcn 的文档更新 -->
## Examples

### Group

Use the `KbdGroup` component to group keyboard keys together.

<ComponentPreview name="KbdDemo" />

### Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

<ComponentPreview name="KbdWithButton" />

### Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

<ComponentPreview name="KbdWithTooltip" />
