<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="pagination-ellipsis"
    :class="cn('cn-pagination-ellipsis flex items-center justify-center', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeIcon"
        remixicon="RiMoreLine"
      />
      <span class="sr-only">More pages</span>
    </slot>
  </span>
</template>
