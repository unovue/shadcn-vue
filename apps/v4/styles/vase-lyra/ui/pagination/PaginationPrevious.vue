<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '@/styles/vase-lyra/ui/button'
import { ChevronLeftIcon } from '@lucide/vue'
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
    aria-label="Go to previous page"
    data-slot="pagination-previous"
    :href="href"
    :size="size"
    :class="cn('pl-1.5!', props.class)"
  >
    <slot>
      <ChevronLeftIcon data-icon="inline-start" class="cn-rtl-flip" />
      <span class="hidden sm:block">Previous</span>
    </slot>
  </PaginationLink>
</template>
