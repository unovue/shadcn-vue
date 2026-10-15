<script setup lang="ts">
import { CircleCheckIcon, CircleIcon, RouteIcon } from '@lucide/vue'
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

const steps = [
  'Add a dark variant to the theme tokens',
  'Read the theme from a cookie on the server',
  'Add a toggle to the settings page',
  'Check contrast on the charts',
]
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <RouteIcon />
          </TraceIcon>
          <TraceTitle>Plan: add dark mode</TraceTitle>
          <TraceDescription>1 of {{ steps.length }} done</TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="flex flex-col gap-3">
        <p>
          Store the theme in a cookie so the server renders the right one and
          the page does not flash on load.
        </p>
        <Trace>
          <TraceLine
            v-for="(step, index) in steps"
            :key="step"
            :status="index > 0 ? 'pending' : undefined"
          >
            <TraceIcon>
              <CircleCheckIcon v-if="index === 0" />
              <CircleIcon v-else />
            </TraceIcon>
            <TraceTitle>{{ step }}</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
