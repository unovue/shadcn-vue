<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/bases/vase/ui/button"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import PaginationLink from "./PaginationLink.vue"

const props = withDefaults(defineProps<{
  href?: string
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  size: "default",
})
</script>

<template>
  <PaginationLink
    aria-label="Go to first page"
    data-slot="pagination-first"
    :href="href"
    :size="size"
    :class="cn('cn-pagination-first', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronsLeftIcon"
        tabler="IconChevronsLeft"
        hugeicons="ArrowLeftDoubleIcon"
        phosphor="CaretDoubleLeftIcon"
        remixicon="RiArrowLeftDoubleLine"
        data-icon="inline-start"
      />
      <span class="cn-pagination-first-text hidden sm:block">First</span>
    </slot>
  </PaginationLink>
</template>
