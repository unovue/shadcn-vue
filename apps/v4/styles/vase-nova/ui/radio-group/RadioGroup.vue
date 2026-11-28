<script setup lang="ts">
import type { RadioGroupEmits, RadioGroupProps } from '@vase-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@vase-ui/vue/radio-group'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ RadioGroupProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ RadioGroupEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <RadioGroup
    v-slot="slotProps"
    data-slot="radio-group"
    :class="cn('grid gap-2 w-full', props.class)"
  >
    <slot v-bind="slotProps" />
  </RadioGroup>
</template>
