<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '@/styles/vase-sera/ui/button'
import { ChevronsLeftIcon } from '@lucide/vue'
import { cn } from 'cn'
import PaginationLink from './PaginationLink.vue'

const props = withDefaults(defineProps<{
  href?: string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})
</script>

<template>
  <PaginationLink
    aria-label="Go to first page"
    data-slot="pagination-first"
    :href="href"
    :size="size"
    :class="cn('', props.class)"
  >
    <slot>
      <ChevronsLeftIcon data-icon="inline-start" />
      <span class="hidden sm:block">First</span>
    </slot>
  </PaginationLink>
</template>
