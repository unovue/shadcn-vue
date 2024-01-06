<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useEmitAsProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <RadioGroupRoot
    :class="cn('grid gap-2', props.class)"
    v-bind="{
      ...delegatedProps,
      ...emitsAsProps,
    }"
  >
    <slot />
  </RadioGroupRoot>
</template>
