---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
---

<ComponentPreview name="ComboboxDemo" />

<br>
<Callout title="Note" class="bg-destructive">

[Radix Vue](https://github.com/radix-vue/radix-vue/releases/tag/v1.2.0) introduced a breaking change. You will need to wrap `ComboboxGroup` and `ComboboxItem` inside of `ComboboxList` now.

</Callout>

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Command](/docs/components/command#installation) components.

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...' }}

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value">
        <CommandInput placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework"
              @select="open = false"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
```

## Examples

### Combobox

<ComponentPreview name="ComboboxDemo" />

### Popover

<ComponentPreview name="ComboboxPopover" />

### Dropdown menu

<ComponentPreview name="ComboboxDropdownMenu" />

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

<ComponentPreview name="ComboboxResponsive" />

### Form

<ComponentPreview name="ComboboxForm" />
