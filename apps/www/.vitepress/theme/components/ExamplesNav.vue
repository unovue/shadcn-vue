<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, toRefs } from 'vue'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/lib/registry/default/ui/scroll-area'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'

const { path } = toRefs(useRoute())

const examples = [
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  {
    name: 'Tasks',
    href: '/examples/tasks',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/tasks',
  },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/forms',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
]

const currentExample = computed(() => examples.find(ex => path.value.startsWith(ex.href)) ?? examples[0])
</script>

<template>
  <div class="relative">
    <ScrollArea class="max-w-[600px] lg:max-w-none">
      <div :class="cn('mb-4 flex items-center', $attrs.class ?? '')">
        <a
          v-for="example in examples"
          :key="example.href"
          :href="example.href"
          :class="cn(
            'flex items-center px-4',
            path?.startsWith(example.href) || (path === '/' && example.name === 'Dashboard')
              ? 'font-bold text-primary'
              : 'font-medium text-muted-foreground',
          )"
        >
          {{ example.name }}
        </a>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>

    <a
      v-if="currentExample"
      :href="currentExample?.code" target="_blank" rel="nofollow"
      class="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon class="ml-1 h-4 w-4" />
    </a>
  </div>
</template>
