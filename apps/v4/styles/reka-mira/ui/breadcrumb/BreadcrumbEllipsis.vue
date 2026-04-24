<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import { MoreHorizontalIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn('size-4 [&>svg]:size-3.5 flex items-center justify-center', props.class)"
  >
    <slot>
      <MoreHorizontalIcon />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
