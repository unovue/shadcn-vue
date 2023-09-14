<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import RadixIconsCheck from '~icons/radix-icons/check'
import { cn, useEmitAsProps } from '@/lib/utils'

const props = defineProps<CheckboxRootProps>()
const emits = defineEmits<CheckboxRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <CheckboxRoot
    v-bind="{ ...props, ...emitsAsProps }"
    :class="
      cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
         $attrs.class ?? '')"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <RadixIconsCheck class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
