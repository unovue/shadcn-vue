<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { useBlockViewer } from './BlockViewer.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { item, iframeKey } = useBlockViewer()
</script>

<template>
  <iframe
    :key="iframeKey"
    :src="`/view/${item.name}`"
    :height="item.meta?.iframeHeight ?? 930"
    loading="lazy"
    :class="cn(
      'bg-background no-scrollbar relative z-20 w-full',
      props.class,
    )"
  />
</template>
