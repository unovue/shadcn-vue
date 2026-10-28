<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/reka/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/reka/ui/trace"

const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`
</script>

<template>
  <Example title="Whole Turn" container-class-name="md:col-span-2">
    <TraceCollapsible class="max-w-md" default-open :unmount-on-hide="false">
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
                  <IconPlaceholder
                    lucide="BrainIcon"
                    tabler="IconBrain"
                    hugeicons="AiBrainIcon"
                    phosphor="BrainIcon"
                    remixicon="RiBrainLine"
                  />
                </TraceIcon>
                <TraceTitle>Thought for 12 seconds</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent class="whitespace-pre-wrap">
              {{ REASONING }}
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible default-open :unmount-on-hide="false">
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <IconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                  />
                </TraceIcon>
                <TraceTitle>Ran 3 commands, 1 failed</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <TraceCollapsible>
                  <TraceCollapsibleTrigger>
                    <TraceLine>
                      <TraceIcon>
                        <IconPlaceholder
                          lucide="TerminalIcon"
                          tabler="IconTerminal"
                          hugeicons="ComputerTerminal01Icon"
                          phosphor="TerminalIcon"
                          remixicon="RiTerminalBoxLine"
                        />
                      </TraceIcon>
                      <TraceTitle>Ran node --version</TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <CodeBlock size="sm">
                      <CodeBlockContent wrap class="max-h-64">
                        {{ "v24.18.0" }}
                      </CodeBlockContent>
                    </CodeBlock>
                  </TraceCollapsibleContent>
                </TraceCollapsible>
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="TerminalIcon"
                      tabler="IconTerminal"
                      hugeicons="ComputerTerminal01Icon"
                      phosphor="TerminalIcon"
                      remixicon="RiTerminalBoxLine"
                    />
                  </TraceIcon>
                  <TraceTitle>Ran mkdir -p dist</TraceTitle>
                </TraceLine>
                <TraceCollapsible>
                  <TraceCollapsibleTrigger>
                    <TraceLine status="error">
                      <TraceIcon>
                        <IconPlaceholder
                          lucide="TerminalIcon"
                          tabler="IconTerminal"
                          hugeicons="ComputerTerminal01Icon"
                          phosphor="TerminalIcon"
                          remixicon="RiTerminalBoxLine"
                        />
                      </TraceIcon>
                      <TraceTitle>Failed to run pnpm --version</TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <CodeBlock size="sm" variant="destructive">
                      <CodeBlockContent wrap class="max-h-64">
                        {{ "command not found: pnpm" }}
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
          <a href="#whole-turn">
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="File02Icon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                />
              </TraceIcon>
              <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
              <TraceIcon>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
              </TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Example>
</template>
