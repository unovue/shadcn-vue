<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/bases/reka/ui/hover-card'

interface Source {
  url: string
  title: string
  description: string
}

const sources = {
  streaming: {
    url: 'https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming',
    title: 'Linking and Navigating',
    description: 'How the App Router streams a route to the browser.',
  },
  suspense: {
    url: 'https://react.dev/reference/react/Suspense',
    title: '<Suspense>',
    description: 'Display a fallback until its children have finished loading.',
  },
  serverComponents: {
    url: 'https://react.dev/reference/rsc/server-components',
    title: 'Server Components',
    description: 'Components that render ahead of time, on the server.',
  },
  loading: {
    url: 'https://nextjs.org/docs/app/api-reference/file-conventions/loading',
    title: 'loading.js',
    description: 'Show an instant loading state for a route segment.',
  },
  chunked: {
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding',
    title: 'Transfer-Encoding',
    description: 'Send a response as a series of chunks.',
  },
} satisfies Record<string, Source>

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}

const [DefineCitation, Citation] = createReusableTemplate<{ source: Source }>()
</script>

<template>
  <DefineCitation v-slot="{ source }">
    <HoverCard :open-delay="10" :close-delay="100">
      <HoverCardTrigger as-child>
        <Button variant="secondary" size="xs">
          {{ hostname(source.url) }}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent class="flex w-64 flex-col gap-1">
        <div class="font-medium">
          {{ source.title }}
        </div>
        <p class="text-muted-foreground">
          {{ source.description }}
        </p>
        <a
          :href="source.url"
          target="_blank"
          rel="noreferrer"
          class="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {{ hostname(source.url) }}
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </HoverCardContent>
    </HoverCard>
  </DefineCitation>

  <div class="mx-auto flex max-w-sm flex-col gap-3 py-6 text-sm leading-relaxed">
    <p>
      Next.js streams a route in chunks, so the page shows up before every
      request finishes. <Citation :source="sources.streaming" />
    </p>
    <p>
      Wrap a slow part of the page in a Suspense boundary and React sends the
      fallback first. When the data resolves, the finished HTML streams into
      the same response and replaces the fallback, with no extra request from
      the browser. <Citation :source="sources.suspense" /> Server Components
      help here, because their code never ships to the browser.
      <Citation :source="sources.serverComponents" />
    </p>
    <p>
      A loading.tsx file does the same for a whole route segment.
      <Citation :source="sources.loading" /> It all runs over chunked transfer
      encoding, so there is nothing extra to set up.
      <Citation :source="sources.chunked" />
    </p>
  </div>
</template>
