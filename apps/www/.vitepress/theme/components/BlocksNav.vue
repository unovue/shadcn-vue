<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/registry/default/ui/scroll-area'
import { registryCategories } from '@/registry/registry-categories'
import { useRoute } from 'vitepress'
import { toRefs } from 'vue'

const { path } = toRefs(useRoute())

const examples = [
  {
    name: 'Featured',
    href: '/blocks.html',
  },
  ...registryCategories.filter(category => !category.hidden).map(category => ({
    name: category.name,
    href: `/blocks/${category.slug}.html`,
  })),
]
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
