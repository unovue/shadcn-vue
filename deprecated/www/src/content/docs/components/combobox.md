---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
source: apps/www/src/registry/default/ui/combobox
primitive: https://www.reka-ui.com/docs/components/combobox.html
---

<ComponentPreview name="ComboboxDemo" />

<br>

## Installation

```bash
npx shadcn-vue@latest add combobox
```

## Usage

```vue
<script setup lang="ts">
import { Check, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from '@/components/ui/combobox'

interface Framework { value: string, label: string }

const frameworks: Framework[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const value = ref<Framework | undefined>()
</script>

<template>
  <Combobox v-model="value" by="value">
    <ComboboxAnchor>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9"
          :display-value="(val) => val?.label ?? ''"
          placeholder="Select framework..."
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>
    <ComboboxList>
      <ComboboxEmpty>
        No framework found.
      </ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem
          v-for="framework in frameworks"
          :key="framework.value"
          :value="framework"
        >
          {{ framework.label }}
          <ComboboxItemIndicator>
            <Check class="ml-auto size-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
```

## Examples

### Combobox Trigger

<ComponentPreview name="ComboboxTrigger" />

<!-- ### Popover

<ComponentPreview name="ComboboxPopover" />

### Dropdown menu

<ComponentPreview name="ComboboxDropdownMenu" />

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

<ComponentPreview name="ComboboxResponsive" /> -->

### Form

<ComponentPreview name="ComboboxForm" />
