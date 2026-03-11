<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  status: "pending" | "success" | "error"
  class?: string
}>()

const valueTextMap = {
  pending: "indeterminate",
  success: "100%",
  error: "error",
}

const done = computed(() => props.status === "success" || props.status === "error")
const error = computed(() => props.status === "error")
</script>

<template>
  <div
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuetext="valueTextMap[status]"
    :class="cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-muted',
      props.class,
    )"
  >
    <div
      :class="cn(
        'h-full w-full rounded-full bg-primary',
        done ? 'translate-x-0' : 'animate-infinite-progress',
        error && 'bg-destructive',
      )"
    />
  </div>
</template>

<style>
@keyframes infinite-progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-infinite-progress {
  animation: infinite-progress 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
}
</style>
