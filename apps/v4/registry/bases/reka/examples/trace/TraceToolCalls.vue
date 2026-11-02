<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Badge } from "@/registry/bases/reka/ui/badge"
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
</script>

<template>
  <Example title="Tool Calls">
    <Trace class="max-w-md">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="running">
            <TraceIcon>
              <IconPlaceholder
                lucide="TerminalIcon"
                tabler="IconTerminal"
                hugeicons="ComputerTerminal01Icon"
                phosphor="TerminalIcon"
                remixicon="RiTerminalBoxLine"
              />
            </TraceIcon>
            <TraceTitle>Running npm --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              {{ "$ npm --version" }}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              />
            </TraceIcon>
            <TraceTitle>
              Searched the web for app getting started installation
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="flex flex-wrap gap-1.5">
          <Badge variant="secondary">
            example.com/docs/install
          </Badge>
          <Badge variant="secondary">
            example.com/blog/getting-started
          </Badge>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </TraceIcon>
        <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
      </TraceLine>
      <TraceCollapsible default-open>
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
            <CodeBlockContent wrap>
              {{ "$ node --version\nv24.18.0" }}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
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
  </Example>
</template>
