<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { OTPField } from "@vase-ui/vue/otp-field"
import { cn } from "cn"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <OTPField.Input>
    <template #element="{ props: inputProps, elementRef }">
      <input
        v-bind="inputProps"
        :ref="elementRef"
        data-slot="pin-input-slot"
        :class="cn('border-input focus:border-ring focus:ring-ring/50 focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus:aria-invalid:border-destructive relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none text-center first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:ring-3 disabled:cursor-not-allowed', props.class)"
      >
    </template>
  </OTPField.Input>
</template>
