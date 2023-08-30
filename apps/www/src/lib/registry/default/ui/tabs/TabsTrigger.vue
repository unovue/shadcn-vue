<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: string }>()
</script>

<template>
  <TabsTrigger
    v-bind="props"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
