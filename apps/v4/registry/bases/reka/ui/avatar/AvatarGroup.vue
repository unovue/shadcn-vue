<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="avatar-group"
    :class="cn(
      'flex items-center -space-x-3',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
