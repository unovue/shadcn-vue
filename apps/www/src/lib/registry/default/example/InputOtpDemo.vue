<script setup lang="ts">
import { InputOtp, InputOtpGroup, InputOtpSeparator, InputOtpSlot } from '@/lib/registry/default/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, index) in slots.slice(0, 3)" v-bind="slot" :key="index" />
    </InputOtpGroup>
    <InputOtpSeparator />
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, index) in slots.slice(3)" v-bind="slot" :key="index" />
    </InputOtpGroup>
  </InputOtp>
</template>
