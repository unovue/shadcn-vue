<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertVariants } from '@/registry/new-york-v4/ui/alert'
import { InfoIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/registry/new-york-v4/ui/alert'

const props = withDefaults(defineProps<{
  icon?: boolean
  title?: string
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
}>(), {
  variant: 'default',
})
</script>

<template>
  <Alert
    :class="cn(
      'mt-6 w-auto rounded-xl border-surface bg-surface text-surface-foreground md:-mx-1 **:[code]:border',
      props.class,
    )"
    :variant
  >
    <InfoIcon v-if="icon" />
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription class="text-card-foreground/80">
      <slot />
    </AlertDescription>
  </Alert>
</template>
