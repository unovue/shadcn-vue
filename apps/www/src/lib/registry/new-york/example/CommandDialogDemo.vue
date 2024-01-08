<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { ref, watch } from 'vue'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/lib/registry/new-york/ui/command'

const open = ref(false)

const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value
}
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
    <CommandDialog v-model:open="open">
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
