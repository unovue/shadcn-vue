<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { OTPInputProps } from 'vue-input-otp'
import { OTPInput } from 'vue-input-otp'
import { useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<OTPInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <OTPInput
    v-slot="{ isFocused, isHovering, slots }"
    v-bind="forwardedProps"
    :container-class="cn('flex items-center gap-2 has-[:disabled]:opacity-50', props.class)"
    class="disabled:cursor-not-allowed"
  >
    <slot :is-focused :is-hovering :slots />
  </OTPInput>
</template>
