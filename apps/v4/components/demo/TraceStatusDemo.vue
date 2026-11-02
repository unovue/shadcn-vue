<script setup lang="ts">
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleIcon,
  LoaderCircleIcon,
} from '@lucide/vue'
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
        <CircleCheckIcon />
      </TraceIcon>
      <TraceTitle>Ran pnpm install</TraceTitle>
    </TraceLine>
    <TraceLine status="error">
      <TraceIcon>
        <CircleAlertIcon />
      </TraceIcon>
      <TraceTitle>Failed to run pnpm lint</TraceTitle>
    </TraceLine>
    <TraceLine status="running">
      <TraceIcon>
        <LoaderCircleIcon class="animate-spin" />
      </TraceIcon>
      <TraceTitle>Running pnpm build</TraceTitle>
    </TraceLine>
    <TraceLine status="pending">
      <TraceIcon>
        <CircleIcon />
      </TraceIcon>
      <TraceTitle>Run pnpm test</TraceTitle>
    </TraceLine>
  </Trace>
</template>
