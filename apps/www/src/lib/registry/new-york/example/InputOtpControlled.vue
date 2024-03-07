<script setup lang="ts">
import { ref } from 'vue'
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from '@/lib/registry/new-york/ui/input-otp'

const input = ref('')
</script>

<template>
  <div class="space-y-2">
    <InputOtp
      v-slot="{ slots }"
      v-model="input"
      :maxlength="6"
    >
      <InputOtpGroup>
        <InputOtpSlot v-for="(slot, index) in slots" v-bind="slot" :key="index" />
      </InputOtpGroup>
    </InputOtp>
    <div class="text-center text-sm">
      {{ input === ''
        ? 'Enter your one-time password.'
        : `You entered: ${input}`
      }}
    </div>
  </div>
</template>
