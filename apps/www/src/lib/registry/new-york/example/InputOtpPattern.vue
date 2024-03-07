<script setup lang="ts">
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'
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
    :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
  >
    <InputOtpGroup>
      <InputOtpSlot v-for="(slot, index) in slots" v-bind="slot" :key="index" />
    </InputOtpGroup>
  </InputOtp>
</template>
