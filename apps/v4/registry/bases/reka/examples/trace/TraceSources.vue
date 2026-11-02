<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/bases/reka/ui/trace"

const SOURCES = [
  {
    title: "Caching build outputs | example.com",
    href: "https://example.com/docs/caching",
  },
  {
    title: "Image optimization reference | example.com",
    href: "https://example.com/docs/images",
  },
  {
    title: "Deploy hooks and cache keys | example.com",
    href: "https://example.com/docs/deploy-hooks",
  },
]
</script>

<template>
  <Example title="Sources">
    <TraceCollapsible class="max-w-md" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceTitle>Used {{ SOURCES.length }} sources</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <a
            v-for="source in SOURCES"
            :key="source.href"
            :href="source.href"
            target="_blank"
            rel="noreferrer"
          >
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
                {{ source.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </TraceTitle>
              <TraceIcon>
                <IconPlaceholder
                  lucide="ArrowUpRightIcon"
                  tabler="IconArrowUpRight"
                  hugeicons="ArrowUpRight01Icon"
                  phosphor="ArrowUpRightIcon"
                  remixicon="RiArrowRightUpLine"
                />
              </TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Example>
</template>
