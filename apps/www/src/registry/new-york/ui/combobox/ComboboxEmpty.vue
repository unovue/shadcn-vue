<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui'
import { ComboboxEmpty } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxEmpty v-bind="delegatedProps" :class="cn('py-6 text-center text-sm', props.class)">
    <slot />
  </ComboboxEmpty>
</template>
