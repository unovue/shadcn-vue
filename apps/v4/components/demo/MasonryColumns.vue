<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card'
import { Masonry } from '@/registry/new-york-v4/ui/masonry'

const posts = [
  {
    title: 'Getting Started with Vue 3',
    category: 'Tutorial',
    excerpt: 'Learn the fundamentals of Vue 3 composition API, reactive state, and component design patterns to build modern web applications.',
  },
  {
    title: 'Tailwind CSS Tips',
    category: 'Design',
    excerpt: 'A collection of practical Tailwind CSS techniques for building responsive, accessible UIs faster.',
  },
  {
    title: 'TypeScript Best Practices',
    category: 'Engineering',
    excerpt: 'How to leverage TypeScript\'s type system to write safer, more maintainable code in large-scale Vue projects. Covers generics, discriminated unions, and utility types.',
  },
  {
    title: 'State Management in 2025',
    category: 'Architecture',
    excerpt: 'Comparing Pinia, composables, and server state libraries. When to use each and how to structure your data layer.',
  },
  {
    title: 'Nuxt Performance',
    category: 'Performance',
    excerpt: 'Techniques for optimising Nuxt applications including route-level code splitting, lazy hydration, and edge rendering.',
  },
  {
    title: 'Accessible Components',
    category: 'Accessibility',
    excerpt: 'Building ARIA-compliant components with reka-ui. A practical guide to keyboard navigation, focus management, and screen reader support. We cover live regions, modal trapping, skip links, and how to test your components with assistive technologies.',
  },
]
</script>

<template>
  <Masonry :columns="2" class="w-full">
    <Card v-for="post in posts" :key="post.title">
      <CardHeader>
        <p class="text-xs text-muted-foreground">
          {{ post.category }}
        </p>
        <CardTitle class="text-base">
          {{ post.title }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">
          {{ post.excerpt }}
        </p>
      </CardContent>
    </Card>
  </Masonry>
</template>
