<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  Button,
} from '@/registry/new-york/ui/button'
import { ChevronsLeft } from 'lucide-vue-next'
import { PaginationFirst, type PaginationFirstProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationFirst v-bind="delegatedProps">
    <Button :class="cn('w-9 h-9 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsLeft />
      </slot>
    </Button>
  </PaginationFirst>
</template>
