<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <thead :class="cn('border-b border-border', props.class)">
    <slot />
  </thead>
</template>
