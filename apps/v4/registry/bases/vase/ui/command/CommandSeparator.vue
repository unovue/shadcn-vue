<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="command-separator"
    role="separator"
    :class="cn('cn-command-separator', props.class)"
  />
</template>
