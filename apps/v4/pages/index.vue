<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Build your Component Library'
const description
  = 'A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.'
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
    <div class="container-wrapper section-soft flex-1 pb-6">
      <div class="container overflow-hidden">
        <section class="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]">
          <!-- <img
              src="/r/styles/new-york-v4/dashboard-01-light.png"
              width="1400"
              height="875"
              alt="Dashboard"
              class="block dark:hidden"
              priority
            >
            <img
              src="/r/styles/new-york-v4/dashboard-01-dark.png"
              width="1400"
              height="875"
              alt="Dashboard"
              class="hidden dark:block"
              priority
            > -->
        </section>
        <section class="theme-container hidden md:block">
          <CardsDemo />
        </section>
      </div>
    </div>
  </div>
</template>
