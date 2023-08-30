<script setup lang="ts">
import { alertVariants } from '.'
import { cn } from '@/lib/utils'

interface Props {
  variant?: NonNullable<Parameters<typeof alertVariants>[0]>['variant']
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn(alertVariants({ variant }), props.class ?? '')">
    <slot />
  </div>
</template>
