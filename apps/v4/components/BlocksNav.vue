<script setup lang="ts">
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'
import { registryCategories } from '@/registry/registry-categories'

const { path } = toRefs(useRoute())
</script>

<template>
  <div class="relative overflow-hidden">
    <ScrollArea class="max-w-none">
      <div class="flex items-center">
        <NuxtLink
          :to="`/blocks`"
          :data-active="path === '/blocks'"
          class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
        >
          Featured
        </NuxtLink>

        <NuxtLink
          v-for="category in registryCategories.filter(i => !i.hidden)"
          :key="category.slug"
          :to="`/blocks/${category.slug}`"
          :data-active="path === `/blocks/${category.slug}`"
          class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
        >
          {{ category.name }}
        </NuxtLink>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
