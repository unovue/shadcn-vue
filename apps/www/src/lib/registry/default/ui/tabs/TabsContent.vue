<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsContentProps & { class?: string }>()
</script>

<template>
  <TabsContent
    :class="cn('mt-2 focus-visible:outline-none', props.class)"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
