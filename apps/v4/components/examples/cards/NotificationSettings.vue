<script setup lang="ts">
import { Button } from '@/styles/reka-rhea/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import { Checkbox } from '@/styles/reka-rhea/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/styles/reka-rhea/ui/field'

const NOTIFICATIONS = [
  {
    id: 'transactions',
    label: 'Transaction alerts',
    description: 'Deposits, withdrawals, and transfers.',
    defaultChecked: true,
  },
  {
    id: 'security',
    label: 'Security alerts',
    description: 'Login attempts and account changes.',
    defaultChecked: true,
  },
  {
    id: 'goals',
    label: 'Goal milestones',
    description: 'Updates at 25%, 50%, 75%, and 100%.',
    defaultChecked: false,
  },
  {
    id: 'market',
    label: 'Market updates',
    description: 'Daily portfolio summary and price alerts.',
    defaultChecked: false,
  },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose which email and push alerts you want to receive.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field v-for="n in NOTIFICATIONS" :key="n.id" orientation="horizontal">
          <Checkbox
            :id="`notify-${n.id}`"
            :default-value="n.defaultChecked"
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
