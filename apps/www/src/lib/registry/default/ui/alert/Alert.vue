<script setup lang="ts">
import { defineProps } from 'vue'
import { alertVariants } from '.'
import { cn } from '@/lib/utils'

interface Props {
  variant?: NonNullable<Parameters<typeof alertVariants>[0]>['variant']
  class?: string
}

const props = defineProps<Props>()
const computeClasses = cn(alertVariants({ variant: props.variant }), props.class ?? '')
</script>

<template>
  <div :class="computeClasses">
    <slot />
  </div>
</template>
