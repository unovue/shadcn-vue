---
title: Input
description: Displays a form input field or a component that looks like an input field.
---


<ComponentPreview name="InputDemo" class="[&_input]:max-w-xs" /> 


<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add input
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project:

```vue
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" type="text" :class="cn(cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? ''))">
</template>
```

</Steps>



</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input />
</template>
```