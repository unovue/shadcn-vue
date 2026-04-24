<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <optgroup data-slot="native-select-optgroup" :class="cn('bg-[Canvas] text-[CanvasText]', props.class)">
    <slot />
  </optgroup>
</template>
