<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui'

const props = defineProps<AlertDialogCancelProps>()
</script>

<template>
  <AlertDialogCancel v-bind="props" :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')">
    <slot />
  </AlertDialogCancel>
</template>
