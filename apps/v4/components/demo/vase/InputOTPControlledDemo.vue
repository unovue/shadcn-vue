<script setup lang="ts">
import { ref } from 'vue'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/styles/vase-vega/ui/input-otp'

const value = ref('')
</script>

<template>
  <div class="space-y-2">
    <InputOTP
      v-model="value"
      :length="6"
    >
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTPGroup>
    </InputOTP>
    <div class="text-center text-sm">
      <template v-if="value === ''">
        Enter your one-time password.
      </template>
      <template v-else>
        You entered: {{ value }}
      </template>
    </div>
  </div>
</template>
