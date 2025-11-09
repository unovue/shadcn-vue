<script setup lang="ts">
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Enter verification code</CardTitle>
      <CardDescription>We sent a 6-digit code to your email.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="otp">
              Verification code
            </FieldLabel>
            <InputOTP id="otp" :maxlength="6" required>
              <InputOTPGroup class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
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
          <FieldGroup>
            <Button type="submit">
              Verify
            </Button>
            <FieldDescription class="text-center">
              Didn't receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
