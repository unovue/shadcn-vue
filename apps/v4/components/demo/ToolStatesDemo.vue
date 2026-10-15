<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const status = ` M server/api/chat.post.ts
 M components/Chat.vue`
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran git status --short</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ status }}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Failed to run pnpm dev</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            Command timed out after 120 seconds.
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceLine>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>Denied rm -rf dist</TraceTitle>
    </TraceLine>
    <TraceLine status="running">
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>Running pnpm test</TraceTitle>
    </TraceLine>
  </Trace>
</template>
