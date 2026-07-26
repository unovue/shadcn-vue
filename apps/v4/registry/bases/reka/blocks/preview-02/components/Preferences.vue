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
  FieldSeparator,
} from "@/registry/bases/reka/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Switch } from "@/registry/bases/reka/ui/switch"

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Preferences</CardTitle>
      <CardDescription>
        Manage your account settings and notifications.
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
          <FieldLabel for="default-currency">
            Default Currency
          </FieldLabel>
          <Select default-value="usd">
            <SelectTrigger id="default-currency" class="w-full">
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
        <FieldSeparator class="-my-4" />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="public-statistics">
              Public Statistics
            </FieldLabel>
            <FieldDescription>
              Allow others to see your total stream count and listening
              activity
            </FieldDescription>
          </FieldContent>
          <Switch id="public-statistics" :default-checked="true" />
        </Field>
        <FieldSeparator class="-my-4" />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="email-notifications">
              Email Notifications
            </FieldLabel>
            <FieldDescription>
              Monthly royalty reports and distribution updates
            </FieldDescription>
          </FieldContent>
          <Switch id="email-notifications" :default-checked="true" />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button variant="outline">
        Reset
      </Button>
      <Button class="ml-auto">
        Save Preferences
      </Button>
    </CardFooter>
  </Card>
</template>
