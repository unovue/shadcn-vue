<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    :class="cn('cn-item-group group/item-group flex w-full flex-col', props.class)"
  >
    <slot />
  </div>
</template>
