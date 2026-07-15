<script setup lang="ts">
import { ref } from "vue"
import { Example } from "@/registry/bases/reka/components/example"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/reka/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/bases/reka/ui/input-otp"

const value = ref("")
const pinValue = ref("")
</script>

<template>
  <Example title="OTP Input Fields">
    <FieldGroup>
      <Field>
        <FieldLabel html-for="otp-basic">
          Verification Code
        </FieldLabel>
        <InputOTP id="otp-basic" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
      <Field>
        <FieldLabel html-for="otp-with-desc">
          Enter OTP
        </FieldLabel>
        <InputOTP
          id="otp-with-desc"
          v-model="value"
          :maxlength="6"
        >
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Enter the 6-digit code sent to your email.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel html-for="otp-separator">
          Two-Factor Authentication
        </FieldLabel>
        <InputOTP id="otp-separator" :maxlength="6">
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
        <FieldDescription>
          Enter the code from your authenticator app.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel html-for="otp-pin">
          PIN Code
        </FieldLabel>
        <InputOTP
          id="otp-pin"
          v-model="pinValue"
          :maxlength="4"
          pattern="[0-9]*"
        >
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Enter your 4-digit PIN (numbers only).
        </FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel html-for="otp-invalid">
          Invalid OTP
        </FieldLabel>
        <InputOTP id="otp-invalid" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" :aria-invalid="true" />
            <InputOTPSlot :index="1" :aria-invalid="true" />
            <InputOTPSlot :index="2" :aria-invalid="true" />
            <InputOTPSlot :index="3" :aria-invalid="true" />
            <InputOTPSlot :index="4" :aria-invalid="true" />
            <InputOTPSlot :index="5" :aria-invalid="true" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          This OTP field contains validation errors.
        </FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel html-for="otp-disabled-field">
          Disabled OTP
        </FieldLabel>
        <InputOTP id="otp-disabled-field" :maxlength="6" disabled>
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          This OTP field is currently disabled.
        </FieldDescription>
      </Field>
    </FieldGroup>
  </Example>
</template>
