<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <td
    data-slot="table-cell"
    :class="cn('cn-table-cell [&:has([data-slot=checkbox])]:pr-0', props.class)"
  >
    <slot />
  </td>
</template>
