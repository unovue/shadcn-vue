<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-action"
    :class="cn(
      'col-start-2 flex items-center gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
