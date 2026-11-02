<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { TabsList } from '@/registry/new-york-v4/ui/tabs'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TabsList :class="cn('justify-start gap-4 rounded-none bg-transparent px-0', props.class)">
    <slot />
  </TabsList>
</template>
