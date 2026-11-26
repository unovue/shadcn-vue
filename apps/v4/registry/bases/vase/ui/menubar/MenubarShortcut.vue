<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="menubar-shortcut"
    :class="cn('cn-menubar-shortcut ml-auto', props.class)"
  >
    <slot />
  </span>
</template>
