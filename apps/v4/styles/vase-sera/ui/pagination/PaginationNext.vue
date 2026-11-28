<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '@/styles/vase-sera/ui/button'
import { ChevronRightIcon } from '@lucide/vue'
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
    aria-label="Go to next page"
    data-slot="pagination-next"
    :href="href"
    :size="size"
    :class="cn('pr-2!', props.class)"
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon data-icon="inline-end" class="cn-rtl-flip" />
    </slot>
  </PaginationLink>
</template>
