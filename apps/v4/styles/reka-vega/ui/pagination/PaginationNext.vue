<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-vega/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { ChevronRightIcon } from 'lucide-vue-next'
import { PaginationNext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/styles/reka-vega/ui/button'

const props = withDefaults(defineProps<PaginationNextProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'pr-2!', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon data-icon="inline-end" class="cn-rtl-flip" />
    </slot>
  </PaginationNext>
</template>
