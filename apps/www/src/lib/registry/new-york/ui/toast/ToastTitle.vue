<script setup lang="ts">
import { ToastTitle, type ToastTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastTitleProps & { class?: string }>()
</script>

<template>
  <ToastTitle v-bind="props" :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)">
    <slot />
  </ToastTitle>
</template>
