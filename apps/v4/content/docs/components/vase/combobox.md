---
title: Combobox
description: Autocomplete input and command palette with a list of suggestions.
component: true
links:
  doc: https://vase-ui.com/components/combobox
  api: https://vase-ui.com/components/combobox#api-reference
---

::component-preview
---
name: ComboboxDemo
description: A combobox with a list of frameworks.
---
::

A combobox can be built in two ways:

- Using the `Combobox` components, built on top of the [Vase UI Combobox](https://vase-ui.com/components/combobox).
- Composing the `Popover` and the `Command` components as a listbox.

## Installation

### Combobox

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add combobox
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/combobox) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::


### Popover and Command

The listbox variant is built using a composition of the `Popover` and the `Command` components.

See installation instructions for the [Popover](/docs/components/vase/popover#installation) and the [Command](/docs/components/vase/command#installation) components.

## Usage

### Combobox

```vue showLineNumbers
<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/components/ui/combobox'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const selectedFramework = ref<(typeof frameworks)[number]>()
</script>

<template>
  <Combobox v-model="selectedFramework" :items="frameworks">
    <ComboboxTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
          variant="outline"
          class="w-[200px] justify-between"
        >
          {{ selectedFramework?.label ?? 'Select framework...' }}
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </template>
    </ComboboxTrigger>

    <ComboboxList>
      <ComboboxInput placeholder="Search framework..." />
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
      <ComboboxViewport>
        <template #item="{ item }">
          <ComboboxItem :value="item">
            {{ item.label }}
            <ComboboxItemIndicator>
              <CheckIcon />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </template>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
```

The root takes the data in `items`, and `ComboboxViewport` renders each item in its `item` slot. Put `ComboboxEmpty` before the viewport.

### Popover and Command

```vue showLineNumbers
<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[200px] justify-between"
        >
          {{
            value
              ? frameworks.find(framework => framework.value === value)?.label
              : 'Select framework...'
          }}
          <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </template>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="() => {
                value = value === framework.value ? '' : framework.value
                open = false
              }"
            >
              <CheckIcon
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

### User

A combobox with custom item rendering and an action item.

::component-preview
---
name: ComboboxUserDemo
description: A combobox with a list of users.
---
::

### Timezone

A combobox with grouped items and a scrollable viewport.

::component-preview
---
name: ComboboxTimezoneDemo
description: A combobox with a list of timezones.
---
::

### Multiple

A combobox with multiple selection.

::component-preview
---
name: ComboboxMultipleDemo
description: A combobox with multiple selection.
---
::

### With Listbox

A combobox built with the `Popover` and the `Command` components.

::component-preview
---
name: ComboboxWithListboxDemo
description: A combobox built with the Popover and Command components.
---
::
