<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('gap-1.5 inline-flex items-center', props.class)"
  >
    <slot />
  </li>
</template>
