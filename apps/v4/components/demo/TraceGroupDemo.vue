<script setup lang="ts">
import { FileTextIcon, SearchIcon, TerminalIcon } from '@lucide/vue'
import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'
</script>

<template>
  <Trace class="max-w-sm">
    <TraceLine>
      <TraceIcon>
        <SearchIcon />
      </TraceIcon>
      <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
    </TraceLine>
    <TraceLine>
      <TraceIcon>
        <FileTextIcon />
      </TraceIcon>
      <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
    </TraceLine>
    <TraceLine>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>Ran pnpm install</TraceTitle>
    </TraceLine>
  </Trace>
</template>
