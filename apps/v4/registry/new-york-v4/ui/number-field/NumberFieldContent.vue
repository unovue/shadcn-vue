<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('relative has-[[data-slot=increment]]:[&>[data-slot=input]]:pr-10 has-[[data-slot=decrement]]:[&>[data-slot=input]]:pl-10', props.class)">
    <slot />
  </div>
</template>
