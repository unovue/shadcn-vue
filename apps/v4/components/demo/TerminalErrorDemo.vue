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

const LINT_OUTPUT = `> acme-chat@0.1.0 lint
> eslint .

server/api/chat.post.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/Chat.vue
  42:5  error  'messages' is defined but never used  vue/no-unused-vars

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.`
</script>

<template>
  <Trace class="max-w-sm">
    <TraceLine>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>Ran pnpm install</TraceTitle>
    </TraceLine>
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>pnpm lint exited with code 1</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ LINT_OUTPUT }}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
