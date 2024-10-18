<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'
import Announcement from '../components/Announcement.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import PageAction from '../components/PageAction.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/lib/registry/new-york/ui/button'
</script>

<template>
  <PageHeader class="page-header pb-8">
    <Announcement />
    <PageHeaderHeading>Beautiful Charts</PageHeaderHeading>
    <PageHeaderDescription>
      Built using Unovis. Copy and paste into your apps. Open Source.
    </PageHeaderDescription>

    <PageAction>
      <a
        href="/docs/charts.html"
        :class="cn(buttonVariants(), 'rounded-[6px]')"
      >
        Documentation
      </a>
    </PageAction>
  </PageHeader>

  <section id="charts" class="grid scroll-mt-20">
    <slot />
  </section>
</template>
