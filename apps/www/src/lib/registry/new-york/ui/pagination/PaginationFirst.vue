<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps, useForwardProps } from 'radix-vue'
import { DoubleArrowLeftIcon } from '@radix-icons/vue'
import {
  Button,
} from '@/lib/registry/new-york/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationFirst v-bind="forwarded">
    <Button class="w-9 h-9 p-0" variant="outline">
      <slot>
        <DoubleArrowLeftIcon />
      </slot>
    </Button>
  </PaginationFirst>
</template>
