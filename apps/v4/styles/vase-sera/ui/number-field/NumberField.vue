<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from '@vase-ui/vue/number-field'
import type { HTMLAttributes } from 'vue'
import { NumberField } from '@vase-ui/vue/number-field'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NumberFieldRootProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ NumberFieldRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <NumberField.Root v-slot="slotProps" :class="cn('grid gap-1.5', props.class)">
    <slot v-bind="slotProps" />
  </NumberField.Root>
</template>
