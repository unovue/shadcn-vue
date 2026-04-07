<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="item-title"
    :class="cn('cn-item-title flex w-fit items-center', props.class)"
  >
    <slot />
  </div>
</template>
