<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps, useForwardProps } from 'radix-vue'
import { ChevronsLeft } from 'lucide-vue-next'
import {
  Button,
} from '@/lib/registry/default/ui/button'

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationFirst v-bind="forwarded">
    <Button class="w-10 h-10 p-0" variant="outline">
      <slot>
        <ChevronsLeft class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationFirst>
</template>
