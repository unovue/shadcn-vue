<script setup lang="ts">
import { CircleXIcon, FileCodeIcon, LayersIcon } from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const STACK = `TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/utils/billing.ts:42:31)
    at setup (app/components/InvoiceRow.vue:18:12)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:200:19)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7848:25)
    at setupComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7809:36)
    at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5159:7)`

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes('node_modules'),
  }
}

const [error, ...lines] = STACK.split('\n').map(line => line.trim())
const frames = lines.map(parseFrame)
const appFrames = frames.filter(frame => !frame.internal)
const internalFrames = frames.filter(frame => frame.internal)
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <CircleXIcon />
          </TraceIcon>
          <TraceTitle>Failed: {{ error }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="flex flex-col gap-2">
        <p class="font-mono text-xs text-destructive">
          {{ error }}
        </p>
        <Trace>
          <a
            v-for="frame in appFrames"
            :key="frame.line"
            :href="`#${frame.file}:${frame.lineNumber}`"
          >
            <TraceLine>
              <TraceIcon>
                <FileCodeIcon />
              </TraceIcon>
              <TraceTitle>
                {{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}
              </TraceTitle>
            </TraceLine>
          </a>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <LayersIcon />
                </TraceIcon>
                <TraceTitle>
                  {{ internalFrames.length }} framework frames
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <ol class="flex flex-col gap-1 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
                <li
                  v-for="frame in internalFrames"
                  :key="frame.line"
                  class="whitespace-nowrap"
                >
                  {{ frame.line }}
                </li>
              </ol>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
