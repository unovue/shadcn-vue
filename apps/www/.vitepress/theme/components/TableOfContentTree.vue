<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import type { TableOfContentsItem } from '../types/docs'
import { cn } from '@/lib/utils'

withDefaults(defineProps<{
  level: number
  tree: TableOfContentsItem
}>(), {
  level: 1,
  tree: () => ({
    items: [],
  }),
})

const route = useRoute()
const hash = ref('')
function setHash() {
  hash.value = location.hash
}
onMounted(() => {
  window.addEventListener('hashchange', setHash)
  setHash()
})
onUnmounted(() => {
  window.removeEventListener('hashchange', setHash)
})
watch(() => route.path, () => {
  setHash()
})
</script>

<template>
  <ul :class="cn('m-0 list-none', { 'pl-4': level !== 1 })">
    <template v-if="tree.items?.length">
      <li v-for="item in tree.items" :key="item.title" class="mt-0 pt-2">
        <a
          :href="item.url"
          :class="
            cn('inline-block no-underline transition-colors hover:text-foreground',
               item.url === hash
                 ? 'font-medium text-foreground'
                 : 'text-muted-foreground')"
        >{{ item.title }} </a>

        <TableOfContentTree v-if="item.items?.length" :tree="item" :level="level + 1" />
      </li>
    </template>
  </ul>
</template>
