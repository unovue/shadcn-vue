<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/bases/vase/ui/button"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"
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
    aria-label="Go to previous page"
    data-slot="pagination-previous"
    :href="href"
    :size="size"
    :class="cn('cn-pagination-previous', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        data-icon="inline-start"
        class="cn-rtl-flip"
      />
      <span class="cn-pagination-previous-text hidden sm:block">Previous</span>
    </slot>
  </PaginationLink>
</template>
