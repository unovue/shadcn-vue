<script setup lang="ts">
import Button from '@/registry/new-york/ui/button/Button.vue'
import Announcement from '../components/Announcement.vue'
import ExamplesNav from '../components/ExamplesNav.vue'
import PageAction from '../components/PageAction.vue'
import PageHeader from '../components/PageHeader.vue'

import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
</script>

<template>
  <div class="relative">
    <PageHeader>
      <Announcement />
      <PageHeaderHeading>Build your component library</PageHeaderHeading>
      <PageHeaderDescription>
        Beautifully designed components that you can copy and paste into your apps. Made with Tailwind CSS. Open source.
      </PageHeaderDescription>

      <PageAction>
        <Button as-child size="sm">
          <a href="/docs/introduction">
            Get Started
          </a>
        </Button>
        <Button as-child size="sm" variant="ghost">
          <a
            href="https://github.com/unovue/shadcn-vue"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Button>
      </PageAction>
    </PageHeader>

    <div class="border-grid border-b">
      <div class="container-wrapper">
        <div class="container py-4">
          <ExamplesNav />
        </div>
      </div>
    </div>

    <div class="container-wrapper">
      <div class="container py-6">
        <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
