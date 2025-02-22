<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/registry/default/ui/scroll-area'
import { useRoute } from 'vitepress'
import { computed, toRefs } from 'vue'

const { path } = toRefs(useRoute())

const examples = [
  {
    name: 'Examples',
    href: '/',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples',
  },
  {
    name: 'Mail',
    href: '/examples/mail.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/mail',
  },
  {
    name: 'Dashboard',
    href: '/examples/dashboard.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  {
    name: 'Tasks',
    href: '/examples/tasks.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/tasks',
  },
  {
    name: 'Playground',
    href: '/examples/playground.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Forms',
    href: '/examples/forms.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/forms',
  },
  {
    name: 'Music',
    href: '/examples/music.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication.html',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
]

const currentExample = computed(() => examples.find(ex => path.value.startsWith(ex.href)) ?? examples[0])
</script>

<template>
  <div class="relative">
    <ScrollArea class="max-w-[600px] lg:max-w-none">
      <div :class="cn('flex items-center', $attrs.class ?? '')">
        <a
          v-for="example in examples"
          :key="example.href"
          :href="example.href"
          :class="cn(
            'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary',
          )"
          :data-active="path === example.href"
        >
          {{ example.name }}
        </a>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
