<script setup lang="ts">
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
    disabled
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, index) in slots" v-bind="slot" :key="index" />
    </InputOtpGroup>
  </InputOtp>
</template>
