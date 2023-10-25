<script setup lang="ts">
import { PaginationLast, type PaginationLastProps, useForwardProps } from 'radix-vue'
import { ChevronsRight } from 'lucide-vue-next'
import {
  Button,
} from '@/lib/registry/default/ui/button'

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationLast v-bind="forwarded">
    <Button class="w-10 h-10 p-0" variant="outline">
      <slot>
        <ChevronsRight class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
