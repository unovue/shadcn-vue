<script setup lang="ts">
import { CircleCheckIcon, LoaderCircleIcon } from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine status="running">
          <TraceIcon>
            <LoaderCircleIcon class="animate-spin" />
          </TraceIcon>
          <TraceTitle>Running the research agent</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
          </TraceLine>
          <TraceLine status="running">
            <TraceIcon>
              <LoaderCircleIcon class="animate-spin" />
            </TraceIcon>
            <TraceTitle>
              Running sed -n 13,15p scripts/optimize-images.ts
            </TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
