<script setup lang="ts">
import { FilePenIcon, SearchIcon, TerminalIcon } from '@lucide/vue'
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'
</script>

<template>
  <Trace class="max-w-sm">
    <TraceLine>
      <TraceIcon>
        <FilePenIcon />
      </TraceIcon>
      <TraceTitle>
        Edited components/settings/NotificationPreferencesForm.vue
      </TraceTitle>
      <TraceDescription class="font-mono">
        +48 −12
      </TraceDescription>
    </TraceLine>
    <TraceLine>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>Ran pnpm test</TraceTitle>
      <TraceDescription>14s</TraceDescription>
    </TraceLine>
    <TraceLine>
      <TraceIcon>
        <SearchIcon />
      </TraceIcon>
      <TraceTitle>Searched for useChat</TraceTitle>
      <TraceDescription>8 results</TraceDescription>
    </TraceLine>
  </Trace>
</template>
