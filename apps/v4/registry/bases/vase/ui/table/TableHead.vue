<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <th
    data-slot="table-head"
    :class="cn('cn-table-head [&:has([data-slot=checkbox])]:pr-0', props.class)"
  >
    <slot />
  </th>
</template>
