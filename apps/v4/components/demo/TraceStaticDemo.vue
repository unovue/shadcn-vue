<script setup lang="ts">
import { GitBranchIcon } from '@lucide/vue'
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
        <GitBranchIcon />
      </TraceIcon>
      <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
    </TraceLine>
  </Trace>
</template>
