<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { OTPInputEmits, OTPInputProps } from 'vue-input-otp'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { OTPInput } from 'vue-input-otp'
import { cn } from '@/lib/utils'

const props = defineProps<OTPInputProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<OTPInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="forwarded"
    :container-class="cn('gap-2 flex items-center has-disabled:opacity-50', props.class)"
    data-slot="input-otp"
    :spellcheck="false"
    class="disabled:cursor-not-allowed"
  >
    <slot v-bind="slotProps" />
  </OTPInput>
</template>
