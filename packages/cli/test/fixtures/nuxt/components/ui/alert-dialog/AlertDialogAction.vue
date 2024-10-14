<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'

const props = defineProps<AlertDialogActionProps>()
</script>

<template>
  <AlertDialogAction v-bind="props" :class="cn(buttonVariants(), $attrs.class ?? '')">
    <slot />
  </AlertDialogAction>
</template>
