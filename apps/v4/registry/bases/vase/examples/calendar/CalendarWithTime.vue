<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent, CardFooter } from "@/registry/bases/vase/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/vase/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/vase/ui/input-group"
import { Example } from "~/registry/bases/vase/components/example"

const date = ref(
  new Temporal.PlainDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    12,
  ),
)
</script>

<template>
  <Example title="With Time">
    <Card size="sm" class="mx-auto w-fit">
      <CardContent>
        <Calendar
          v-model="date"
          class="p-0"
        />
      </CardContent>
      <CardFooter class="bg-card border-t">
        <FieldGroup>
          <Field>
            <FieldLabel for="time-from">
              Start Time
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                default-value="10:30:00"
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="Clock2Icon"
                  tabler="IconClockHour2"
                  hugeicons="Clock03Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                  class="text-muted-foreground"
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="time-to">
              End Time
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                default-value="12:30:00"
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="Clock2Icon"
                  tabler="IconClockHour2"
                  hugeicons="Clock03Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                  class="text-muted-foreground"
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  </Example>
</template>
