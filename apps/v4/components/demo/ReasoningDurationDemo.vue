<script setup lang="ts">
import { CircleCheckIcon } from '@lucide/vue'
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

const text = 'The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.'
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Thought</TraceTitle>
          <TraceDescription>12s</TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
