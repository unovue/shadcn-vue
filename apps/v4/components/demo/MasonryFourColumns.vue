<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card'
import { Masonry } from '@/registry/new-york-v4/ui/masonry'

const features = [
  { title: 'Edge Rendering', description: 'Deploy to 300+ locations worldwide for ultra-low latency.' },
  { title: 'Type Safe', description: 'Full TypeScript support with end-to-end type inference across your stack.' },
  { title: 'File Storage', description: 'Store and serve files globally with built-in CDN and image optimisation.' },
  { title: 'Auto Scaling', description: 'Scales from zero to millions of requests without any configuration.' },
  { title: 'Key-Value Store', description: 'Low-latency KV storage at the edge. Perfect for session data, feature flags, and rate limiting.' },
  { title: 'Analytics', description: 'Real-time insights into performance, errors, and usage patterns.' },
  { title: 'CI/CD', description: 'Automatic preview deployments on every pull request. Merge to deploy to production.' },
  { title: 'Observability', description: 'Distributed tracing, structured logs, and alerts built in so you can debug faster and ship with confidence.' },
]
</script>

<template>
  <Masonry :columns="4" :gap="3" class="w-full">
    <Card v-for="feature in features" :key="feature.title">
      <CardHeader>
        <CardTitle class="text-sm">
          {{ feature.title }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">
          {{ feature.description }}
        </p>
      </CardContent>
    </Card>
  </Masonry>
</template>
