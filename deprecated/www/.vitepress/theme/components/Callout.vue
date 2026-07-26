<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/registry/default/ui/alert'

interface CalloutProps {
  icon?: string
  title?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<CalloutProps>()
</script>

<template>
  <Alert class="not-docs" :class="cn('my-6 bg-muted/50', props.class)">
    <span v-if="icon" class="mr-4 text-2xl">{{ icon }}</span>
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription>
      <slot />
    </AlertDescription>
  </Alert>
</template>
