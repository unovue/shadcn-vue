<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui'

const props = defineProps<AlertDialogDescriptionProps & { class?: string }>()
</script>

<template>
  <AlertDialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
    :as-child="props.asChild"
  >
    <slot />
  </AlertDialogDescription>
</template>
