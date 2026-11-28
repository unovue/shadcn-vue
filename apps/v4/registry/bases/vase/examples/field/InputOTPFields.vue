<script setup lang="ts">
import { ref } from "vue"
import { Example } from "@/registry/bases/vase/components/example"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/bases/vase/ui/input-otp"

const value = ref("")
const pinValue = ref("")
</script>

<template>
  <Example title="OTP Input Fields">
    <FieldGroup>
      <Field>
        <FieldLabel for="otp-basic">
          Verification Code
        </FieldLabel>
        <InputOTP id="otp-basic" :length="6">
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </Field>
      <Field>
        <FieldLabel for="otp-with-desc">
          Enter OTP
        </FieldLabel>
        <InputOTP
          id="otp-with-desc"
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
        <FieldDescription>
          Enter the 6-digit code sent to your email.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="otp-separator">
          Two-Factor Authentication
        </FieldLabel>
        <InputOTP id="otp-separator" :length="6">
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Enter the code from your authenticator app.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="otp-pin">
          PIN Code
        </FieldLabel>
        <InputOTP
          id="otp-pin"
          v-model="pinValue"
          :length="4"
          validation-type="numeric"
        >
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Enter your 4-digit PIN (numbers only).
        </FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel for="otp-invalid">
          Invalid OTP
        </FieldLabel>
        <InputOTP id="otp-invalid" :length="6">
          <InputOTPGroup>
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          This OTP field contains validation errors.
        </FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel for="otp-disabled-field">
          Disabled OTP
        </FieldLabel>
        <InputOTP id="otp-disabled-field" :length="6" disabled>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          This OTP field is currently disabled.
        </FieldDescription>
      </Field>
    </FieldGroup>
  </Example>
</template>
