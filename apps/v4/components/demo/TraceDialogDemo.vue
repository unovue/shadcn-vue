<script setup lang="ts">
import { ArrowUpRightIcon, ChevronRightIcon, GlobeIcon } from '@lucide/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/bases/reka/ui/dialog'
import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

const results = [
  {
    title: 'Caching build outputs',
    url: 'https://nextjs.org/docs/app/guides/caching',
  },
  {
    title: 'Image optimization reference',
    url: 'https://nextjs.org/docs/app/api-reference/components/image',
  },
  {
    title: 'Deploy hooks and cache keys',
    url: 'https://vercel.com/docs/deploy-hooks',
  },
]
</script>

<template>
  <Trace class="max-w-sm">
    <Dialog>
      <DialogTrigger as-child>
        <button type="button">
          <TraceLine>
            <TraceIcon>
              <GlobeIcon />
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
            <TraceIcon>
              <ChevronRightIcon />
            </TraceIcon>
          </TraceLine>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Searched the web for cache keys</DialogTitle>
          <DialogDescription>
            Three results were used in the response.
          </DialogDescription>
        </DialogHeader>
        <Trace>
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            target="_blank"
            rel="noreferrer"
          >
            <TraceLine>
              <TraceIcon>
                <GlobeIcon />
              </TraceIcon>
              <TraceTitle>
                {{ result.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </TraceTitle>
              <TraceIcon>
                <ArrowUpRightIcon />
              </TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </DialogContent>
    </Dialog>
  </Trace>
</template>
