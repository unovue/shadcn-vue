<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Building Blocks for the Web'
const description
  = 'Clean, modern building blocks. Copy and paste into your apps. Works with all Vue frameworks. Open Source. Free forever.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <PageHeader>
    <Announcement />
    <PageHeaderHeading>{{ title }}</PageHeaderHeading>
    <PageHeaderDescription>{{ description }}</PageHeaderDescription>
    <PageActions>
      <Button as-child size="sm">
        <a href="#blocks">Browse Blocks</a>
      </Button>
      <Button as-child variant="ghost" size="sm">
        <NuxtLink to="/docs/blocks">
          Add a block
        </NuxtLink>
      </Button>
    </PageActions>
  </PageHeader>
  <PageNav id="blocks">
    <BlocksNav />
    <Button
      as-child
      variant="secondary"
      size="sm"
      class="mr-7 hidden shadow-none lg:flex"
    >
      <NuxtLink to="/blocks/sidebar">
        Browse all blocks
      </NuxtLink>
    </Button>
  </PageNav>
  <div class="container-wrapper section-soft flex-1 md:py-12">
    <div class="container">
      <NuxtPage />
    </div>
  </div>
</template>
