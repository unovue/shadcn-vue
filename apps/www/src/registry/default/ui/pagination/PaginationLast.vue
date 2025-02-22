<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  Button,
} from '@/registry/default/ui/button'
import { ChevronsRight } from 'lucide-vue-next'
import { PaginationLast, type PaginationLastProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsRight class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
