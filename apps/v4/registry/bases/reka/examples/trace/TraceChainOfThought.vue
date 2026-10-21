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
  <Example title="Chain of Thought">
    <TraceCollapsible class="max-w-md" default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine status="running">
          <TraceTitle>Looking into the slow deploy</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
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
                <TraceTitle>Searched for the checkout build log</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent class="flex flex-wrap gap-1.5">
              <Badge variant="secondary">
                vercel.com
              </Badge>
              <Badge variant="secondary">
                github.com
              </Badge>
              <Badge variant="secondary">
                nextjs.org
              </Badge>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible default-open>
            <TraceCollapsibleTrigger>
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
                <TraceTitle>Read the last twelve deploys</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              Image optimization takes almost four minutes on every deploy.
              The other steps finish in under a minute.
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine status="running">
                <TraceIcon>
                  <IconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  />
                </TraceIcon>
                <TraceTitle>Searching for the cache key</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm">
                <CodeBlockContent wrap class="max-h-64">
                  {{ "cache key image optimization" }}
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Example>
</template>
