<script setup lang="ts">
import type { TableOfContentsItem } from '../types/docs'
import { cn } from '@/lib/utils'
import { useElementVisibility } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  item: TableOfContentsItem
}>()

const target = computed(() => props.item.heading)
const isVisible = useElementVisibility(target)
</script>

<template>
  <a
    :href="item.url"
    :class="
      cn('inline-block no-underline transition-colors hover:text-foreground',
         isVisible
           ? 'font-medium text-foreground'
           : 'text-muted-foreground')"
  >
    {{ item.title }}
  </a>
</template>
