<script setup lang="ts">
import type { NumberFieldGroupProps } from '@vase-ui/vue/number-field'
import type { HTMLAttributes } from 'vue'
import { NumberField } from '@vase-ui/vue/number-field'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NumberFieldGroupProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NumberField.Group :class="cn('relative [&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5 [&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5', props.class)">
    <slot />
  </NumberField.Group>
</template>
