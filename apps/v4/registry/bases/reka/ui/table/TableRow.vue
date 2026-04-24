<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn('cn-table-row has-aria-expanded:bg-muted/50', props.class)"
  >
    <slot />
  </tr>
</template>
