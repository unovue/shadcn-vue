<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import { useToggle } from '@vueuse/core'
import { Button } from '@/registry/bases/reka/ui/button'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const [open, toggleOpen] = useToggle(false)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col items-start gap-4">
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran node --version</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ '$ node --version\nv24.18.0' }}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible v-model:open="open">
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran pnpm --version</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ '$ pnpm --version\n10.33.4' }}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <Button variant="outline" size="sm" @click="toggleOpen()">
      {{ open ? 'Hide' : 'Show' }} the pnpm output
    </Button>
  </div>
</template>
