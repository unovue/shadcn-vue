<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useForwardProps } from 'radix-vue'
import type { SlotProps } from 'vue-input-otp'
import { cn } from '@/lib/utils'

const props = defineProps<SlotProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div
    :class="cn(
      'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
      isActive && 'z-10 ring-2 ring-offset-background ring-ring',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <template v-if="char !== null">
      {{ char }}
    </template>

    <div v-if="hasFakeCaret" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
    </div>
  </div>
</template>
