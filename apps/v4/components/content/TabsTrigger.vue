<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TabsTrigger } from '@/registry/new-york-v4/ui/tabs'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TabsTrigger :class="cn('text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-primary dark:data-[state=active]:border-primary hover:text-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent', props.class)">
    <slot />
  </TabsTrigger>
</template>
