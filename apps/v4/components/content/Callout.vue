<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertVariants } from '@/registry/new-york-v4/ui/alert'
import { cn } from '@/lib/utils'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/registry/new-york-v4/ui/alert'

const props = defineProps<{
  icon?: string
  title?: string
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
}>()
</script>

<template>
  <Alert
    :class="cn(
      'bg-surface text-surface-foreground mt-6 w-auto border-none md:-mx-1',
      props.class,
    )"
    :variant
  >
    {{ icon }}
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription class="text-card-foreground/80">
      <slot />
    </AlertDescription>
  </Alert>
</template>
