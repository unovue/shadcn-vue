<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue'
import { ComboboxContent, useEmitAsProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxContent v-bind="{ ...delegatedProps, ...useEmitAsProps(emits) }" :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)">
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
