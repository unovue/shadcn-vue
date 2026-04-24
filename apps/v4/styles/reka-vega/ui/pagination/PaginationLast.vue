<script setup lang="ts">
import type { PaginationLastProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-vega/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { ChevronsRightIcon } from 'lucide-vue-next'
import { PaginationLast, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/styles/reka-vega/ui/button'

const props = withDefaults(defineProps<PaginationLastProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationLast
    data-slot="pagination-last"
    :class="cn(buttonVariants({ variant: 'ghost', size }), '', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">Last</span>
      <ChevronsRightIcon data-icon="inline-end" />
    </slot>
  </PaginationLast>
</template>
