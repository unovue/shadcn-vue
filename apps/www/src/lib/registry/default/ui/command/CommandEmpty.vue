<script setup lang="ts">
import type { ComboboxEmptyProps } from 'radix-vue'
import { ComboboxEmpty } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxEmptyProps>()
</script>

<template>
  <ComboboxEmpty v-bind="props" :class="cn('py-6 text-center text-sm', $attrs.class ?? '')">
    <slot />
  </ComboboxEmpty>
</template>
