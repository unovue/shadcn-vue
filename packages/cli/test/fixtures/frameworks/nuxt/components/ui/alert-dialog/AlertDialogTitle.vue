<script setup lang="ts">
import { cn } from '@/lib/utils'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui'

const props = defineProps<AlertDialogTitleProps & { class?: string }>()
</script>

<template>
  <AlertDialogTitle
    :as-child="props.asChild"
    :class="cn('text-lg font-semibold text-foreground', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
