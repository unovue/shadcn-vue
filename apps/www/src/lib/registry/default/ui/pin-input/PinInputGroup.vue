<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cn('flex items-center', props.class)">
    <slot />
  </primitive>
</template>
