<script setup lang="ts">
import { PaginationPrev, type PaginationPrevProps, useForwardProps } from 'radix-vue'
import { ChevronLeftIcon } from '@radix-icons/vue'
import {
  Button,
} from '@/lib/registry/new-york/ui/button'

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationPrev v-bind="forwarded">
    <Button class="w-9 h-9 p-0" variant="outline">
      <slot>
        <ChevronLeftIcon />
      </slot>
    </Button>
  </PaginationPrev>
</template>
