---
title: Command
description: Fast, composable, unstyled command menu.
source: apps/www/src/lib/registry/default/ui/command 
primitive: https://www.radix-vue.com/components/combobox.html
---


<ComponentPreview name="CommandDemo" /> 



## Installation

 
```bash
npx shadcn-vue@latest add command
``` 
## Usage

```vue
<script setup lang="ts">
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">
          Calendar
        </CommandItem>
        <CommandItem value="search-emoji">
          Search Emoji
        </CommandItem>
        <CommandItem value="calculator">
          Calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="profile">
          Profile
        </CommandItem>
        <CommandItem value="billing">
          Billing
        </CommandItem>
        <CommandItem value="settings">
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

## Examples 

### Dialog 

<ComponentPreview name="CommandDialogDemo" />

To show the command menu in a dialog, use the `<CommandDialog />` component.

```vue
<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { ref, watch } from 'vue'

const open = ref(false)

const keys = useMagicKeys()
const CmdJ = keys['Cmd+J']

function handleOpenChange() {
  open.value = !open.value
}

watch(CmdJ, (v) => {
  if (v)
    handleOpenChange()
})
</script>

<template>
  <div>
    <p class="text-sm text-muted-foreground">
      Press
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>J
      </kbd>
    </p>
    <CommandDialog :open="open" :on-open-change="handleOpenChange">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji">
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator">
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            Profile
          </CommandItem>
          <CommandItem value="billing">
            Billing
          </CommandItem>
          <CommandItem value="settings">
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
```

### Combobox

You can use the `<Command />` component as a combobox. See the [Combobox](/docs/components/combobox) page for more information.