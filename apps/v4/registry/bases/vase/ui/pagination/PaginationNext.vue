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
    aria-label="Go to next page"
    data-slot="pagination-next"
    :href="href"
    :size="size"
    :class="cn('cn-pagination-next', props.class)"
  >
    <slot>
      <span class="cn-pagination-next-text hidden sm:block">Next</span>
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        data-icon="inline-end"
        class="cn-rtl-flip"
      />
    </slot>
  </PaginationLink>
</template>
