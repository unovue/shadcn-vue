<script setup lang="ts">
import { PaginationNext, type PaginationNextProps, useForwardProps } from 'radix-vue'
import { ChevronRightIcon } from '@radix-icons/vue'
import {
  Button,
} from '@/lib/registry/new-york/ui/button'

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationNext v-bind="forwarded">
    <Button class="w-9 h-9 p-0" variant="outline">
      <slot>
        <ChevronRightIcon />
      </slot>
    </Button>
  </PaginationNext>
</template>
