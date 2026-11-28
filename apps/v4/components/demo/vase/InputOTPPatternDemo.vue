<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/styles/vase-vega/ui/input-otp'
</script>

<template>
  <InputOTP :length="6" validation-type="alphanumeric">
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
  </InputOTP>
</template>
