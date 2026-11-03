<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { useId } from "reka-ui"
import { computed } from "vue"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>()

// Derive the width from a stable id so server and client render the same value
const id = useId()
const width = computed(() => {
  let hash = 0
  for (const char of id)
    hash = Math.imul(hash, 31) + char.charCodeAt(0)
  hash = Math.imul(hash ^ (hash >>> 16), 0x45D9F3B)
  hash ^= hash >>> 16
  return `${((hash >>> 0) % 40) + 50}%`
})
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />

    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
