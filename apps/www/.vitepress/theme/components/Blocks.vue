<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import PageAction from '../components/PageAction.vue'
import { announcementConfig } from '../config/site'
import BlockPreview from './BlockPreview.vue'
import GitHubIcon from '~icons/radix-icons/github-logo'

import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { cn } from '@/lib/utils'

const blocks = ref<string[]>([])

import('../../../__registry__/index').then((res) => {
  blocks.value = Object.values(res.Index.default).filter(i => i.type === 'components:block').map(i => i.name)
})
</script>

<template>
  <PageHeader class="page-header pb-8">
    <a
      :href="announcementConfig.link"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      {{ announcementConfig.icon }}   <Separator class="mx-2 h-4" orientation="vertical" />
      <span class="sm:hidden">{{ announcementConfig.title }}</span>
      <span class="hidden sm:inline">{{ announcementConfig.title }}
      </span>
      <!-- <ArrowRightIcon class="ml-1 h-4 w-4" /> -->
    </a>
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
