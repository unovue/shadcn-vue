<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue'
import { ComboboxContent } from 'radix-vue'
import { cn, useEmitAsProps } from '@/lib/utils'

const props = defineProps<ComboboxContentProps>()
const emits = defineEmits<ComboboxContentEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <ComboboxContent v-bind="{ ...props, ...emitsAsProps }" :avoid-collisions="true" :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', $attrs.class ?? '')">
    <slot />
  </ComboboxContent>
</template>
