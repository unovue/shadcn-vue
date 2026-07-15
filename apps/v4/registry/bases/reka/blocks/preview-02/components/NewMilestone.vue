<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Set a new milestone</CardTitle>
      <CardDescription>
        Define your financial target and we'll help you pace your
        savings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="goal-name">
            Goal Name
          </FieldLabel>
          <Input
            id="goal-name"
            placeholder="e.g. New Car, Home Downpayment"
          />
        </Field>
        <div class="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel for="target-amount">
              Target Amount
            </FieldLabel>
            <Input id="target-amount" default-value="$15,000" />
          </Field>
          <Field>
            <FieldLabel for="target-date">
              Target Date
            </FieldLabel>
            <Input id="target-date" default-value="Dec 2025" />
          </Field>
        </div>
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex-col gap-2">
      <Button class="w-full">
        Create Goal
      </Button>
      <Button variant="outline" class="w-full">
        Cancel
      </Button>
    </CardFooter>
  </Card>
</template>
