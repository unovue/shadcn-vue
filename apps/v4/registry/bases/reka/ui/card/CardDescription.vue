<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-description"
    :class="cn('cn-card-description', props.class)"
  >
    <slot />
  </div>
</template>
