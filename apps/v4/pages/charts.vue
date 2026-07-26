<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Beautiful Charts & Graphs'
const description
  = 'A collection of ready-to-use chart components built with Unovis/vue. From basic charts to rich data displays, copy and paste into your apps.'

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
        <a href="#charts">Browse Charts</a>
      </Button>
      <Button as-child variant="ghost" size="sm">
        <NuxtLink to="/docs/components/chart">
          Documentation
        </NuxtLink>
      </Button>
    </PageActions>
  </PageHeader>
  <PageNav id="charts">
    <ChartsNav />
    <ThemeSelector class="mr-4 hidden md:flex" />
  </PageNav>
  <div class="container-wrapper section-soft flex-1">
    <div class="container pb-6">
      <section class="theme-container">
        <NuxtPage />
      </section>
    </div>
  </div>
</template>
