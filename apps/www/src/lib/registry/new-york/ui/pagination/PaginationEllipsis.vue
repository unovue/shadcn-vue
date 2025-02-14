<script setup lang="ts">
import type { PaginationEllipsisProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { DotsHorizontalIcon } from '@radix-icons/vue'
import { PaginationEllipsis } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis v-bind="delegatedProps" :class="cn('w-9 h-9 flex items-center justify-center', props.class)">
    <slot>
      <DotsHorizontalIcon />
    </slot>
  </PaginationEllipsis>
</template>
