<script setup lang="ts">
import { cn } from '@/lib/utils'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'

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
