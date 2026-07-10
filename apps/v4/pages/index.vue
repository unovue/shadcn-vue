<script setup lang="ts">
import { IconArrowRight } from '@tabler/icons-vue'
import { Button } from '@/styles/reka-nova/ui/button'
import CardsDemo from '~/components/examples/cards/CardsDemo.vue'

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
    <PageHeader class="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
      <Announcement />
      <PageHeaderHeading class="max-w-4xl">
        {{ title }}
      </PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
      <PageActions>
        <Button as-child size="sm" class="h-[31px] rounded-lg">
          <NuxtLink href="/create">
            Build Your Own <IconArrowRight data-icon="inline-end" />
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <div class="container-wrapper flex-1 p-0">
      <div class="container overflow-hidden md:px-0 lg:max-w-none">
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
          <CardsDemo />
        </section>
      </div>
    </div>
  </div>
</template>
