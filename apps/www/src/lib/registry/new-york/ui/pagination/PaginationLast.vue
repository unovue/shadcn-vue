<script setup lang="ts">
import { PaginationLast, type PaginationLastProps, useForwardProps } from 'radix-vue'
import { DoubleArrowRightIcon } from '@radix-icons/vue'
import {
  Button,
} from '@/lib/registry/new-york/ui/button'

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationLast v-bind="forwarded">
    <Button class="w-9 h-9 p-0" variant="outline">
      <slot>
        <DoubleArrowRightIcon />
      </slot>
    </Button>
  </PaginationLast>
</template>
