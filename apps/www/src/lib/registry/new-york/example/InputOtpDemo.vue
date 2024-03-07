<script setup lang="ts">
import { InputOtp, InputOtpGroup, InputOtpSeparator, InputOtpSlot } from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, idx) in slots.slice(0, 3)" v-bind="slot" :key="idx" />
    </InputOtpGroup>
    <InputOtpSeparator />
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, idx) in slots.slice(3)" v-bind="slot" :key="idx" />
    </InputOtpGroup>
  </InputOtp>
</template>
