<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <option data-slot="native-select-option" :class="cn('bg-[Canvas] text-[CanvasText]', props.class)">
    <slot />
  </option>
</template>
