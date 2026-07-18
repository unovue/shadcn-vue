<script setup lang="ts">
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/styles/reka-rhea/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/styles/reka-rhea/ui/field'
import { Progress } from '@/styles/reka-rhea/ui/progress'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/styles/reka-rhea/ui/select'
import { Textarea } from '@/styles/reka-rhea/ui/textarea'

const CURRENCIES = [
  { label: 'USD — United States Dollar', value: 'usd' },
  { label: 'EUR — Euro', value: 'eur' },
  { label: 'GBP — British Pound', value: 'gbp' },
  { label: 'JPY — Japanese Yen', value: 'jpy' },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Payout Threshold</CardTitle>
      <CardDescription>
        Set the minimum balance required before a payout is triggered.
      </CardDescription>
      <CardAction>
        <Button
          variant="ghost"
          size="icon-sm"
          class="bg-muted"
          aria-label="Dismiss payout threshold"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :stroke-width="2" />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="preferred-currency">
            Preferred Currency
          </FieldLabel>
          <Select default-value="usd">
            <SelectTrigger id="preferred-currency" class="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in CURRENCIES"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <div class="flex items-baseline justify-between">
            <FieldLabel id="min-payout-label">
              Minimum Payout Amount
            </FieldLabel>
            <span class="text-2xl font-semibold tabular-nums">
              $2500.00
            </span>
          </div>
          <Progress
            :model-value="25"
            aria-labelledby="min-payout-label"
            aria-valuetext="$2,500 of $10,000"
          />
          <div class="flex items-center justify-between">
            <FieldDescription>$50 (MIN)</FieldDescription>
            <FieldDescription>$10,000 (MAX)</FieldDescription>
          </div>
        </Field>
        <Field>
          <FieldLabel for="payout-notes">
            Notes
          </FieldLabel>
          <Textarea
            id="payout-notes"
            placeholder="Add any notes for this payout configuration..."
            class="min-h-[100px]"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Save Threshold
      </Button>
    </CardFooter>
  </Card>
</template>
