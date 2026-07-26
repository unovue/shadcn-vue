<script setup lang="ts">
import { ref } from "vue"
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/reka/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Slider } from "@/registry/bases/reka/ui/slider"
import { Textarea } from "@/registry/bases/reka/ui/textarea"

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

const amount = ref([2500])
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Payout Threshold</CardTitle>
      <CardDescription>
        Set the minimum balance required before a payout is triggered.
      </CardDescription>
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
            <FieldLabel for="min-payout">
              Minimum Payout Amount
            </FieldLabel>
            <span class="text-2xl font-semibold tabular-nums">
              ${{ amount[0]!.toFixed(2) }}
            </span>
          </div>
          <Slider
            id="min-payout"
            v-model="amount"
            :min="50"
            :max="10000"
            :step="50"
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
