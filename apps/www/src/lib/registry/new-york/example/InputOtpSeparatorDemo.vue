<script setup lang="ts">
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from '@/lib/registry/new-york/ui/input-otp'
</script>

<template>
  <InputOtp
    v-slot="{ slots }"
    :maxlength="6"
  >
    <InputOtpGroup class="gap-2">
      <template v-for="(slot, index) in slots" :key="index">
        <InputOtpSlot class="rounded-md border" v-bind="slot" />
        <template v-if="index !== slots.length - 1">
          <InputOtpSeparator />
        </template>
      </template>
    </InputOtpGroup>
  </InputOtp>
</template>
