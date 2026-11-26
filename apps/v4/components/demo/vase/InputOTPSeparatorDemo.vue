<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/styles/vase-vega/ui/input-otp'
</script>

<template>
  <InputOTP :length="6">
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot />
      <InputOTPSlot />
    </InputOTPGroup>
  </InputOTP>
</template>
