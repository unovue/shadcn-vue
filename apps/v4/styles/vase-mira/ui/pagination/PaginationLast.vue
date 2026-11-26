<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '@/styles/vase-mira/ui/button'
import { ChevronsRightIcon } from '@lucide/vue'
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
    aria-label="Go to last page"
    data-slot="pagination-last"
    :href="href"
    :size="size"
    :class="cn('', props.class)"
  >
    <slot>
      <span class="hidden sm:block">Last</span>
      <ChevronsRightIcon data-icon="inline-end" />
    </slot>
  </PaginationLink>
</template>
