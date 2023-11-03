<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import ExamplesNav from '../components/ExamplesNav.vue'
import { announcementConfig } from '../config/site'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'

import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { cn } from '@/lib/utils'
</script>

<template>
  <div class="container relative">
    <PageHeader class="page-header pb-8">
      <a
        :href="announcementConfig.link"
        class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
      >
        {{ announcementConfig.icon }} <Separator class="mx-2 h-4" orientation="vertical" />
        <span class="sm:hidden">{{ announcementConfig.title }}</span>
        <span class="hidden sm:inline">
          {{ announcementConfig.title }}
        </span>
        <ArrowRightIcon class="ml-1 h-4 w-4" />
      </a>
      <PageHeaderHeading class="hidden md:block">
        Check out some examples.
      </PageHeaderHeading>
      <PageHeaderHeading class="md:hidden">
        Examples
      </PageHeaderHeading>
      <PageHeaderDescription>
        Dashboard, cards, authentication. Some examples built using the
        components. Use this as a guide to build your own.
      </PageHeaderDescription>

      <section class="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
        <a
          href="/docs/introduction"
          :class="cn(buttonVariants(), 'rounded-[6px]')"
        >
          Get Started
        </a>
        <a
          href="/docs/components/accordion"
          :class="cn(
            buttonVariants({ variant: 'outline' }),
            'rounded-[6px]',
          )"
        >
          Components
        </a>
      </section>
    </PageHeader>
    <section>
      <ExamplesNav />
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </section>
  </div>
</template>
