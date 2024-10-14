<script setup lang="ts">
import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { cn } from '@/lib/utils'
import GitHubIcon from '~icons/radix-icons/github-logo'
import { ref } from 'vue'
import Announcement from '../components/Announcement.vue'
import PageAction from '../components/PageAction.vue'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'

import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import BlockPreview from './BlockPreview.vue'

const blocks = ref<string[]>([])

import('../../../__registry__/index').then((res) => {
  blocks.value = Object.values(res.Index.default).filter(i => i.type === 'components:block').map(i => i.name)
})
</script>

<template>
  <PageHeader class="page-header pb-8">
    <Announcement />
    <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed. Copy and paste into your apps. Open Source.
    </PageHeaderDescription>

    <PageAction>
      <a
        href="/blocks.html#blocks"
        :class="cn(buttonVariants(), 'rounded-[6px]')"
      >
        Browse
      </a>
      <a
        href="https://github.com/radix-vue/shadcn-vue"
        target="_blank"
        :class="cn(
          buttonVariants({ variant: 'outline' }),
          'rounded-[6px]',
        )"
      >
        <GitHubIcon class="mr-2 h-4 w-4" />
        GitHub
      </a>
    </PageAction>
  </PageHeader>

  <section id="blocks" class="grid scroll-mt-24 gap-24 lg:gap-48">
    <BlockPreview v-for="block in blocks" :key="block" :name="block" />
  </section>
</template>
