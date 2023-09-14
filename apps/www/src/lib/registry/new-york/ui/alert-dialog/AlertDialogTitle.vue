<script setup lang="ts">
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AlertDialogTitleProps & { class?: string }>()
</script>

<template>
  <AlertDialogTitle
    :as-child="props.asChild"
    :class="cn('text-lg text-foreground font-semibold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
