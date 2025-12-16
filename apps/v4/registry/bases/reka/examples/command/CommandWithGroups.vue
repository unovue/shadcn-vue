<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
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
} from "@/registry/bases/reka/ui/command"

const open = ref(false)
</script>

<template>
  <Example title="With Groups">
    <div class="flex flex-col gap-4">
      <Button
        variant="outline"
        class="w-fit"
        @click="open = true"
      >
        Open Menu
      </Button>
      <CommandDialog v-model:open="open">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem value="search-emoji">
                <IconPlaceholder
                  lucide="SmileIcon"
                  tabler="IconMoodSmile"
                  hugeicons="SmileIcon"
                />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem value="calculator">
                <IconPlaceholder
                  lucide="CalculatorIcon"
                  tabler="IconCalculator"
                  hugeicons="CalculatorIcon"
                />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing">
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings">
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  </Example>
</template>
