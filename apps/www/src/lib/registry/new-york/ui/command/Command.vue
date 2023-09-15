<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue'
import { ComboboxRoot } from 'radix-vue'
import { cn, useEmitAsProps } from '@/lib/utils'

const props = defineProps<ComboboxRootProps>()
const emits = defineEmits<ComboboxRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <ComboboxRoot
    v-bind="{ ...props, ...emitsAsProps }"
    :open="true"
    :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxRoot>
</template>
