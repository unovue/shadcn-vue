<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { OTPField } from '@vase-ui/vue/otp-field'
import { cn } from 'cn'
import { ref } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const active = ref(false)
</script>

<template>
  <OTPField.Input>
    <template #element="{ props: inputProps, elementRef }">
      <input
        v-bind="inputProps"
        :ref="elementRef"
        data-slot="input-otp-slot"
        :data-active="active"
        :class="cn('border-transparent border-b-input bg-transparent data-[active=true]:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50 size-10 border text-sm transition-[color,border-color] outline-none first:rounded-none last:rounded-none relative text-center disabled:cursor-not-allowed data-[active=true]:z-10', props.class)"
        @focus="active = true"
        @blur="active = false"
      >
    </template>
  </OTPField.Input>
</template>
