<script setup lang="ts">
import { CircleCheckIcon } from '@lucide/vue'
import { Badge } from '@/registry/bases/reka/ui/badge'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Ran the research agent</TraceTitle>
          <TraceDescription>48s</TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-1.5">
          <Badge variant="secondary">
            anthropic/claude-sonnet-4.5
          </Badge>
          <Badge variant="outline" class="font-mono">
            runCommand
          </Badge>
        </div>
        <p>Find out why image optimization reruns on every deploy.</p>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>
              Ran sed -n 13,15p scripts/optimize-images.ts
            </TraceTitle>
          </TraceLine>
        </Trace>
        <p>The cache is keyed on the commit SHA.</p>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
