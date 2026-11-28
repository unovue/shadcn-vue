<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/vase/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/bases/vase/ui/input-otp"

const value1 = ref("123456")
const value2 = ref("000000")
</script>

<template>
  <ExampleWrapper>
    <Example title="Simple">
      <Field>
        <FieldLabel for="simple">
          Simple
        </FieldLabel>
        <InputOTP id="simple" :length="6">
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
      </Field>
    </Example>

    <Example title="With Separator">
      <Field>
        <FieldLabel for="with-separator">
          With Separator
        </FieldLabel>
        <InputOTP
          id="with-separator"
          v-model="value1"
          :length="6"
        >
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <Example title="Disabled">
      <Field>
        <FieldLabel for="disabled">
          Disabled
        </FieldLabel>
        <InputOTP id="disabled" :length="6" :disabled="true" default-value="123456">
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
      </Field>
    </Example>

    <Example title="4 Digits">
      <Field>
        <FieldLabel for="four-digits">
          4 Digits
        </FieldLabel>
        <FieldDescription>Common pattern for PIN codes.</FieldDescription>
        <InputOTP id="four-digits" :length="4">
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <Example title="Invalid State">
      <Field>
        <FieldLabel for="invalid">
          Invalid State
        </FieldLabel>
        <FieldDescription>
          Example showing the invalid error state.
        </FieldDescription>
        <InputOTP id="invalid" v-model="value2" :length="6">
          <InputOTPGroup>
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :aria-invalid="true" />
            <InputOTPSlot :aria-invalid="true" />
          </InputOTPGroup>
        </InputOTP>
        <FieldError :errors="[{ message: 'Invalid code. Please try again.' }]" />
      </Field>
    </Example>

    <Example title="Form">
      <Card class="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:
            <span class="font-medium">m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Field>
              <div class="flex items-center justify-between">
                <FieldLabel for="otp-verification">
                  Verification code
                </FieldLabel>
                <Button variant="outline" size="xs">
                  <IconPlaceholder
                    lucide="RefreshCwIcon"
                    hugeicons="RefreshIcon"
                    tabler="IconRefresh"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                    data-icon="inline-start"
                  />
                  Resend Code
                </Button>
              </div>
              <InputOTP id="otp-verification" :length="6" :required="true">
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
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <Button type="submit" class="w-full">
            Verify
          </Button>
          <div class="text-muted-foreground text-sm">
            Having trouble signing in?
            <a
              href="#"
              class="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Contact support
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
