<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="cn('cn-context-menu-shortcut', props.class)"
  >
    <slot />
  </span>
</template>
