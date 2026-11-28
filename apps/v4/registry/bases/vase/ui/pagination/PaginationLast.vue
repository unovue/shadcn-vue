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
    aria-label="Go to last page"
    data-slot="pagination-last"
    :href="href"
    :size="size"
    :class="cn('cn-pagination-last', props.class)"
  >
    <slot>
      <span class="cn-pagination-last-text hidden sm:block">Last</span>
      <IconPlaceholder
        lucide="ChevronsRightIcon"
        tabler="IconChevronsRight"
        hugeicons="ArrowRightDoubleIcon"
        phosphor="CaretDoubleRightIcon"
        remixicon="RiArrowRightDoubleLine"
        data-icon="inline-end"
      />
    </slot>
  </PaginationLink>
</template>
