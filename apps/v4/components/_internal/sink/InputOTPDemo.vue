<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/registry/new-york-v4/ui/input-otp'

const value = ref(['1', '2', '3', '4', '5', '6'])
</script>

<template>
  <div class="flex flex-col flex-wrap gap-6 md:flex-row">
    <div class="grid gap-2">
      <Label for="simple">Simple</Label>
      <InputOTP id="simple" :max-length="6">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot :index="3" />
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    </div>

    <div class="grid gap-2">
      <Label for="digits-only">Digits Only</Label>
      <InputOTP id="digits-only" :max-length="6" :type="'number'">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    </div>

    <div class="grid gap-2">
      <Label for="with-separator">With Separator</Label>
      <InputOTP
        id="with-separator"
        v-model="value"
        :max-length="6"
      >
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    </div>

    <div class="grid gap-2">
      <Label for="with-spacing">With Spacing</Label>
      <InputOTP id="with-spacing" :max-length="6">
        <InputOTPGroup class="gap-2 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border">
          <InputOTPSlot :index="0" aria-invalid="true" />
          <InputOTPSlot :index="1" aria-invalid="true" />
          <InputOTPSlot :index="2" aria-invalid="true" />
          <InputOTPSlot :index="3" aria-invalid="true" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  </div>
</template>
