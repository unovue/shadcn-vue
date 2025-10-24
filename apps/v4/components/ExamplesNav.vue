<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const examples = [
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/pages/examples/dashboard',
    hidden: false,
  },
  {
    name: 'Tasks',
    href: '/examples/tasks',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/pages/examples/tasks',
    hidden: false,
  },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/pages/examples/playground',
    hidden: false,
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/pages/examples/authentication',
    hidden: false,
  },
]

const { path } = toRefs(useRoute())
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <ScrollArea class="max-w-[96%] md:max-w-[600px] lg:max-w-none">
      <div class="flex items-center">
        <NuxtLink class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors" to="/" :data-active="path === '/'">
          Examples
        </NuxtLink>
        <NuxtLink
          v-for="example in examples"
          :key="example.href"
          :to="example.href"
          :data-active="path.startsWith(example.href) ?? false"
          class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
        >
          {{ example.name }}
        </NuxtLink>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
