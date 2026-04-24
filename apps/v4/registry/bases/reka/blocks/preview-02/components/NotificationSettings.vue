<script setup lang="ts">
import { computed, reactive } from "vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/reka/ui/field"

const NOTIFICATIONS = [
  {
    id: "transactions",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
    defaultChecked: true,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
    defaultChecked: true,
  },
  {
    id: "goals",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
    defaultChecked: false,
  },
  {
    id: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
    defaultChecked: false,
  },
]

const checked = reactive<Record<string, boolean>>(
  Object.fromEntries(NOTIFICATIONS.map(n => [n.id, n.defaultChecked])),
)

const allChecked = computed(() => NOTIFICATIONS.every(n => checked[n.id]))
const someChecked = computed(() => NOTIFICATIONS.some(n => checked[n.id]) && !allChecked.value)

function handleSelectAll(value: boolean) {
  for (const n of NOTIFICATIONS) {
    checked[n.id] = value
  }
}

function handleToggle(id: string, value: boolean) {
  checked[id] = value
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose what you want to be notified about.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox
            id="notify-all"
            :checked="allChecked"
            :indeterminate="someChecked"
            @update:checked="(v: boolean | 'indeterminate') => handleSelectAll(!!v)"
          />
          <FieldContent>
            <FieldLabel for="notify-all">
              Select all
            </FieldLabel>
          </FieldContent>
        </Field>
        <Field
          v-for="n in NOTIFICATIONS"
          :key="n.id"
          orientation="horizontal"
        >
          <Checkbox
            :id="`notify-${n.id}`"
            :checked="checked[n.id]"
            @update:checked="(v: boolean | 'indeterminate') => handleToggle(n.id, !!v)"
          />
          <FieldContent>
            <FieldLabel :for="`notify-${n.id}`">
              {{ n.label }}
            </FieldLabel>
            <FieldDescription>{{ n.description }}</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Save Preferences
      </Button>
    </CardFooter>
  </Card>
</template>
