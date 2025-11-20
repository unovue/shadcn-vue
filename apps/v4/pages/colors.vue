<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Tailwind Colors in Every Format'
const description
  = 'The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <PageHeader>
      <Announcement />
      <PageHeaderHeading>{{ title }}</PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
      <PageActions>
        <Button as-child size="sm">
          <a href="#colors">Browse Colors</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <NuxtLink to="/docs/theming">
            Documentation
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <div class="hidden">
      <div class="container-wrapper">
        <div class="container flex items-center justify-between gap-8 py-4">
          <ColorsNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <div class="container py-6">
        <section id="colors" class="scroll-mt-20">
          <NuxtPage />
        </section>
      </div>
    </div>
  </div>
</template>
