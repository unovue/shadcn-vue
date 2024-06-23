<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import PageAction from '../components/PageAction.vue'
import ExamplesNav from '../components/ExamplesNav.vue'
import Announcement from '../components/Announcement.vue'

import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { cn } from '@/lib/utils'
</script>

<template>
  <div class="container relative">
    <PageHeader class="page-header pb-8">
      <Announcement />
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

      <PageAction>
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
      </PageAction>
    </PageHeader>
    <section>
      <ExamplesNav />
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </section>
  </div>
</template>
