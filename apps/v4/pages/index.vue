<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import ExamplesRoot from '~/components/examples/ExamplesRoot.vue'

const title = 'The Foundation for your Design System'
const description
  = 'A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.'

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
      <PageHeaderHeading class="max-w-4xl">
        {{ title }}
      </PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
      <PageActions>
        <Button as-child size="sm">
          <NuxtLink to="/docs/installation">
            Get Started
          </NuxtLink>
        </Button>
        <Button as-child size="sm" variant="ghost">
          <NuxtLink to="/docs/components">
            View Components
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <PageNav class="hidden md:flex">
      <ExamplesNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
      <ThemeSelector class="mr-4 hidden md:flex" />
    </PageNav>
    <div class="container-wrapper section-soft flex-1 pb-6">
      <div class="container overflow-hidden">
        <section class="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]">
          <NuxtImg
            src="/r/styles/new-york-v4/dashboard-01-light.png"
            width="1400"
            height="875"
            alt="Dashboard"
            class="block dark:hidden"
          />
          <NuxtImg
            src="/r/styles/new-york-v4/dashboard-01-dark.png"
            width="1400"
            height="875"
            alt="Dashboard"
            class="hidden dark:block"
          />
        </section>
        <section class="theme-container hidden md:block">
          <ExamplesRoot />
        </section>
      </div>
    </div>
  </div>
</template>
