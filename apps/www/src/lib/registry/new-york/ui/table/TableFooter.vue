<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tfoot :class="cn('bg-primary font-medium text-primary-foreground', props.class)">
    <slot />
  </tfoot>
</template>
