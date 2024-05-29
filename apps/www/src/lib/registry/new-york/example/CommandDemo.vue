<script setup lang="ts">
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-icons/vue'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/lib/registry/new-york/ui/command'
</script>

<template>
  <Command class="rounded-lg border shadow-md max-w-[450px]">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="Calendar">
          <CalendarIcon class="mr-2 size-4" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem value="Search Emoji">
          <FaceIcon class="mr-2 size-4" />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem value="Launch">
          <RocketIcon class="mr-2 size-4" />
          <span>Launch</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="Profile">
          <PersonIcon class="mr-2 size-4" />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem value="Mail">
          <EnvelopeClosedIcon class="mr-2 size-4" />
          <span>Mail</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem value="Settings">
          <GearIcon class="mr-2 size-4" />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
