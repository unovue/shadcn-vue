<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/registry/bases/reka/ui/alert"
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/bases/reka/ui/toggle-group"

const timeSlots = ["9:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Book Appointment</CardTitle>
      <CardDescription>Dr. Sarah Chen · Cardiology</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Available on March 18, 2026</FieldLabel>
          <ToggleGroup :spacing="2" default-value="slot-0">
            <ToggleGroupItem
              v-for="(time, index) in timeSlots"
              :key="time"
              :value="`slot-${index}`"
            >
              {{ time }}
            </ToggleGroupItem>
          </ToggleGroup>
        </Field>
      </FieldGroup>
      <Alert>
        <AlertTitle>New patient?</AlertTitle>
        <AlertDescription>Please arrive 15 minutes early.</AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Book Appointment
      </Button>
    </CardFooter>
  </Card>
</template>
