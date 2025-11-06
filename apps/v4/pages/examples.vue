<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Build your Component Library'
const description
  = 'A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-1 flex-col">
    <PageHeader>
      <Announcement />
      <PageHeaderHeading>{{ title }}</PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
      <PageActions>
        <Button as-child size="sm">
          <NuxtLink to="/docs/installation">
            Get Started
          </NuxtLink>
        </Button>
        <Button as-child size="sm" variant="ghost">
          <NuxtLink to="/blocks">
            Browse Blocks
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <PageNav class="hidden md:flex">
      <ExamplesNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
      <ThemeSelector class="mr-4 hidden md:flex" />
    </PageNav>
    <div class="container-wrapper section-soft flex flex-1 flex-col pb-6">
      <div class="theme-container container flex flex-1 scroll-mt-20 flex-col">
        <div class="bg-background flex flex-col overflow-hidden rounded-lg border bg-clip-padding md:flex-1 xl:rounded-xl">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
