---
title: Command
description: Fast, composable, unstyled command menu.
source: apps/www/src/lib/registry/default/ui/command 
primitive: https://www.radix-vue.com/components/combobox.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="CommandDemo" /> 



## Installation

 
```bash
npx shadcn-vue@latest add command
``` 
## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Command,
  {{codeConfig.prefix}}CommandDialog,
  {{codeConfig.prefix}}CommandEmpty,
  {{codeConfig.prefix}}CommandGroup,
  {{codeConfig.prefix}}CommandInput,
  {{codeConfig.prefix}}CommandItem,
  {{codeConfig.prefix}}CommandList,
  {{codeConfig.prefix}}CommandSeparator,
  {{codeConfig.prefix}}CommandShortcut,
} from '{{codeConfig.aliases.components}}/ui/command'
</script>

<template>
  <{{codeConfig.prefix}}Command>
    <{{codeConfig.prefix}}CommandInput placeholder="Type a command or search..." />
    <{{codeConfig.prefix}}CommandList>
      <{{codeConfig.prefix}}CommandEmpty>No results found.</{{codeConfig.prefix}}CommandEmpty>
      <{{codeConfig.prefix}}CommandGroup heading="Suggestions">
        <{{codeConfig.prefix}}CommandItem value="calendar">
          Calendar
        </{{codeConfig.prefix}}CommandItem>
        <{{codeConfig.prefix}}CommandItem value="search-emoji">
          Search Emoji
        </{{codeConfig.prefix}}CommandItem>
        <{{codeConfig.prefix}}CommandItem value="calculator">
          Calculator
        </{{codeConfig.prefix}}CommandItem>
      </{{codeConfig.prefix}}CommandGroup>
      <{{codeConfig.prefix}}CommandSeparator />
      <{{codeConfig.prefix}}CommandGroup heading="Settings">
        <{{codeConfig.prefix}}CommandItem value="profile">
          Profile
        </{{codeConfig.prefix}}CommandItem>
        <{{codeConfig.prefix}}CommandItem value="billing">
          Billing
        </{{codeConfig.prefix}}CommandItem>
        <{{codeConfig.prefix}}CommandItem value="settings">
          Settings
        </{{codeConfig.prefix}}CommandItem>
      </{{codeConfig.prefix}}CommandGroup>
    </{{codeConfig.prefix}}CommandList>
  </{{codeConfig.prefix}}Command>
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
