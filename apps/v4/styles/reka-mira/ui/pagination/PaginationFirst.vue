<script setup lang="ts">
import type { PaginationFirstProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-mira/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { ChevronsLeftIcon } from 'lucide-vue-next'
import { PaginationFirst, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/styles/reka-mira/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size }), '', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronsLeftIcon data-icon="inline-start" />
      <span class="hidden sm:block">First</span>
    </slot>
  </PaginationFirst>
</template>
