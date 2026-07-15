<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/bases/reka/ui/radio-group"
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription>Payout Preferences</CardDescription>
      <CardTitle>Receiving Method</CardTitle>
      <CardAction>
        <Button variant="ghost" size="icon-sm" class="bg-muted">
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="account-holder">
            Account Holder Name
          </FieldLabel>
          <Input
            id="account-holder"
            default-value="Synthetic Horizons Music LLC"
          />
        </Field>
        <FieldSet>
          <FieldLegend variant="label">
            Receiving Method
          </FieldLegend>
          <RadioGroup
            default-value="bank"
            class="grid grid-cols-1 items-start gap-3 md:grid-cols-2"
          >
            <FieldLabel for="method-bank">
              <Field orientation="horizontal" class="pb-2.5">
                <RadioGroupItem id="method-bank" value="bank" />
                <FieldContent>
                  <FieldDescription class="font-medium text-foreground">
                    Bank Transfer
                  </FieldDescription>
                  <FieldDescription>SWIFT / IBAN</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel for="method-paypal">
              <Field orientation="horizontal" class="pb-2.5">
                <RadioGroupItem id="method-paypal" value="paypal" />
                <FieldContent>
                  <FieldDescription class="font-medium text-foreground">
                    PayPal
                  </FieldDescription>
                  <FieldDescription class="line-clamp-1">
                    Instant Payout
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <Field>
          <FieldLabel for="iban">
            IBAN / Account Number
          </FieldLabel>
          <Input id="iban" placeholder="DE89 3704 0044 ...." />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button class="w-full" disabled>
        Save Payout Settings
      </Button>
    </CardFooter>
  </Card>
</template>
