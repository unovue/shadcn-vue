<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'radix-vue'

const props = defineProps<AlertDialogDescriptionProps & { class?: string }>()
</script>

<template>
  <AlertDialogDescription
    :class="cn('text-muted-foreground text-sm', props.class)"
    :as-child="props.asChild"
  >
    <slot />
  </AlertDialogDescription>
</template>
