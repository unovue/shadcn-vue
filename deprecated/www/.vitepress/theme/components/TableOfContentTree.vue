<script setup lang="ts">
import type { TableOfContentsItem } from '../types/docs'
import { cn } from '@/lib/utils'
import TableOfContentItem from './TableOfContentItem.vue'

withDefaults(defineProps<{
  level: number
  tree: TableOfContentsItem
}>(), {
  level: 1,
  tree: () => ({
    items: [],
  }),
})
</script>

<template>
  <ul :class="cn('m-0 list-none', { 'pl-4': level !== 1 })">
    <template v-if="tree.items?.length">
      <li v-for="item in tree.items" :key="item.title" class="mt-0 pt-2">
        <TableOfContentItem :item />

        <TableOfContentTree v-if="item.items?.length" :tree="item" :level="level + 1" />
      </li>
    </template>
  </ul>
</template>
