<script setup lang="ts">
import { ArrowUpRightIcon, GlobeIcon } from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const sources = [
  {
    title: 'Install Astro | docs.astro.build',
    href: 'https://docs.astro.build/en/install-and-setup/',
  },
  {
    title: 'create-astro | npmjs.com',
    href: 'https://www.npmjs.com/package/create-astro',
  },
  {
    title: 'Settings: minimumReleaseAge | pnpm.io',
    href: 'https://pnpm.io/settings#minimumreleaseage',
  },
]
</script>

<template>
  <div class="w-full max-w-sm">
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <GlobeIcon />
          </TraceIcon>
          <TraceTitle>Used {{ sources.length }} sources</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <a
            v-for="source in sources"
            :key="source.href"
            :href="source.href"
            target="_blank"
            rel="noreferrer"
          >
            <TraceLine>
              <TraceIcon>
                <GlobeIcon />
              </TraceIcon>
              <TraceTitle>
                {{ source.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </TraceTitle>
              <TraceIcon>
                <ArrowUpRightIcon />
              </TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </div>
</template>
