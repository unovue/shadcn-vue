<script setup lang="ts">
import type { PaginationEllipsisProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { MoreHorizontalIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationEllipsis } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="delegatedProps"
    :class="cn('size-9 [&_svg:not([class*=size-])]:size-4 flex items-center justify-center', props.class)"
  >
    <slot>
      <MoreHorizontalIcon />
      <span class="sr-only">More pages</span>
    </slot>
  </PaginationEllipsis>
</template>
