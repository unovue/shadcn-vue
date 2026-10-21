<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
    data-slot="skeleton"
    :class="cn('bg-muted rounded-md animate-pulse', props.class)"
  />
</template>
