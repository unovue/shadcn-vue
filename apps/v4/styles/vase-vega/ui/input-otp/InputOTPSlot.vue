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
        :class="cn('dark:bg-input/30 border-input data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive size-9 border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:ring-3 relative text-center disabled:cursor-not-allowed data-[active=true]:z-10', props.class)"
        @focus="active = true"
        @blur="active = false"
      >
    </template>
  </OTPField.Input>
</template>
