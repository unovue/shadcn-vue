<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'
import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'
import ExamplesNav from '../components/ExamplesNav.vue'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import GitHubIcon from '~icons/radix-icons/github-logo'

import { buttonVariants } from '@/lib/registry/default/ui/button'
import { Separator } from '@/lib/registry/default/ui/separator'
import { cn } from '@/lib/utils'

import DashboardExample from '@/examples/dashboard/Example.vue'
</script>

<template>
  <PageHeader class="page-header pb-8">
    <a
      href="/docs/changelog"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator class="mx-2 h-4" orientation="vertical" />
      <span class="sm:hidden">Style, a new CLI and more.</span>
      <span class="hidden sm:inline">
        Introducing Style, a new CLI and more.
      </span>
      <ArrowRightIcon class="ml-1 h-4 w-4" />
    </a>
    <PageHeaderHeading>Build your component library.</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed components that you can copy and paste into your
      apps. Accessible. Customizable. Open Source.
    </PageHeaderDescription>

    <section class="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
      <a
        href="/docs/introduction"
        :class="cn(buttonVariants(), 'rounded-[6px]')"
      >
        Get Started
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
    </section>
  </PageHeader>
  <ExamplesNav />
  <section class="space-y-8 overflow-hidden rounded-lg border-2 border-primary dark:border-muted md:hidden">
    <VPImage
      alt="Dashboard"
      width="1280"
      height="866" class="block" :image="{
        dark: '/examples/dashboard-dark.png',
        light: 'examples/dashboard-light.png',
      }"
    />
  </section>
  <section class="hidden md:block">
    <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <DashboardExample />
    </div>
  </section>
</template>
