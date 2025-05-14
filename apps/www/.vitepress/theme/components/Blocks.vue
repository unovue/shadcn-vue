<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { Button } from '@/registry/new-york/ui/button'
import Announcement from '../components/Announcement.vue'
import PageAction from '../components/PageAction.vue'

import PageHeader from '../components/PageHeader.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'

import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import BlockContainer from './BlockContainer.vue'
import BlocksNav from './BlocksNav.vue'

const FEATURED_BLOCKS = ['Sidebar07', 'Sidebar03', 'Login03', 'Login04']

const { params } = useData()

const blocks = computed(() => {
  if (params.value === undefined) {
    return FEATURED_BLOCKS
  }
  else {
    return params.value.blocks ?? []
  }
})
</script>

<template>
  <PageHeader class="page-header">
    <Announcement />
    <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed. Copy and paste into your apps. Open Source.
    </PageHeaderDescription>

    <PageAction>
      <Button as-child size="sm">
        <a href="#blocks">Browse Blocks</a>
      </Button>
      <Button as-child variant="ghost" size="sm">
        <a
          href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
          target="_blank"
        >
          Request a block
        </a>
      </Button>
    </PageAction>
  </PageHeader>

  <section id="blocks" class="border-grid scroll-mt-24 border-b">
    <div class="container-wrapper">
      <div class="container flex items-center py-4">
        <BlocksNav />
      </div>
    </div>
  </section>

  <div class="container-wrapper flex-1">
    <div>
      <div v-for="block in blocks" :key="block" class="border-grid container border-b py-8 first:pt-6 last:border-b-0 md:py-12">
        <BlockContainer :name="block" />
      </div>
    </div>
  </div>
</template>
