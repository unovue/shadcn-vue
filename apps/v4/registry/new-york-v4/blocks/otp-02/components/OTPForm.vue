<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/new-york-v4/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <form>
      <FieldGroup>
        <div class="flex flex-col items-center gap-1 text-center">
          <h1 class="text-2xl font-bold">
            Enter verification code
          </h1>
          <p class="text-muted-foreground text-sm text-balance">
            We sent a 6-digit code to your email.
          </p>
        </div>
        <Field>
          <FieldLabel for="otp" class="sr-only">
            Verification code
          </FieldLabel>
          <InputOTP id="otp" :maxlength="6" required>
            <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              <InputOTPSlot :index="0" />
              <InputOTPSlot :index="1" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              <InputOTPSlot :index="2" />
              <InputOTPSlot :index="3" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              <InputOTPSlot :index="4" />
              <InputOTPSlot :index="5" />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription class="text-center">
            Enter the 6-digit code sent to your email.
          </FieldDescription>
        </Field>
        <Button type="submit">
          Verify
        </Button>
        <FieldDescription class="text-center">
          Didn't receive the code? <a href="#">Resend</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  </div>
</template>
