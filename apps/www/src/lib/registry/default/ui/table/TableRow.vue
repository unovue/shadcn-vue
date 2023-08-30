<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <tr :class="cn('border-b border-border last:border-none', props.class)">
    <slot />
  </tr>
</template>
