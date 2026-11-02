<script setup lang="ts">
import {
  BrainIcon,
  ChevronRightIcon,
  FileTextIcon,
  TerminalIcon,
} from '@lucide/vue'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
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
  <div class="w-full max-w-sm">
    <TraceCollapsible default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceTitle>Worked for 2m 4s, 1 command failed</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="flex flex-col gap-2">
        <Trace>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <BrainIcon />
                </TraceIcon>
                <TraceTitle>Thought</TraceTitle>
                <TraceDescription>12s</TraceDescription>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent class="whitespace-pre-wrap">
              I should check which package managers are installed before I
              scaffold anything.
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible default-open :unmount-on-hide="false">
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <TerminalIcon />
                </TraceIcon>
                <TraceTitle>Ran 2 commands, 1 failed</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <TraceLine>
                  <TraceIcon>
                    <TerminalIcon />
                  </TraceIcon>
                  <TraceTitle>Ran node --version</TraceTitle>
                </TraceLine>
                <TraceCollapsible>
                  <TraceCollapsibleTrigger>
                    <TraceLine status="error">
                      <TraceIcon>
                        <TerminalIcon />
                      </TraceIcon>
                      <TraceTitle>Failed to run pnpm --version</TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <CodeBlock size="sm" variant="destructive">
                      <CodeBlockContent wrap class="max-h-64">
                        command not found: pnpm
                      </CodeBlockContent>
                    </CodeBlock>
                  </TraceCollapsibleContent>
                </TraceCollapsible>
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
        <p>Node is installed and pnpm is not. Reading the docs config.</p>
        <Trace>
          <a href="#turn">
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
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </div>
</template>
