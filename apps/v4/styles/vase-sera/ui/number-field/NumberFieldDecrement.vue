<script setup lang="ts">
import type { NumberFieldDecrementProps } from '@vase-ui/vue/number-field'

import type { HTMLAttributes } from 'vue'
import { MinusIcon } from '@lucide/vue'
import { NumberField } from '@vase-ui/vue/number-field'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NumberFieldDecrementProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NumberField.Decrement data-slot="decrement" :class="cn('absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20', props.class)">
    <slot>
      <MinusIcon class="h-4 w-4" />
    </slot>
  </NumberField.Decrement>
</template>
