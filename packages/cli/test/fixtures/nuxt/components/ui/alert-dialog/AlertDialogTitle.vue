<script setup lang="ts">
import type { AlertDialogTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { AlertDialogTitle } from 'radix-vue'

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
