<script setup lang="ts">
import type { OTPFieldRootEmits, OTPFieldRootProps } from "@vase-ui/vue/otp-field"
import type { HTMLAttributes } from "vue"
import { OTPField } from "@vase-ui/vue/otp-field"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ OTPFieldRootProps {
  length: OTPFieldRootProps["length"]
  class?: HTMLAttributes["class"]
}
interface Emits extends /* @vue-ignore */ OTPFieldRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <OTPField.Root
    v-slot="slotProps"
    :length="length"
    data-slot="pin-input"
    :class="cn('flex items-center gap-2 has-disabled:opacity-50', props.class)"
  >
    <slot v-bind="slotProps" />
  </OTPField.Root>
</template>
