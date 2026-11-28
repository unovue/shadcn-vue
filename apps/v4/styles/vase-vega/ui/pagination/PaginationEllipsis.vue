<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { MoreHorizontalIcon } from '@lucide/vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="pagination-ellipsis"
    :class="cn('size-9 [&_svg:not([class*=size-])]:size-4 flex items-center justify-center', props.class)"
  >
    <slot>
      <MoreHorizontalIcon />
      <span class="sr-only">More pages</span>
    </slot>
  </span>
</template>
