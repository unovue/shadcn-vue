<script setup lang="ts">
import type { AlertDialogCancelProps } from 'radix-vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertDialogCancel } from 'radix-vue'

const props = defineProps<AlertDialogCancelProps>()
</script>

<template>
  <AlertDialogCancel v-bind="props" :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')">
    <slot />
  </AlertDialogCancel>
</template>
