<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Pick a Color. Make it yours.'
const description
  = 'Try our hand-picked themes. Copy and paste them into your project. New theme editor coming soon.'

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
          <a href="#themes">Browse Themes</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <NuxtLink to="/docs/theming">
            Documentation
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>

    <div id="themes" class="container-wrapper scroll-mt-20">
      <div class="container flex items-center justify-between gap-8 px-6 py-4 md:px-8">
        <ThemeCustomizer />
      </div>
    </div>
    <div class="container-wrapper section-soft flex flex-1 flex-col pb-6">
      <div class="theme-container container flex flex-1 flex-col">
        <CardsDemo />
      </div>
    </div>
  </div>
</template>
