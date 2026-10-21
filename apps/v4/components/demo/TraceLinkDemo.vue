<script setup lang="ts">
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  FileTextIcon,
  GlobeIcon,
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
    <a href="#link">
      <TraceLine>
        <TraceIcon>
          <FileTextIcon />
        </TraceIcon>
        <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
        <TraceIcon>
          <ChevronRightIcon />
        </TraceIcon>
      </TraceLine>
    </a>
    <a
      href="https://docs.astro.build/en/install-and-setup/"
      target="_blank"
      rel="noreferrer"
    >
      <TraceLine>
        <TraceIcon>
          <GlobeIcon />
        </TraceIcon>
        <TraceTitle>
          Install Astro | docs.astro.build
          <span class="sr-only"> (opens in a new tab)</span>
        </TraceTitle>
        <TraceIcon>
          <ArrowUpRightIcon />
        </TraceIcon>
      </TraceLine>
    </a>
  </Trace>
</template>
